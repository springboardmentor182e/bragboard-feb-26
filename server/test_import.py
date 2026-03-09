import traceback

with open("error_log.txt", "w", encoding="utf-8") as f:
    try:
        from src.main import app
        f.write("Successfully imported app\n")
    except Exception as e:
        traceback.print_exc(file=f)
