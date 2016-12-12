#!/bin/bash
cd data
git pull
cd ../
pm2 restart process.json
