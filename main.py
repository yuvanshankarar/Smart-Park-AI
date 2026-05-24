from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import random

class DetectRequest(BaseModel):
    imageUrl: str

class RouteRequest(BaseModel):
    start: dict
    end: dict

class DetectionResult(BaseModel):
    slot: str
    occupied: bool
    confidence: float

class RouteStep(BaseModel):
    step: str
    distance: float

app = FastAPI(title='SmartPark AI service', version='1.0.0')

@app.get('/')
def health():
    return {'status': 'ok'}

@app.post('/detect')
def detect_slots(request: DetectRequest):
    detections = [
        {'slot': f'Zone A-{i}', 'occupied': bool(random.choice([0, 1])), 'confidence': round(random.uniform(0.75, 0.99), 2)}
        for i in range(1, 6)
    ]
    return {'imageUrl': request.imageUrl, 'detections': detections, 'model': 'YOLOv8-simulated'}

@app.get('/predict')
def predict_traffic():
    hours = [f'{hour}:00' for hour in range(6, 24, 2)]
    predictions = [{'hour': hour, 'demand': random.randint(15, 50)} for hour in hours]
    return {'predictions': predictions, 'peakHour': max(predictions, key=lambda item: item['demand'])}

@app.post('/route')
def optimize_route(request: RouteRequest):
    route = [
        {'step': 'Start at current location', 'distance': 0.2},
        {'step': 'Head towards Zone A', 'distance': 0.8},
        {'step': 'Turn onto parking access lane', 'distance': 0.5},
        {'step': 'Arrive at destination slot', 'distance': 0.1}
    ]
    return {'route': route, 'etaMinutes': 4, 'distanceKm': 1.6, 'algorithm': 'A*'}
