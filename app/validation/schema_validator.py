import logging
from typing import Any, Tuple
from pydantic import ValidationError, BaseModel
import xmlschema

logger = logging.getLogger("schema_validator")

class SchemaValidator:
    @staticmethod
    def validate_json(payload: Any, schema_model: BaseModel) -> Tuple[bool, list]:
        """
        Validate JSON payload using a Pydantic model.
        Returns (is_valid, errors)
        """
        try:
            schema_model.parse_obj(payload)
            logger.info("JSON schema validation passed.")
            return True, []
        except ValidationError as e:
            logger.warning(f"JSON schema validation failed: {e.errors()}")
            return False, e.errors()

    @staticmethod
    def validate_xml(payload: str, xsd_path: str) -> Tuple[bool, list]:
        """
        Validate XML payload against an XSD file.
        Returns (is_valid, errors)
        """
        try:
            schema = xmlschema.XMLSchema(xsd_path)
            schema.validate(payload)
            logger.info("XML schema validation passed.")
            return True, []
        except xmlschema.XMLSchemaException as e:
            logger.warning(f"XML schema validation failed: {e}")
            return False, [str(e)]
