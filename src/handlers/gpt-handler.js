/*
 * Based on Starter Project for WhatsApp Echo Bot
 *
 */

"use strict";

// Access token
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

    let mode = event["queryStringParameters"]['hub.mode'];
    let token = event["queryStringParameters"]['hub.verify_token'];
    let challenge = event["queryStringParameters"]['hub.challenge'];

    if (mode && token) {
      if (mode === "subscribe" && token === verify_token) {
        console.log("WEBHOOK_VERIFIED");
        return {"isBase64Encoded": false, "statusCode": 200, "body": challenge}
      } else {
        console.log("TOKEN DOES NOT MATCH");
        return {"isBase64Encoded": false, "statusCode": 403, "body": "Token mismatch"}
      }
    } else {
      console.log("NO MODE OR TOKEN");
      }
    }

    if (event.httpMethod == 'POST') {
      let body = JSON.parse(event['body']);

      if (body["object"] && body["entry"][0]["changes"][0]["value"]["messages"][0]) {
        let phone_number_id = body["entry"][0]["changes"][0]["value"]["metadata"]["phone_number_id"];
        let from = body["entry"][0]["changes"][0]["value"]["messages"][0]["from"];
        let msg_body = body["entry"][0]["changes"][0]["value"]["messages"][0]["text"]["body"];

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
            text: { body: "AWS: " + msg_body },
          },
          headers: { "Content-Type": "application/json" },
        });

        return {"statusCode": 200, "body": ""}
      } else  {
        return {"statusCode": 404, "body": ""}
      }
    }
  }