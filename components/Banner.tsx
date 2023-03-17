import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Movie } from '../models/main.model'
import { baseUrl } from '../utils/constants'
interface Props {
      netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
      const [movie, setMovie] = useState<Movie | null>(null)


      useEffect(() => {
            setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
      }, [netflixOriginals])

      console.log(movie)
      return (
            <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
                  <div className='absolute top-0 left-0 h-[95vh] -z-10 w-screen'>
                        <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path }`} 
                        alt="/" layout='fill' objectFit='cover' />
                  </div>

                  <h1 className='text-2xl lg:text-7xl md:text-4xl font-bold'>{movie?.title || movie?.name || movie?.original_name}</h1>
                  <p className='max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>{movie?.overview}</p>
            </div>
      )
}

export default Banner