import { getProductById } from '@/lib/actions'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link';
import { Product } from '@/types';
import { formatNumber } from '@/lib/utils';
import PriceInfoCard from '@/components/PriceInfoCard';

type Props={
  params: {id:string}
}

const ProductDetails = async ({params:{id}}: Props) => {

  const product: Product = await getProductById(id);
  if(!product) redirect('/');
  return (
    <div className='product-container'>
      <div className='flex gap-28 xl:flex-row flex-col'>
        <div className='product-image'>
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={400}
            className='mx-auto'
            />
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
            <div className='flex flex-col gap-3'>
              <p className='text-[28px] text-secondary font-semibold'>{product.title}</p>
              <Link
              href={product.url}
              target="_blank"
              className='text-base text-black opacity-50'
              >
              Visit Product
              </Link>
            </div>

            <div className = "flex items-center gap-3">
              <div className='product-hearts'>
                <Image
                src="/assets/icons/red-heart.svg"
                alt="heart"
                width={20}
                height={20}
                />
                <p className='text-base font-semibold text[#D46F77]'>{product.reviewsCount}</p>
              </div>

              <div className='p-2 bg-white-200 rounded-10'>
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt = 'bookmark'
                  width={20}
                  height={20}
                />
              </div>
              <div className='p-2 bg-white-200 rounded-10'>
                <Image
                  src="/assets/icons/share.svg"
                  alt = 'share'
                  width={20}
                  height={20}
                />
              </div>

            </div>
          </div>
          <div className= "product-info">
             <div className='flex flex-col gap-2'>
                <p className="text-[34px] text-secondary font-bold">{product.currency} {formatNumber(product.currentPrice)}</p>
                <p className="text-[21px] text-black opacity-50 line-through font-bold">{product.currency} {formatNumber(product.originalPrice)}</p>
             </div>

             <div className='flex flex-col gap-4'>
                <div className='flex-gap-3'>
                  <div className='product-stars'>
                    <Image
                    src='/assets/icons/star.svg'
                    alt="star"
                    width={16}
                    height={16}
                    />
                    <p className='text-sm text-primary-orange font-semibold'>
                      {product.stars || '25' }
                    </p>
                  </div>
                  <div>
                   <Image 
                     src='/assets/icons/comment.svg'
                     alt='comment'
                     width={16}
                     height={16}
                   />     
                   <p className='text-sm text-secondary font-semibold'>{product.reviewsCount}</p>             
                    </div>
                </div>
                <p className='text-sm text-black opacity-50'>
                  <span className='text-primary-green font-semibold'>93%</span> of buyers have recommended this.
                </p>
             </div>
          </div>

          <div className='my-7 flex flex-col gap-5'>
            <div className='flex gap-5 flex-wrap'>
                 <PriceInfoCard
                  title = "Current Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                  borderColor ='#b6dbff'
                 />
                 <PriceInfoCard
                  title = " Average Price"
                  iconSrc="/assets/icons/chart.svg"
                  value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                  borderColor ='#b6dbff'
                 />
                 <PriceInfoCard
                  title = "Current Price"
                  iconSrc="/assets/icons/arrow-up.svg"
                  value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                  borderColor ='#FCC'
                 />
                 <PriceInfoCard
                  title = "Current Price"
                  iconSrc="/assets/icons/arrow-down.svg"
                  value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                  borderColor ='#BEFFCS'
                 />
            </div>
          </div>
          Modal
        </div>
      </div>
      <div className='flex flex-col gap-16 border-red-500'>
         <div className='flex flex-col gap-5'>
          <h3 className='text-2xl text-secondary font-semibold'>
              Product Description    
          </h3>

          <div className='flex flex-col gap-4'>
            {product.description?.split ('\n')}
          </div>
         </div>
         <button className='btn w-fit mx-auto flex items-center'>
          <Image
          src='/assets/icons/bag.svg'
          alt ='check'
          width={22}
          height={22}
          />
          <Link href='/' className='text-base text-white'></Link> BUY NOW
         </button>
      </div>


   </div>
  )
}

export default ProductDetails