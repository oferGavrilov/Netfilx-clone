import Image from 'next/image'
import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { movieState } from '../atoms/modal'

import { Movie } from '../models/main.model'

interface Props {
      movie: Movie
      debounce: Function
      setPos(pos: Object): void
}

function Thumbnail({ movie, debounce, setPos }: Props) {
      const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
      const elArticle = useRef<HTMLDivElement>(null)

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

      function onHover() {
            if (elArticle.current) {
                  const pos = {x: elArticle.current.getBoundingClientRect().left, y:elArticle.current.getBoundingClientRect().top}
                  debounce(pos, elArticle.current.clientWidth, elArticle.current.clientHeight)
                  setCurrentMovie(movie)
                  onSetPos()
            }
      }

      return (
            <article ref={elArticle}
                  className='relative h-28 min-w-[180px] cursor-pointer ease-out md:h-36 md:min-w-[260px]'>
                  <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
                        }`}
                        onMouseOver={onHover}
                        alt="movie"
                        className="rounded-sm object-cover md:rounded"
                        layout="fill" />
            </article>
      )
}

export default Thumbnail