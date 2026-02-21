# Harmful Ingredient Checker

## Quick Start

### Terminal 1 - Backend:
```bash
cd backend
python notebook_server.py
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

OR just click:
1. start-notebook-backend.bat
2. start-frontend.bat

Open: http://localhost:5173

## API

Main.ipynb provides:
```
POST /check_ingredients
Body: {"ingredients": ["Water", "Parabens"]}
Response: {"harmful": ["Parabens"], "safe": false}
```

## Files

- `backend/notebook_server.py` - Flask server from Main.ipynb
- `backend/Main.ipynb` - original notebook
- `frontend/src/services/api-notebook.ts` - Frontend API adapter
- `frontend/src/pages/Scanner/index.tsx` - Uses notebook API

## Note

