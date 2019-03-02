# Introduction
This repo aim to furnish an AWS lambda function to automatically send a message on a slack application, 
any time it receive an hook from GitLab


# Project Requirement:

- a POST AWS Api Gateway endpoint with a lambda function connected to it 
- A slack account [Sign in](https://slack.com/signin)
- A slack app [create it](https://api.slack.com/apps?new_app=1) that's is connected to your workspace
- A slack token (once you've created your app, go to "Oauth & Permissions" of the app to find the OAuth Access token)
- A Gitlab account with at least one repository

# Configuration (to be done)
- Lambda integration
- Gitlab integration

## Lambda integration

- Create a NodeJS lambda function on your AWS account, then push the code of this repo by running 
    ```
    ./bin/package_lambda.sh 
    ./bin/publish_lambda.sh "slack-function-name"
    ```

- Copy all .env-dev variables in your Lambda function variables

- Create a POST endpoint on API Gateway (resource name "pull-request" as example), and connect your lambda as integration

## Gitlab integration
In your repository, click on "Settings" -> "Integrations".

* Type the URL of your AWS Api Gateway that will receive the request
* Select "Merge request events"
* Then add webhook, and make a test to make sure it works properly

For security sake, it may be good to add a token which authenticate Gitlab when receiving the request on your lambda function
(this is optionnal)


# dev notes
export AWS_PROFILE=slack-push-pr

lambda function name: slack