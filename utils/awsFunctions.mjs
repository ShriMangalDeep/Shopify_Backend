import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { CONFIG } from "../config.mjs";

export async function sendMessage(Subject, Body) {
  const sns = new SNSClient({ region: CONFIG.AWS.SNS_REGION });
  // Local test
  if (CONFIG.CONSTANTS.ENV != "LOCAL") {
    const command = new PublishCommand({
      Subject: Subject,
      Message: Body,
      TopicArn: CONFIG.AWS.SNS_TOPIC_ARN,
    });

    try {
      return await sns.send(command);
    } catch (err) {
      console.error("Error While Sending Notificaion Using SNS :", err);
    }
  } else {
    console.log("SNS - Notificaion : ", {
      Subject: Subject,
      Body: Body,
    });
  }
}
