import React, { useRef, useState } from 'react'
import MuiModal from '@mui/material/Modal'

import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

import { Movie } from '../models/main.model'
import Thumbnail from './Thumbnail'
import HoverImgModal from './HoverImgModal'

interface Props {
      title: string
      movies: Movie[]
}

function Row({ title, movies }: Props) {
      const rowRef = useRef<HTMLDivElement>(null)
      const [isMoved, setIsMoved] = useState(false)
      const [isHover, setIsHover] = useState(false)
      const [pos, setPos] = useState({ x: 0, y: 0 })
      const [size, setSize] = useState({ width: 0, height: 0 })

      const handleClick = (direction: string) => {
            setIsMoved(true)
            if (rowRef.current) {
                  const { scrollLeft, clientWidth } = rowRef.current
                  const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth

                  rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
            }
      }

      function handleHover(type?: string) {
            // if (isHover && type === 'mouse-enter') return
            if (type === 'mouse-enter') {
                  setIsHover(true)
                  setTimeout(() => {
                        setSize({ width: 350, height: 350 })
                  }, 800)
            }
            else {
                  setIsHover(false)
                  setSize({ width: 0, height: 0 })
            }
      }
      return (
            <div className='h-40 space-y-0.5 md:space-y-2'>
                  <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>{title}</h2>
                  <div className='group relative md:ml-2'>
                        <ChevronLeftIcon className={`arrow left-2 ${!isMoved && 'hidden'}`} onClick={() => handleClick("left")} />

                        <div ref={rowRef} className='flex items-center scrollbar-hide space-x-5 overflow-x-scroll md:space-x-2.5 md:p-2'>
                              {movies.map(movie => (
                                    <Thumbnail setPos={setPos} handleHover={handleHover} key={movie.id} movie={movie} />
                              ))}
                        </div>
                        {size.width !== 0 &&
                              < MuiModal open={isHover} onClose={() => setIsHover(false)}
                                    className='!fixed z-50' style={{ top: `${pos.y}px`, left: `${pos.x}px`, width: size.width + 'px', height: size.height + 'px' }}>

                                    <HoverImgModal handleHover={handleHover} />
                              </MuiModal>}
                        <ChevronRightIcon className='arrow right-2' onClick={() => handleClick("right")} />
                  </div>
            </div >
      )
}

export default Row
