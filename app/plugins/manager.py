import importlib
import os
import logging
from app.plugins.base_translator import BaseTranslator

logger = logging.getLogger("plugin_manager")

class PluginManager:
    """
    Loads and manages PMS translator plugins.
    """

    @staticmethod
    def load_plugin(pmscode: str) -> BaseTranslator:
        """
        Dynamically load the translator for the given PMS code.
        """
        try:
            module_path = f"pms.{pmscode}.translator"
            logger.info(f"Attempting to load plugin: {module_path}")
            module = importlib.import_module(module_path)
            translator = module.Translator()
            logger.info(f"Successfully loaded plugin for PMS '{pmscode}'")
            return translator
        except (ModuleNotFoundError, AttributeError) as e:
            logger.error(f"Could not load plugin for PMS '{pmscode}': {e}")
            raise ImportError(f"Could not load plugin for PMS '{pmscode}': {e}")

    @staticmethod
    def available_plugins() -> list:
        """
        List all available PMS plugins (folders in /pms/ with a translator.py).
        """
        pms_dir = os.path.join(os.path.dirname(__file__), "../../pms")
        plugins = [
            name for name in os.listdir(pms_dir)
            if os.path.isdir(os.path.join(pms_dir, name)) and
               os.path.exists(os.path.join(pms_dir, name, "translator.py"))
        ]
        logger.info(f"Discovered plugins: {plugins}")
        return plugins
