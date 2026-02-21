from pydantic import BaseModel
from typing import Optional, Dict


class PromptRequest(BaseModel):
    prompt: str


class ExtractResponse(BaseModel):
    duration: Optional[str] = None
    language: Optional[str] = None
    platform: Optional[str] = None
    size: Optional[str] = None
    category: Optional[str] = None


class EnhanceRequest(BaseModel):
    original_prompt: str
    options: Dict[str, Optional[str]]