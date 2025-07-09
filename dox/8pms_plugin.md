# Technical Design Document: PMS Plugin System

## 1. Purpose & Responsibilities
- Enable plug-and-play integration of new PMS translators without modifying core system code.
- Discover, register, and manage PMS-specific translator plugins at runtime.
- Provide a standard interface for translation, validation, and mapping logic per PMS.
- Support auto-loading of mapping YAML files and test data for each PMS.

## 2. Key Classes, Modules, or Services
- `PluginManager` (core plugin loader and registry)
- `BaseTranslator` (abstract base class/interface for all PMS translators)
- `PMSPlugin` (concrete translator implementations, one per PMS)
- `MappingLoader` (loads and validates mapping YAML per PMS)
- `PluginDiscovery` (auto-discovers plugins in the `/pms/` directory)

## 3. Interfaces & APIs
- **Plugin Interface:**
  - `translate(self, pms_payload) -> rgbridge_message`
  - `validate(self, pms_payload) -> bool`
  - `get_mapping(self) -> dict`
- **Plugin Registration:**
  - Decorator or entry-point registration for new plugins
- **Plugin Management API (optional):**
  - List, enable/disable, reload plugins (for admin use)

## 4. Data Flow & Interactions
1. On startup, `PluginManager` scans `/pms/` for plugin folders.
2. Each folder contains a `translator.py` implementing `BaseTranslator` and a `mappings.yaml` file.
3. When a request arrives, the API Gateway invokes the appropriate plugin via `PluginManager`.
4. The plugin loads its mapping, validates the payload, and performs translation.
5. Translated message is returned to the API Gateway for further processing.

```mermaid
flowchart TD
    A[API Gateway] -->|"pmscode"| B[PluginManager]
    B --> C[PMSPlugin (translator.py)]
    C --> D[MappingLoader (mappings.yaml)]
    C --> E[Translation Logic]
    E -->|"RGBridge Message"| A
```

## 5. Extensibility & Configuration
- New PMS: add a folder under `/pms/` with `translator.py` and `mappings.yaml`.
- Plugins can be hot-reloaded or enabled/disabled via admin API or CLI.
- Mapping files and plugin settings can be validated at load time.

## 6. Security & Compliance
- Plugins run in the same process; code review and sandboxing recommended.
- Mapping files are validated to prevent injection or misconfiguration.
- Audit logs record plugin loading, errors, and mapping changes.
- Sensitive data in mappings is masked in logs.

## 7. Dependencies & Libraries
- `importlib` (dynamic loading)
- `pluggy` or custom plugin registry
- `PyYAML` (for mapping files)
- `pydantic` (for mapping schema validation)

## 8. Error Handling & Monitoring
- Plugin load errors are logged and surfaced in health checks.
- Translation/validation errors are reported to the API Gateway.
- Plugin status and errors are available via admin API or logs.

## 9. Example Code or Pseudocode
```python
# base_translator.py
class BaseTranslator:
    def translate(self, pms_payload):
        raise NotImplementedError
    def validate(self, pms_payload):
        raise NotImplementedError
    def get_mapping(self):
        raise NotImplementedError

# plugin_manager.py
import importlib

def load_plugin(pmscode):
    module = importlib.import_module(f"pms.{pmscode}.translator")
    return module.Translator()
```

## 10. Open Questions & Risks
- How to handle plugin versioning and backward compatibility?
- Should plugins be sandboxed for security?
- How to support plugin hot-reloading in production?
- What is the process for plugin code review and approval?

--- 