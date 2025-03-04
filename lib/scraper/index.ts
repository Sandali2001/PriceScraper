import axios from 'axios';
import * as cheerio from 'cheerio';

import {extractPrice} from '../utils';
import { extractCurrency } from '../utils';
//import { extractDescription } from '../utils';

export async function scrapeAmazonProduct(url:string) {
   if(!url) return;

   //BrightData proxy configuration

   //curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_91119131-zone-unblocker:j0fh0n6sdxy0 -k https://lumtest.com/myip.json

   const username = String(process.env.BRIGHT_DATA_USERNAME);
   const password = String(process.env.BRIGHT_DATA_PASSWORD);  
   const port = 22225;
   const session_id = (1000000* Math.random()) | 0;
   const options = {
    auth:{
        username: `${username}-session-${session_id}`,
        password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,

   }
   try{
     //fetch the product page
     const response  = await axios.get(url, options);
     //console.log(response.data)
     const $ = cheerio.load(response.data);

     //Extract the product title
     const title = $('#productTitle').text().trim();
     //console.log(title);
     const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $('.a-price.a-text-price')
     );
     //console.log(currentPrice);
     const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
     );
    // console.log(originalPrice);
     const outOfStock = $('#availability span').text().trim().toLowerCase()=== 'curently unavailable';
    // console.log(outOfStock);
     const images = $('#imgBlkFront').attr('data-a-dynamic-image') || 
                   $('#landingImage').attr('data-a-dynamic-image')||
                    '{}'     
                   const imageUrls=Object.keys(JSON.parse(images));
                  // console.log(imageUrls);   
    const currency = extractCurrency($('.a-price-symbol') ) 
   // console.log(currency);                
    const  discountRate = $('.savingsPercentage').text().replace(/[-%]/g,'');
    //console.log(discountRate);
    //const description = extractDescription($);
    //construct data object with scraped info

    const data = {
      url,
      currency: currency || '$',
      image : imageUrls[0],
      title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice),
      priceHistory:[],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount:100,
      stars: 4.5,
      isOutOfStock : outOfStock, 
      highestPrice: Number(originalPrice),
      lowestPrice: Number(currentPrice),
      average: Number(currentPrice) ||  Number(originalPrice),
    }
    console.log(data);
    return(data);
   }catch(error: any){
     throw new Error (`Failed to scrape product: ${error.message}`)
   }
}