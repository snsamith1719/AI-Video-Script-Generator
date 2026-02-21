import requests
from config import GROQ_API_KEY, GROQ_URL, MODEL_NAME


def call_groq_api(prompt: str):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are an expert AI video prompt engineer."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }

    response = requests.post(GROQ_URL, headers=headers, json=payload)
    
    data = response.json()

    if response.status_code != 200:
        raise Exception(f"Groq API Error: {response.text}")

    return data['choices'][0]['message']['content']