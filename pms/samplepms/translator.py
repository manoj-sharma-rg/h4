import logging
import json
from app.plugins.base_translator import BaseTranslator
from app.mapping.manager import MappingManager

logger = logging.getLogger("samplepms_translator")

class Translator(BaseTranslator):
    def translate(self, pms_payload: bytes) -> dict:
        logger.info(f"Translating payload of length {len(pms_payload)}")
        try:
            pms_data = json.loads(pms_payload.decode("utf-8"))
        except Exception as e:
            logger.error(f"Failed to parse PMS payload as JSON: {e}")
            return {"error": "Invalid JSON payload"}
        mapping = self.get_mapping()
        rgbridge_data = {}
        for pms_field, rgbridge_field in mapping.items():
            if isinstance(rgbridge_field, dict):
                # Handle nested mapping (one level deep for demo)
                for subfield, target_field in rgbridge_field.items():
                    value = pms_data.get(pms_field, {}).get(subfield)
                    rgbridge_data[target_field] = value
                    logger.info(f"Mapped nested {pms_field}.{subfield} -> {target_field}: {value}")
            else:
                value = pms_data.get(pms_field)
                rgbridge_data[rgbridge_field] = value
                logger.info(f"Mapped {pms_field} -> {rgbridge_field}: {value}")
        return rgbridge_data

    def validate(self, pms_payload: bytes) -> bool:
        logger.info(f"Validating payload of length {len(pms_payload)}")
        # Dummy validation
        return True

    def get_mapping(self) -> dict:
        logger.info("Loading mapping using MappingManager")
        mapping = MappingManager.load_mapping("samplepms")
        logger.info(f"Loaded mapping: {mapping}")
        return mapping
