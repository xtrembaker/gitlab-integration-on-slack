const { WebClient } = require('@slack/client');
const AWS = require('aws-sdk');
require('dotenv').config();
// get reference to S3 client
const s3 = new AWS.S3();
exports.handler = async (event) => {
    /******** PUT event.body on an S3 Bucket *************/
    const params = {
      Body: event.body,
      Bucket: process.env.S3_BUCKET,
      Key: process.env.S3_OBJECT_KEY
    };
    await s3.putObject(params, async function(err, data) {
      if (err){
          console.log(err, err.stack); // an error occurred
        return Promise.reject(err);
      }
      else{
          console.log(data);           // successful response
          return Promise.resolve(data);
      }
  });

  // An access token (from your Slack app or custom integration - xoxp, xoxb)
  const token = process.env.SLACK_APP_TOKEN;

  const web = new WebClient(token);

    /******** Send message to Slack *************/
  const body = JSON.parse(event.body);
  const text = 'New PR: '+ body.object_attributes.url;
  const res = await web.chat.postMessage({
      channel: process.env.SLACK_CHANNEL_ID,
      text: text
  });

  console.log('Message sent: ', res.ts);

  const response = {
      statusCode: 200,
      body: JSON.stringify('ok'),
  };
  return response;
};