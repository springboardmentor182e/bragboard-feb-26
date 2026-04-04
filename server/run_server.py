#!/usr/bin/env python
"""Run the FastAPI server"""
import uvicorn
import os

# Change to server directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="127.0.0.1", port=8000, reload=True)
