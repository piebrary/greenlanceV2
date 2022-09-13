xcopy /s /i /y "..\api\default\*" "..\update-package\lib\api\default\*" && ^
xcopy /s /i /y "..\app\src\default\*" "..\update-package\lib\app\src\default\*" && ^
xcopy /s /y "..\documentation\default.md" "..\update-package\lib\documentation\*" && ^
xcopy /s /i /y "..\scripts\*" "..\update-package\lib\scripts\*" && ^
echo xcopy /s /i /y "..\update-package\lib\*" "..\*" > "..\update-package\install.bat"
echo pause >> "..\update-package\install.bat"
pause
