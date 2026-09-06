==============================================
##### How to prepare the gitignore file ######
==============================================
# Ignore a specific file
config/secrets.json

# Ignore a specific folder (trailing slash = folder only)
temp-data/

# Ignore a file no matter where it is in the project
*.tmp

# Ignore a file only if it's in the root
/report.html

# Ignore all files with an extension
*.log

# Ignore everything inside a folder, but keep the folder itself
downloads/*
!downloads/.gitkeep

# Ignore a folder anywhere it appears (any depth)
**/cache/

# Exception: don't ignore this one file even though its folder is ignored
!important-config.json