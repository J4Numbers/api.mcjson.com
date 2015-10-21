#!/bin/bash
cd data
git pull
cd ../
node scripts/importVersionsFromMojang.js
cd data
git add .
echo "auto updating versions" > ../ver-commit.txt
git status --porcelain >> ../ver-commit.txt
git commit -F ../ver-commit.txt
rm ../ver-commit.txt
git push
cd ../