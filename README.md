# Food-O-Friend | CarbCare

## Overview

AI-powered web application that analyzes food items for carb content, providing personalized recommendations for diabetics and health-conscious users. Integrating data from RecipeDB and FlavorDB.

## Features

- **Carb Analysis**: Calculates total carbs based on custom portion sizes (grams).
- **Health Modes**: Tailored thresholds for Normal, Weight Loss, Pre-Diabetes, and Diabetes.
- **Smart Feedback**: 
  - Green (Comfortable)
  - Yellow (Moderate)
  - Red (High)
- **Flavor & Alternatives**: Suggests flavor pairings and lower-carb alternatives.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js + MongoDB
- **APIs**: RecipeDB (Mocked/Integrated), FlavorDB (Mocked/Integrated)

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally or cloud URI)

### Backend Setup
1. Navigate to `/backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file from example or use default config.
4. Start server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to `/frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

## API Documentation

### POST /api/analyze

**Request Body:**
```json
{
  "food": "Banana",
  "grams": 150,
  "mode": "diabetes"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "food": "Banana",
    "decision": "Moderate",
    "nutrition": { ... },
    "message": "Moderate intake..."
  }
}
```

## Testing

Use the provided Postman Collection or simple cURL requests to test the `/api/analyze` endpoint.
