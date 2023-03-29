/*
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

"use strict";

// Access token for your app
// (copy token from DevX getting started page
// and save it as environment variable into the .env file)
const token = process.env.WHATSAPP_TOKEN;

// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json()); // creates express http server

exports.gptHandler = async (event) => {
  console.info('received:', event)

  if (event.httpMethod == 'GET') {
    const verify_token = process.env.VERIFY_TOKEN;

    let mode = event[hub.mode];
    let token = event[hub.verify_token];
    let challenge = event[hub.challenge];

    if (mode && token) {
      if (mode === "subscribe" && token === verify_token) {
        console.log("WEBHOOK_VERIFIED");
        callback(null, {"isBase64Encoded": false, "statusCode": 200, "body": "WEBHOOK_VERIFIED"});
      } else {
        console.log("TOKEN DOES NOT MATCH");
        callback(null, {"isBase64Encoded": false, "statusCode": 403, "body": "Token mismatch"})
      }
    } else {
      console.log("NO MODE OR TOKEN");
      }
    }

    if (event.httpMethod == 'POST') {
    }
  }

  // Accepts POST requests at /webhook endpoint
  app.post("/webhook", (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
        let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
        let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
        axios({
          method: "POST", // Required, HTTP method, a string, e.g. POST, GET
          url:
            "https://graph.facebook.com/v12.0/" +
            phone_number_id +
            "/messages?access_token=" +
            token,
          data: {
            messaging_product: "whatsapp",
            to: from,
            text: { body: "Local: " + msg_body },
          },
          headers: { "Content-Type": "application/json" },
        });
      }
      res.sendStatus(200);
      callback(null, {"statusCode": 200, "body": ""})
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
    callback(null, {"statusCode": 404, "body": ""})
  }
  app.close();
});