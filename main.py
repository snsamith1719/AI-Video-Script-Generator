import json
from fastapi import FastAPI, HTTPException
from schemas import ExtractResponse, PromptRequest,EnhanceRequest
from groq_agent import call_groq_api

app = FastAPI(title="AI Prompt Intelligence API")


@app.post("/extract-options")
async def extract_options(req: PromptRequest):
    prompt = f"""
You are a strict JSON extraction API.

Extract these fields from the user prompt:

- duration( with seconds or minutes in str format)
- language
- platform
- size (Landscape/Vertical/Square)
- category

Rules:
- Return ONLY valid JSON.
- No explanation.
- No markdown.
- If a value is missing, return null.

User Prompt:
{req.prompt}
"""

    try:
        result = call_groq_api(prompt)
        parsed = json.loads(result)
        return parsed
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
