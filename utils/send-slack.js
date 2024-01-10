import Slack from "@slack/bolt";
import dotenv from "dotenv";
import { getIP } from "./get-ip.js";
dotenv.config();

const slackApp = new Slack.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});
const blocks = [
  {
    type: "image",
    image_url: `https://res.cloudinary.com/dv984vvz3/image/upload/v1702720071/x0ldyuij9whpzax1w7eu.png`,
    alt_text: "inspiration",
  },
  {
    type: "header",
    text: {
      type: "plain_text",
      text: "LEGAL SERVER STARTED 🚀",
      emoji: true,
    },
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*SERVER URL 👇*",
    },
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `http://${getIP()}:${process.env.PORT}`,
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "Check Server Connection",
        emoji: true,
      },
      url: `http://${getIP()}:${process.env.PORT}`,
      value: "server_url",
      action_id: "button-action",
    },
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*API URL 👇*",
    },
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `http://${getIP()}:${process.env.PORT}/api`,
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "Check API Connection",
        emoji: true,
      },
      url: `http://${getIP()}:${process.env.PORT}/api`,
      value: "api_url",
      action_id: "button-action",
    },
  },
];

export const sendSlackMessage = async (messgae, passedBlocks) => {
  try {
    await slackApp.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_CHANNEL,
      text:
        messgae ||
        `legal server started at http://${getIP()}:${process.env.PORT}`,
      blocks: passedBlocks || blocks,
    });
  } catch (err) {
    console.log({ err });
  }
};
