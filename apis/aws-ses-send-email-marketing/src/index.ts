import sendNewsletterEmail from './email';
import loadFromRSSFeed from './feed';
import { OpenFinanceInformaRSSFeed } from './types';

/**
 * Update setup infomration.
 */
async function sendNewsletter() {

    const feedObj = loadFromRSSFeed("https://us5.campaign-archive.com/feed?u=49f5ff8910ce85bdb1d9a7864&id=2c187fce9d")

    console.log("feedObj", feedObj)
    console.log("Aqui porra")
    return feedObj
    //const ToEmailAddress = "mayamoraiss@gmail.com" 
    
    //await sendNewsletterEmail("",ToEmailAddress, JSON.parse(JSON.stringify(feedObj)))

}

sendNewsletter()

// This is the AWS Lambda entry point, we cannot remove the context argument and export default
// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/prefer-default-export
export async function lambdaHandler(event: any, context?: any) {
    const feed = await sendNewsletter();
    console.log(feed)
    return {
      statusCode: 200
    };
  }
  