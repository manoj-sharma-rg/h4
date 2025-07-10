import os
import yaml
import logging
from typing import Dict, Any

logger = logging.getLogger("mapping_manager")

class MappingManager:
    """
    Loads and validates mapping YAML files for PMS plugins.
    """
    @staticmethod
    def load_mapping(pmscode: str) -> Dict[str, Any]:
        """
        Load the mapping YAML file for the given PMS code.
        """
        mapping_path = os.path.join(os.path.dirname(__file__), f"../../pms/{pmscode}/mappings.yaml")
        if not os.path.exists(mapping_path):
            logger.error(f"Mapping file not found for PMS '{pmscode}' at {mapping_path}")
            raise FileNotFoundError(f"Mapping file not found for PMS '{pmscode}'")
        with open(mapping_path, "r", encoding="utf-8") as f:
            try:
                mapping = yaml.safe_load(f)
                logger.info(f"Loaded mapping for PMS '{pmscode}'")
                # Optionally, add schema validation here
                return mapping
            except yaml.YAMLError as e:
                logger.error(f"Error parsing mapping YAML for PMS '{pmscode}': {e}")
                raise
