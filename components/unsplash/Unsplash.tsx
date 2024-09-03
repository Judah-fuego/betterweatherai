'use client' // Add if using Client Components in Next.js 13+

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Constants
const UNSPLASH_ROOT = 'https://api.unsplash.com'
const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID
const placeholderPhoto = '/greeceboat.jpg'

// Define the Unsplash Component
export const Unsplash = () => {
  // State to store photo URL
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [photoOwner, setPhotoOwner] = useState<string | null>(null)
  const [portfolioUrl, setPortfolioUrl] = useState<string | null>(null)

  // Fetch photo when component mounts
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(
          `${UNSPLASH_ROOT}/photos/random?collections=1408037&count=1&orientation=portrait&client_id=${clientId}`
        )
        console.log(response)
        const data = await response.json()
        if (data && data.length > 0) {
          setPhotoUrl(data[0].urls.regular)
          setPhotoOwner(data[0].user.name || "Unnamed")
          setPortfolioUrl(data[0].user.portfolio_url) // Use 'regular' or any appropriate size
        }
      } catch (error) {
        console.error('Error fetching photo:', error)
        setPhotoUrl(placeholderPhoto)
        setPhotoOwner('Judah Fuego')
        setPortfolioUrl(`https://www.youtube.com/watch?v=b6CLL_JvWxw`)
      }
    }

    fetchPhoto();
  }, [])

  // Return the component
  return (
    <div className=' w-[50%] h-screen overflow-hidden'>
      {photoUrl ? (
        <>
          
         {/* Display the photographer's name and link to their portfolio */}
         {photoOwner && portfolioUrl && (
            <p className="fixed bottom-3 left-3 p-2 bg-white/50 rounded-lg">
              <Link href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                By: {photoOwner}
              </Link>
            </p>
          )}
          <Image
          src={photoUrl}
          alt="Random Unsplash Photo"
          width={750} // Adjust width based on your layout
          height={200} // Adjust height based on your layout
          className="cover"
          priority
          // Optional: styling to fit image nicely
        />
        </>
        
      ) : (
        <p>Loading...</p>// Loading state while the image is being fetched
      )}
      {}
    </div>
  )

}

export default Unsplash