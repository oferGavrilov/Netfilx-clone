import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modal'

import { Movie } from '../models/main.model'

interface Props {
      movie: Movie
      debounce: Function
      setPos(pos: Object): void
}

function Thumbnail({ movie, debounce, setPos }: Props) {
      const [movieDetails, setMovieDetails] = useState<Movie | null>(null)
      const [showModal, setShowModal] = useRecoilState(modalState)
      const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
      const elArticle = useRef<HTMLDivElement>(null)
      const timeout: any = useRef()

      useEffect(() => {
            // loadMovieDetails()
            // onSetPos()
      }, [])

      // async function loadMovieDetails() {
      //       const movieDetails = await movieService.getMovieById(movie.id) as Movie
      //       setMovieDetails(movieDetails)
      // }

      function onSetPos() {
            if (elArticle.current) {
                  let x = elArticle.current.getBoundingClientRect().left - 40
                  if (x < 0) x = 20
                  if (x + 350 >= window.innerWidth) x = window.innerWidth - 370
                  let y = elArticle.current.getBoundingClientRect().top - 100
                  if (y + 350 > window.innerHeight) y = window.innerHeight - 370
                  if (y < 0) y = 20
                  setPos({ x, y })
            }
      }

    

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
                        onMouseOver={() => {
                              debounce('mouse-enter')
                              onSetPos()
                        }}
                        alt="movie"
                        className="rounded-sm object-cover md:rounded"
                        layout="fill" />
            </article>
      )
}

export default Thumbnail
