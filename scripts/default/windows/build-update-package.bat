xcopy /S /I /Y "..\..\..\api\default\*" "..\..\..\update-package\lib\api\default\*" && ^
xcopy /S /I /Y "..\..\..\app\src\default\*" "..\..\..\update-package\lib\app\src\default\*" && ^
xcopy /S /I /Y "..\..\..\documentation\default\*" "..\..\..\update-package\lib\documentation\default\*" && ^
xcopy /S /I /Y "..\..\..\scripts\default\*" "..\..\..\update-package\lib\scripts\default\*" && ^
echo xcopy /S /I /Y /E "..\update-package\lib\*" "..\*" > "..\..\..\update-package\install.bat"
echo pause >> "..\..\..\update-package\install.bat"
pause
