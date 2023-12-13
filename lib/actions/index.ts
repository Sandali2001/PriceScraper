"use server"
import Product from "../models/product.model";
 import { scrapeAmazonProduct } from "../scraper";
 import { connectToDB } from "@/lib/mongoose";

export async function scrapAndStoreProduct(productUrl: string){
    if(!productUrl) return;

    try{
      connectToDB();
       const scrapedProduct = await scrapeAmazonProduct (productUrl);

       //if(!scrapedProduct) return;
       let product = scrapedProduct;

       const existingProduct = await Product.findOne({url: scrapedProduct.url});

    } catch (error: any){

      throw new Error(`Sailed to create/update product: ${error.message}`)
    }
    
}