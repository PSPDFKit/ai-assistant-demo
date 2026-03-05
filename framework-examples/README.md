# AI Assistant Framework Quickstarts

These examples show how to pair the demo stack with common agent frameworks.

## Files

- `openai-agents.mjs` - OpenAI Agents SDK quickstart calling a document-processing helper.
- `langchain.mjs` - LangChain tool-calling quickstart for document operations.
- `crewai.py` - CrewAI quickstart with a simple task pipeline for document prep and review.

## Validation

Use syntax checks before adapting these snippets:

```bash
node --check openai-agents.mjs
node --check langchain.mjs
python3 -m py_compile crewai.py
```

## Environment

- `OPENAI_API_KEY` for OpenAI-based examples.
- `NUTRIENT_API_KEY` for document-processing requests.

Snippets are intentionally minimal and should be adapted to your production auth, storage, and sandbox setup.
