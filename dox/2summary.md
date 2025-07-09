# Project Summary: PMS-to-RGBridge Integration Platform

## 1. Project Architecture & Tech Stack
- **Language/Framework:** Python 3.10+ with FastAPI (for async, type safety, and OpenAPI docs).
- **Plugin System:** Use class-based plugins (e.g., via `pluggy` or custom decorator registry) for PMS translators.
- **Validation:** Use `pydantic` for JSON, `xmlschema` for XML/XSD, and libraries like `graphql-core` for GraphQL.
- **Mapping Knowledge Base:** Store as YAML (per PMS) in `/pms/{pmscode}/mappings.yaml`.
- **GenAI Integration:** Use OpenAI API for mapping suggestions, schema analysis, and transformation logic.
- **Testing:** `pytest` for unit/integration tests, with test data in `/pms/{pmscode}/tests/`.
- **CI/CD:** GitHub Actions or GitLab CI for linting, tests, and deployment.
- **Deployment:** Dockerized, with cloud deployment (AWS ECS, Azure Container Apps, or GCP Cloud Run).
- **Security:** Use HTTPS, environment-based secrets, audit logging, and follow GDPR/PCI guidelines.
- **Professional UI:** A wizard-driven web UI for onboarding and integrating new PMS, including mapping review and test runs.

## 2. Key Components & Flow
- **API Gateway:** `/pms/{pmscode}` endpoint, accepts JSON/XML/GraphQL/SOAP, with authentication (basic, bearer, API key) and logging.
- **PMS Plugin System:** Each PMS has its own folder with translator, mappings, and tests. Auto-discovery via decorators or entry-points.
- **Mapping Knowledge Base:** YAML file per PMS, GenAI-augmented, with all RGBridge tags/attributes and mappings.
- **Validation:** Incoming PMS schema validation and outgoing RGBridge XSD validation.
- **Translation:** Mapping file + GenAI for transformation, with utilities for date/currency/LOS pattern parsing.
- **Outbound Push:** HTTP POST to internal API (XML, basic auth, retry logic, error handling, acknowledgement).
- **Testing:** Unit and integration tests for translators and end-to-end flow.
- **Documentation & UI:** Auto-generated API docs, onboarding docs, and a professional UI wizard for PMS integration.

## 3. GenAI Usage
- **Mapping Suggestion:** Use OpenAI to suggest mappings from PMS schema to RGBridge.
- **Transformation Logic:** Use OpenAI for code snippets or transformation rules for non-trivial fields.
- **Schema Analysis:** Use OpenAI to summarize/compare schemas and suggest validation logic.
- **Interactive Review:** Prompt user/admin for unclear mappings, with GenAI-generated suggestions.

## 4. Professional Practices
- **Code Quality:** Type hints, docstrings, linting, pre-commit hooks.
- **Security:** No sensitive data in logs, encrypted secrets, regular dependency updates.
- **Extensibility:** New PMS = new folder + plugin, no codebase changes needed. PMS-specific translators are plug-and-play via plugin system or class inheritance.
- **Compliance:** Data minimization, right-to-erasure, audit logs, PCI-compliant storage if handling card data.
- **Monitoring:** Health checks, error alerts, request tracing.

## 5. Suggested Initial Steps
1. Scaffold the Project: FastAPI app, plugin loader, `/pms/` structure, Dockerfile.
2. Implement RGBridge Knowledge Base: Parse and store all tags/attributes from sample messages.
3. Build the Plugin System: Base translator class, auto-discovery, example PMS plugin.
4. Integrate GenAI: Script to analyze PMS schema and suggest mappings.
5. Develop API Gateway: Endpoint, request validation, plugin invocation, outbound push.
6. Develop Professional UI: Wizard for PMS onboarding, mapping review, and test runs.
7. Testing & CI/CD: Set up pytest, sample tests, and CI pipeline.
8. Documentation: README, API docs, onboarding guide.

## 6. Optional Enhancements
- Web UI for mapping review, test runs, and plugin management (now a core requirement).
- Admin API for plugin registration, mapping updates, and logs.
- Self-service onboarding for PMS vendors to upload schema and get instant mapping suggestions.

## 7. OpenAI/GenAI API Usage
- Use OpenAI's function calling or code generation for mapping and transformation logic.
- Cache/record mapping suggestions for auditability.
- Optionally, use OpenAI for documentation generation and code review. 