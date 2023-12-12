"use server"

export async function scrapAndStoreProduct(productUrl: string){
    if(!productUrl) return;

    try{
       const scrapedProduct = await scrapAmazonProduct(productUrl);
    } catch (error: any){

      throw new Error(`Sailed to create/update product: ${error.message}`)
    }
    
}