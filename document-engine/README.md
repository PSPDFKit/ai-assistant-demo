# Nutrient AI Document Assistant — Document Engine Mode

> AI-powered document interaction backed by [Nutrient Document Engine](https://www.nutrient.io/sdk/document-engine) for server-side document management.

This variant adds Document Engine for centralized document storage, processing, and multi-user collaboration. Documents are uploaded to and served from Document Engine rather than loaded as static files.

For the standalone version (no Document Engine), see the [parent directory](../README.md).

## Quick Start

### Prerequisites

- [Docker Compose](https://docs.docker.com/compose/install/) (v2+)
- [Node.js](https://nodejs.org/) (v20+)
- [OpenAI API Key](https://platform.openai.com/api-keys) with available credits

### Setup

```bash
cd document-engine/

export OPENAI_API_KEY="sk-your-key-here"

# Start AI Assistant + Document Engine + PostgreSQL
docker compose up -d

# Upload sample document and start the frontend
./start
```

Open the URL shown in the terminal. Click the ⭐ **AI Assistant** toolbar button to start interacting with your document.

![Screenshot of Nutrient AI Assistant](assets/AI-Assistant-overview.png)

## Architecture

This mode runs three services:

| Service | Description | Port |
|---|---|---|
| **AI Assistant** | Document processing + AI chat backend | 4000 |
| **Document Engine** | Server-side document storage and processing | 5000 |
| **PostgreSQL** | pgvector for embeddings + document metadata | 5432 |

## Learn More

- [AI Document Assistant docs](https://www.nutrient.io/guides/ai/)
- [Document Engine docs](https://www.nutrient.io/guides/document-engine/)
- [Contact Sales](https://www.nutrient.io/contact-sales)

---

*Built by [Nutrient](https://www.nutrient.io) — The Document Company.*
