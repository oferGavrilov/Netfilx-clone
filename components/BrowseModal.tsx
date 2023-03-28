import React from 'react'
import MuiModal from '@mui/material/Modal'

interface Props {
      isOpen: boolean
      setIsOpen: Function
}

function BrowseModal({ isOpen, setIsOpen }: Props) {

      function onSetFilter(type: string) {
            console.log(type)
      }

      return (

            <MuiModal className='md:hidden '
                  open={isOpen} onClose={() => setIsOpen(false)}
                  hideBackdrop={true}>
                  <ul className='!outline-none  fixed py-1 bg-black/80 flex flex-col gap-y-2  w-[270px] h-max !top-14 !left-12  '>
                        <li className='filter-tag' onClick={() => onSetFilter('home')}>Home</li>
                        <li className='filter-tag' onClick={() => onSetFilter('tv-shows')}>Tv Shows</li>
                        <li className='filter-tag' onClick={() => onSetFilter('movies')}>Movies</li>
                        <li className='filter-tag' onClick={() => onSetFilter('popular')}>New & Popular</li>
                        <li className='filter-tag' onClick={() => onSetFilter('my-list')}>My List</li>
                        <li className='filter-tag' onClick={() => onSetFilter('languages')}>Browse by Languages</li>
                  </ul>
            </MuiModal>
      )
}

export default BrowseModal