import json
from fastapi import FastAPI, HTTPException # type: ignore
from schemas import ExtractResponse, PromptRequest,EnhanceRequest
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from groq_agent import call_groq_api

app = FastAPI(title="AI Prompt Intelligence API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/extract-options")
async def extract_options(req: PromptRequest):
    prompt = f"""
You are a strict JSON extraction API.

Extract these fields from the user prompt:

- duration( with seconds or minutes in string format)
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


@app.post("/enhance-prompt")
async def enhance_prompt(req: EnhanceRequest):
    prompt = F"""
    You are an expert AI video prompt engineer.
    Generate a refined, structured, and production-ready prompt suitable for AI video generation.
    Enhance the original prompt based on the following options:
    {json.dumps(req.options, indent=2)}
    Original Prompt:
    {req.original_prompt}
    Rules:
    - Focus on improving the prompt for better video generation.
    - Return ONLY the enhanced prompt.
    - No explanation.
    - No markdown.
    - If an option is null, ignore it.
    """
    
    try:
        enhanced = call_groq_api(prompt)
        return {"enhanced_prompt": enhanced.strip('"')}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@app.post("/generate-script")
async def generate_script(req: PromptRequest):
    prompt = f"""
    You are an expert AI video script writer.
    Generate a detailed cinema-quality video script scene-by-scene based on the following prompt:
    {req.prompt}
    
    Rules:
    - Focus on creating a compelling narrative with clear scene descriptions.
    - Return ONLY the script.
    - No explanation.
    
    Include:
    - Image/Character description
    - cinematic storytelling tone
    - Scene visualization with clear details
    - Scene number(Scene 1, Scene 2, etc. and timestamp)
    - Visual description
    - Naration
    - Mood
    - Camera Directions
    - Emotional tone
    """
    
    try:
        script = call_groq_api(prompt)
        return {"script": script.strip('"')}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))