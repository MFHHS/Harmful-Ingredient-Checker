@echo off
echo Starting Backend Server (from Main.ipynb)...
cd backend
call venv\Scripts\activate.bat
python notebook_server.py
