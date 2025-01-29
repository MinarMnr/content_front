import React from 'react';
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
const Page = () => {
return (
<>
<div className="relative banner-all heiht-custom-profile">
   <div className="w-full h-full top-0 m-auto px-32">
      <div className="container mx-auto pt-30 pb-90px pl-28 pr-28">
         <div className="basis-full">
            <div className="inset-0 flex flex-col justify-center space-y-2">
               <div className='tutor-profile'>
                  <div className='tutor-profile-left'>
                     <Image
                        src={"/tutors/2.png"}
                        alt={""}
                        width={500}
                        height={500}
                        />
                  </div>
                  <div className='tutor-profile-details'>
                     <h2 className='text-3xl text-gray-200 mb-2'>Tania Parvin Lira</h2>
                     <p>
                        <label>ID#:</label>
                        <span>
                        TS-102981
                        </span>
                     </p>
                     <p>
                        <label>Gender:</label>
                        <span>Female</span>
                     </p>
                     <p><label>Qualification:</label>
                        <span>BSC</span>
                     </p>
                     <p><label>Area Covered:</label>
                        <span>
                        Dhaka(Uttara Sector 13, Uttara Sector 14, Uttara Sector 12, Uttara Sector 7, Uttara Sector 11)
                        </span>
                     </p>
                     <button className='btn-all-style mt-3 text-white'>Member Since:August 13, 2024</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div className='profile-bottom'>
      <div className="container mx-auto pt-30 pb-90px pl-28 pr-28">
         <p className='p-rating'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-600">
               <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
            </svg>
            <span className='ms-1 me-1'>0.00</span>
            <label className='ms-1 font-extrabold'>(0 Review)</label>
         </p>
      </div>
   </div>
</div>
<div className='container mx-auto grid grid-cols-7 py-24'>
   <div className='col-span-2 text-center ps-8 pe-16'>
      <div className='left-pan-all'>
         {/* <div className='thumbnail'>
         </div> */}
         <h5 className='text-2xl'>Ratings & Reviews</h5>
         <h4 className='mt-2 mb-2 text-green-700'>Student Reviews</h4>
         <div className='rating-list'>
            <span className='flex'>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-600">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-600">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-600">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-600">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-600">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
               </svg>
            </span>
         </div>
         <div className="contact-with-info mt-4">
            <p className='mt-2 mb-2'>0.00 Out of 5</p>
            <p className='mt-2 mb-2'>(0 Ratings)</p>
         </div>
         {/* <a href=''>
         <button className='btn-all mt-12'>View all coures</button>
         </a> */}
         <div className='progress-bar mt-3'>
            <p>
               <label>5 star</label>
               <progress className='bg-gray-100' value={0} />
               <label>0.00%</label>
            </p>
            <p>
               <label>5 star</label>
               <progress value={0.5} />
               <label>0.00%</label>
            </p>
            <p>
               <label>5 star</label>
               <progress value={0.7} />
               <label>0.00%</label>
            </p>
            <p>
               <label>5 star</label>
               <progress value={75} max={100} />
               <label>0.00%</label>
            </p>
            <p>
               <label>5 star</label>
               <progress value={1} />
               <label>0.00%</label>
            </p>
         </div>
      </div>
   </div>
   <div className='col-span-5'>
      <div className="grid grid-cols-7 w-full">
         <div className="col-span-7 flex flex-col justify-start items-stretch">
            <h2 className='text-2xl font-semibold text-gray-600  my-4'>Tuition Info</h2>
            <div className='tuition-info'>
               <ul>
                  <li>
                     <label>Expected Minimum Salary:</label>
                     <p>6000 Tk/Month</p>
                  </li>
                  <li>
                     <label>Current Status for Tuition:</label>
                     <p><span className='bg-green-800 rounded-full text-white p-1 ps-3 pe-3'>Available</span></p>
                  </li>
                  <li>
                     <label>Days Per Week:</label>
                     <p>3 Day/Week, 4 Day/Week, 5 Day/Week</p>
                  </li>
                  <li>
                     <label>Preferred Tuition Style:</label>
                     <p>Private Tuition</p>
                  </li>
                  <li>
                     <label>Tuitoring Experience:</label>
                     <p>2 Years</p>
                  </li>
                  <li>
                     <label>Place of Learning:</label>
                     <p>Home Visit</p>
                  </li>
                  <li>
                     <label>Extra Facilities:</label>
                     <p>Phone help</p>
                  </li>
                  <li>
                     <label>Preferred Medium of Instruction:</label>
                     <p>English Version</p>
                  </li>
                  <li>
                     <label>Preferred Class:</label>
                     <p>Class 8 (English Version), Class 9 (English Version), Class 10 (English Version), HSC-1st YEAR (English Version), HSC-2nd YEAR (English Version)</p>
                  </li>
                  <li>
                     <label>Preferred Subjects:</label>
                     <p>
                        Math (Class 8), Science Exercise Book (Class 9)
                     </p>
                  </li>
               </ul>
            </div>
            <div className="text-2xl font-semibold text-gray-600  my-3 mt-8">
               Educational Qualification
            </div>
            <table className="table table-custom border education-table">
               <thead>
                  <tr>
                     <th>Exam Name</th>
                     <th>Year</th>
                     <th>Institute</th>
                     <th>Group/Subject</th>
                     <th>Result</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td> SSC / O-level / Dakhil</td>
                     <td>2023</td>
                     <td>Milestone College</td>
                     <td>Science </td>
                     <td>5.00</td>
                  </tr>
                  <tr>
                     <td>HSC / A level / Alim</td>
                     <td>2023</td>
                     <td>Milestone College</td>
                     <td>Science </td>
                     <td>5.00</td>
                  </tr>
                  <tr>
                     <td>Graduation / Bachelor / Diploma</td>
                     <td>null</td>
                     <td>Daffodil International University ( DIU )</td>
                     <td>Software Engineering </td>
                     <td>null</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
</div>
</>
)
}
export default Page