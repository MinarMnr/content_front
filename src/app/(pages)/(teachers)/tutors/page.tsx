import React from 'react';
import Image from "next/image";
const Page = () => {
return (
<>
<div className="w-full">
   <div className="col-span-12">
      <div className="overflow-hidden relative banner-all heiht-custom-banner">
         <div className="w-full h-full top-0 absolute m-auto px-32">
            <div className='container mx-auto pt-30 pb-90px pl-28 pr-28'>
               <div className="basis-full flex flex-col justify-right items-center py-24">
                  <h2 className='text-3xl mt-5 font-normal  text-white'>All Tutors</h2>
               </div>
            </div>
         </div>
      </div>
      <div className='container mx-auto'>
         <div className='search-tutors flex mx-auto bg-white relative -top-10 justify-between pe-1'>
            <span className='m-4 ms-5 w-4'>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
               </svg>
            </span>
            <input type="text" name="tutors" className="w-100" placeholder='Search tutors...' />
            <button className='px-6 py-3 mt-1 text-white rounded-full border-r border-green-700 h-fit flex justify-center items-center bg-grren-custom hover:bg-green-900 '>
               Search Tutors 
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ms-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
               </svg>
            </button>
         </div>
      </div>
   </div>
   <div className="w-full">
      <div className="container mx-auto mb-16">
         <div className='grid md:grid-cols-4 grid-cols-1 gap-8 mt-14'>
            <div className='all-block-list'>
               <div className='all-list-img'>
                  <Image
                     src={"/tutors/2.png"}
                     alt={""}
                     width={500}
                     height={500}
                     />
               </div>
               <div className='content-all'>
                  <h3 className='line-clamp-2'>Afsana Mahfuz</h3>
                  <p className='line-clamp-2'>North South University</p>
                  <h5 className='line-clamp-2'>English, Bangla, Math</h5>
                  <button>View Profile</button>
               </div>
            </div>
            <div className='all-block-list'>
               <div className='all-list-img'>
                  <Image
                     src={"/tutors/1.png"}
                     alt={""}
                     width={500}
                     height={500}
                     />
               </div>
               <div className='content-all'>
                  <h3>Afsana Mahfuz</h3>
                  <p>North South University</p>
                  <h5>English, Bangla, Math</h5>
                  <button>View Profile</button>
               </div>
            </div>
            <div className='all-block-list'>
               <div className='all-list-img'>
                  <Image
                     src={"/tutors/3.png"}
                     alt={""}
                     width={500}
                     height={500}
                     />
               </div>
               <div className='content-all'>
                  <h3 className='line-clamp-2'>Afsana Mahfuz</h3>
                  <p className='line-clamp-2'>North South University</p>
                  <h5 className='line-clamp-2'>English, Bangla, Math</h5>
                  <button>View Profile</button>
               </div>
            </div>
            <div className='all-block-list'>
               <div className='all-list-img'>
                  <Image
                     src={"/tutors/1.png"}
                     alt={""}
                     width={500}
                     height={500}
                     />
               </div>
               <div className='content-all'>
                  <h3>Afsana Mahfuz</h3>
                  <p>North South University</p>
                  <h5>English, Bangla, Math</h5>
                  <button>View Profile</button>
               </div>
            </div>

            <div className='all-block-list'>
               <div className='all-list-img'>
                  <Image
                     src={"/tutors/1.png"}
                     alt={""}
                     width={500}
                     height={500}
                     />
               </div>
               <div className='content-all'>
                  <h3 className='line-clamp-2'>Afsana Mahfuz</h3>
                  <p className='line-clamp-2'>North South University</p>
                  <h5 className='line-clamp-2'>English, Bangla, Math</h5>
                  <button>View Profile</button>
               </div>
            </div>

            <div className='all-block-list'>
               <div className='all-list-img'>
                  <Image
                     src={"/tutors/1.png"}
                     alt={""}
                     width={500}
                     height={500}
                     />
               </div>
               <div className='content-all'>
                  <h3 className='line-clamp-2'>Afsana Mahfuz</h3>
                  <p className='line-clamp-2'>North South University</p>
                  <h5 className='line-clamp-2'>English, Bangla, Math</h5>
                  <button>View Profile</button>
               </div>
            </div>

            <div className='all-block-list'>
               <div className='all-list-img'>
                  <Image
                     src={"/tutors/1.png"}
                     alt={""}
                     width={500}
                     height={500}
                     />
               </div>
               <div className='content-all'>
                  <h3 className='line-clamp-2'>Afsana Mahfuz</h3>
                  <p className='line-clamp-2'>North South University</p>
                  <h5 className='line-clamp-2'>English, Bangla, Math</h5>
                  <button>View Profile</button>
               </div>
            </div>

            <div className='all-block-list'>
               <div className='all-list-img'>
                  <Image
                     src={"/tutors/1.png"}
                     alt={""}
                     width={500}
                     height={500}
                     />
               </div>
               <div className='content-all'>
                  <h3 className='line-clamp-2'>Afsana Mahfuz</h3>
                  <p className='line-clamp-2'>North South University</p>
                  <h5 className='line-clamp-2'>English, Bangla, Math</h5>
                  <button>View Profile</button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</>
)
}
export default Page