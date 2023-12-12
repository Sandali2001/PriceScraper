"use client"

import { scrapAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonProductURL = (url: string) => {
   try{ 
       const parsedURL =  new URL(url);
       const hostname = parsedURL.hostname;

       if (hostname.includes('amazon.com')|| hostname.includes('amazon.')|| hostname.endsWith('amazon')){
        return true;
       }
   }catch(error){ 
          return false;
   }
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState ('');
  const [isLoading, setIsLoading] = useState(false);

    const handleSubmit= async (event : FormEvent<HTMLFormElement>)=>{
      event.preventDefault();

      const isValidLink= isValidAmazonProductURL(searchPrompt);
      //alert(isValidLink ? 'Valid Link' : 'Invalid Link')
      if (!isValidLink) return alert ('Please provide a valid Amazon Link');
       
       try {
           setIsLoading(true);

           //Scrape the product
           const product = await scrapAndStoreProduct(searchPrompt);
       }catch (error){
          console.log(error);
       } finally{
        setIsLoading(false);
       }
    }
  return (
    <div>
        <form className='flex flex-wrap gap- mt-12'
        onSubmit={handleSubmit}
        >
        <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
        />

        <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}
        >
        {isLoading? 'Searching...' : 'Search'}
        </button>
        </form>
    </div>
  )
}

export default Searchbar