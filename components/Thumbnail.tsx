import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modal'
import MuiModal from '@mui/material/Modal'

import { Movie } from '../models/main.model'
import { movieService } from '../services/move.service'
import HoverImgModal from './HoverImgModal'

interface Props {
      movie: Movie
      handleHover: Function
}

function Thumbnail({ movie, handleHover }: Props) {
      const [movieDetails, setMovieDetails] = useState<Movie | null>(null)
      // const [isHover, setIsHover] = useState(false)
      const [isHover, setIsHover] = useState(false)
      const [showModal, setShowModal] = useRecoilState(modalState)
      const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
      const elArticle = useRef<HTMLDivElement>(null)

      useEffect(() => {
            // loadMovieDetails()
            // onSetPos()
      }, [])

      // async function loadMovieDetails() {
      //       const movieDetails = await movieService.getMovieById(movie.id) as Movie
      //       setMovieDetails(movieDetails)
      // }

      return (
            <article ref={elArticle}
                  className='relative h-28 min-w-[180px] cursor-pointer ease-out md:h-36 md:min-w-[260px] '
                  onClick={() => {
                        setCurrentMovie(movie)
                        setShowModal(true)
                  }}
                  >
                  <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
                        }`}
                        onMouseEnter={(ev) => handleHover(ev, 'mouse-enter')}
                        alt="movie"
                        className="rounded-sm object-cover md:rounded"
                        layout="fill" />
            </article>
      )
}

export default Thumbnail
