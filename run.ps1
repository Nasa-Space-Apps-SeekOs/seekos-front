cd $PSScriptRoot

git add .
git checkout -- .
git reset --hard
git pull

npm i

node run-server.js