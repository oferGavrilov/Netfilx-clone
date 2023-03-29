import React, { useEffect, useRef, useState } from 'react'
import MuiModal from '@mui/material/Modal'

import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

import { Movie } from '../models/main.model'
import Thumbnail from './Thumbnail'
import HoverImgModal from './HoverImgModal'
import debounce from 'debounce';

interface Props {
      title: string
      movies: Movie[]
}

function Row({ title, movies }: Props) {
      const rowRef = useRef<HTMLDivElement>(null)
      const [isMoved, setIsMoved] = useState(false)
      const [isHover, setIsHover] = useState(false)
      const [modalPos, setModalPos] = useState({ x: 0, y: 0 })
      const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
      const [size, setSize] = useState({ width: 0, height: 0 })
      const debounceHover = debounce(handleHover, 1000)
      useEffect(() => {
            const handleMouseMove = (event: any) =>{
                  setMousePos({ x: event.clientX, y: event.clientY })
                  console.log('event:', event)
                  console.log('modalPos:', event.clientX, event.clientY)
            } 
            window.addEventListener('mousemove', handleMouseMove);
            return () => {window.removeEventListener('mousemove', handleMouseMove)} 
      })

      const handleClick = (direction: string) => {
            setIsMoved(true)
            if (rowRef.current) {
                  const { scrollLeft, clientWidth } = rowRef.current
                  const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth

                  rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
            }
      }

      function handleHover(pos: {x: number, y: number}, width: number, height: number) {
            setMousePos(mousePos => {
                  if(pos.x < mousePos.x && pos.x + width > mousePos.x && 
                        pos.y < mousePos.y && pos.y + height > mousePos.y) {
                              toggleModal('mouse-enter')  
                        }
                  return mousePos
            })
      }

      function toggleModal(type?: string) {
            if (isHover && type === 'mouse-enter') return
            if (type === 'mouse-enter') {
                  setIsHover(true)
                  setSize({ width: 350, height: 350 })
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
                                    <Thumbnail setPos={setModalPos} debounce={debounceHover} key={movie.id} movie={movie} />
                              ))}
                        </div>
                        {isHover &&
                              < MuiModal hideBackdrop={true} open={isHover} onClose={() => setIsHover(false)}
                                    className='!fixed z-50'
                                    style={{ top: `${modalPos.y}px`, left: `${modalPos.x}px`, width: size.width + 'px', height: size.height + 'px' }}>
                                    <HoverImgModal handleHover={toggleModal} />
                              </MuiModal>}
                        <ChevronRightIcon className='arrow right-2' onClick={() => handleClick("right")} />
                  </div>
            </div >
      )
}

export default Row

// let value1 = 2
// let value2 = 4

// value1 *= value1 + value2 * value2 / value1
// console.log(value1)