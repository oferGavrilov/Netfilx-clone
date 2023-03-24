import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modal'

import { Movie } from '../models/main.model'
import { movieService } from '../services/move.service'
import HoverImgModal from './HoverImgModal'

interface Props {
      movie: Movie
}

function Thumbnail({ movie }: Props) {
      const [movieDetails, setMovieDetails] = useState<Movie | null>(null)
      const [isHover, setIsHover] = useState(false)
      const [pos, setPos] = useState({x: 0, y: 0})
      const [showModal, setShowModal] = useRecoilState(modalState)
      const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
      const elArticle = useRef<HTMLDivElement>(null)
      useEffect(() => {
            loadMovieDetails()
            onSetPos()
      },[])

      async function loadMovieDetails() {
            const movieDetails = await movieService.getMovieById(movie.id) as Movie
            setMovieDetails(movieDetails)
      }

      function onSetPos() {
            if(elArticle.current) {
                  const x = elArticle.current.getBoundingClientRect().left
                  const y = elArticle.current.getBoundingClientRect().top
                  setPos({x, y})
            }
      }

      return (
            <article ref={elArticle}
             className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
             onClick={() => {
                  setCurrentMovie(movie)
                  setShowModal(true)
             }}
             >
                   <Image onMouseEnter={() => setIsHover(true)} src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
                        }`}
                        alt="movie"
                        className="rounded-sm object-cover md:rounded"
                        layout="fill" />
                  {/* {isHover && <HoverImgModal setIsHover={setIsHover} pos={pos} movie={movieDetails}/> } */}

            </article>
      )
}

export default Thumbnail
