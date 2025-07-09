from abc import ABC, abstractmethod

class BaseTranslator(ABC):
    """
    Abstract base class for all PMS translators.
    """

    @abstractmethod
    def translate(self, pms_payload: bytes) -> dict:
        """
        Translate the incoming PMS payload to RGBridge format.
        """
        pass

    @abstractmethod
    def validate(self, pms_payload: bytes) -> bool:
        """
        Validate the incoming PMS payload against the PMS schema.
        """
        pass

    @abstractmethod
    def get_mapping(self) -> dict:
        """
        Return the mapping dictionary for this PMS.
        """
        pass
