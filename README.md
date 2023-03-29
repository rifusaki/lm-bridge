# lm-bridge

This small project will contain the source code to send messages from a WhatsApp chat as prompts to ChatGPT and return its response. It's a serverless application that can be deployed with the the AWS Serverless Application Model (AWS SAM) CLI to a Lambda function and an API Gateway.

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI).

- `src` - Code for the application's Lambda function.
- `template.yaml` - A template that defines the application's AWS resources.

### Resources

This app requires you to have access to the [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started). 

For an introduction to the AWS SAM specification, the AWS SAM CLI, and serverless application concepts, see the [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).