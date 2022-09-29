@echo off
SET subkey=%random%%random%%random%%random%%random%%random%

xcopy /S /I /Y "..\..\..\api\default\*" "..\..\..\updates\%subkey%\lib\api\default\*" && ^
echo f | xcopy /S /Y "..\..\..\api\.env.example" "..\..\..\updates\%subkey%\lib\api\.env.example" && ^
echo f | xcopy /S /Y "..\..\..\app\.env.example" "..\..\..\updates\%subkey%\lib\app\.env.example" && ^
xcopy /S /I /Y "..\..\..\app\src\default\*" "..\..\..\updates\%subkey%\lib\app\src\default\*" && ^
xcopy /S /I /Y "..\..\..\documentation\default\*" "..\..\..\updates\%subkey%\lib\documentation\default\*" && ^
xcopy /S /I /Y "..\..\..\scripts\default\*" "..\..\..\updates\%subkey%\lib\scripts\default\*" && ^
echo xcopy /S /I /Y /E ".\lib\*" "..\..\*" > "..\..\..\updates\%subkey%\install.bat"
echo pause >> "..\..\..\updates\%subkey%\install.bat"
echo rsync -a "../lib/" "../../*" > "..\..\..\updates\%subkey%\install.sh"
echo read -p "Press any key to continue . . ." >> "..\..\..\updates\%subkey%\install.sh"
pause
