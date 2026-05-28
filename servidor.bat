@echo off
echo Iniciando servidor local para Stahlgraf Apps...
echo.
echo Por favor, abre en tu navegador la siguiente direccion:
echo http://localhost:8000
echo.
echo (Para cerrar el servidor, presiona Ctrl+C o cierra esta ventana)
echo.
python -m http.server 8000
