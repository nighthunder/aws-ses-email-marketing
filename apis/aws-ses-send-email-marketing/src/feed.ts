import parser from 'rss-parser'
/**
 * Load from the RSS Feed.
 * Documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendTemplatedEmail-property
 *
 * @param {url} from - "URL" address for the rss feed.
 */

export default async function loadFromRSSFeed(
    url: string
){
    
    const feed = await (new parser()).parseURL(url)!;
    const { title, items } = feed

    return feed.items
}