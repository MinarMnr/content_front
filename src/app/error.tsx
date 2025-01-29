'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import { removeClientCookie } from './_services/storage'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  useEffect(() => {
    if(JSON.parse(error?.message ?? '')?.code === 401){
      removeClientCookie();
    }
  }, [error])
 
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}