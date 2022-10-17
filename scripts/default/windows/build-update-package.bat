@echo off

set /p "NEW_VERSION=Give the new version number : "

xcopy /S /I /Y "..\..\..\api\default\*" "..\..\..\updates\%NEW_VERSION%\lib\api\default\*" && ^
echo f | xcopy /S /Y "..\..\..\api\.env.example" "..\..\..\updates\%NEW_VERSION%\lib\api\.env.example" && ^
echo f | xcopy /S /Y "..\..\..\app\.env.example" "..\..\..\updates\%NEW_VERSION%\lib\app\.env.example" && ^
xcopy /S /I /Y "..\..\..\app\src\default\*" "..\..\..\updates\%NEW_VERSION%\lib\app\src\default\*" && ^
xcopy /S /I /Y "..\..\..\documentation\default\*" "..\..\..\updates\%NEW_VERSION%\lib\documentation\default\*" && ^
xcopy /S /I /Y "..\..\..\scripts\default\*" "..\..\..\updates\%NEW_VERSION%\lib\scripts\default\*" && ^
echo echo %NEW_VERSION% ^> "..\current_version.txt" >> "..\..\..\updates\%NEW_VERSION%\install.bat" ^&^& ^^&& ^
echo xcopy /S /I /Y /E ".\lib\*" "..\..\*" >> "..\..\..\updates\%NEW_VERSION%\install.bat" && ^
echo RD /S /Q "..\..\api\default\*" >> "..\..\..\updates\%NEW_VERSION%\install.bat" && ^
echo RD /S /Q "..\..\app\src\default\* >> "..\..\..\updates\%NEW_VERSION%\install.bat" && ^
echo RD /S /Q "..\..\documentation\default\*" >> "..\..\..\updates\%NEW_VERSION%\install.bat" && ^
echo RD /S /Q "..\..\scripts\default\*" >> "..\..\..\updates\%NEW_VERSION%\install.bat" && ^
echo pause >> "..\..\..\updates\%NEW_VERSION%\install.bat"
echo echo %NEW_VERSION% ^> "..\current_version.txt" >> "..\..\..\updates\%NEW_VERSION%\install.sh" ^&^& ^^&& ^
echo rsync -a "../lib/" "../../*" >> "..\..\..\updates\%NEW_VERSION%\install.sh"
echo read -p "Press any key to continue . . ." >> "..\..\..\updates\%NEW_VERSION%\install.sh"
pause
