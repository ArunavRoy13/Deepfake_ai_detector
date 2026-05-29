import traceback

try:
    import main
    print("OK")
except Exception as e:
    print("CRASHED")
    traceback.print_exc()
