#!/usr/bin/env bash
if [ -z $1 ]; then
    echo "Missing slack function name"
    exit 1
fi
# run the command from the root folder
aws lambda update-function-code --function-name "$1" --zip-file fileb://lambda.zip