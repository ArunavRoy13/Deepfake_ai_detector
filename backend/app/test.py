try:
  import main
  print('OK')
except Exception as e:
  print('CRASH:', repr(e))
