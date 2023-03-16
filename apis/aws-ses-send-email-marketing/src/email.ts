import aws from 'aws-sdk';
import { SESClient, CreateTemplateCommand } from "@aws-sdk/client-ses"; // ES Modules impor
import { OpenFinanceInformaRSSFeed } from './types';

var ses = new aws.SES({ region: "us-east-1" });
// const client = new SESClient({});
// const command = new CreateTemplateCommand({});
// const response = await client.send(command);
/**
 * Send Open Finance Informa Newsletter email.
 * Documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendTemplatedEmail-property
 *
 * @param {string} from - "From" address for the email.
 * @param {string} to - Email addresses of the "To" recipients for the email.
 * @param {feedContent} data - the feed RSS items data.
 */
export default async function sendNewsletterEmail(
  from: string,
  to: string,
  feedContent:  OpenFinanceInformaRSSFeed["data"]
) {
  let emailMessage = '';

  emailMessage += `\n\nFeed do Open Finance Informa:`

  var params = {
    // FromEmailAddress: from,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: emailMessage },
      },

      Subject: { Data: "Open Finance Informa - Últimos informes" },
    },
    Source: "SourceEmailAddress",
    Template: 'MainFeedRSSTemplate', // template name
    TemplateData: feedContent
  };
 
  return ses.sendEmail(params).promise()
}
