# Harmful Ingredient Checker

Frontend connected to Main.ipynb backend.

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

Open: http://localhost:5173

## API

Your friend's Main.ipynb provides:
```
POST /check_ingredients
Body: {"ingredients": ["Water", "Parabens"]}
Response: {"harmful": ["Parabens"], "safe": false}
```

## Files

- `backend/notebook_server.py` - Flask server from Main.ipynb
- `backend/Main.ipynb` - Your friend's original notebook
- `frontend/src/services/api-notebook.ts` - Frontend API adapter
- `frontend/src/pages/Scanner/index.tsx` - Uses notebook API

## Note

OCR is currently mocked in frontend. Your friend can add real OCR to Main.ipynb when ready.
