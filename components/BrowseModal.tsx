import React from 'react'
import MuiModal from '@mui/material/Modal'

interface Props {
      isOpen: boolean
      setIsOpen: Function
}

function BrowseModal({ isOpen, setIsOpen }: Props) {
      return (

            <MuiModal className='fixed !top-14 !left-12 w-[300px] h-max bg-black/80 md:hidden '
                  open={isOpen} onClose={() => setIsOpen(false)}
                  hideBackdrop={true}>
                  <ul className='!outline-none 
              p-5'>
                        <li>Home</li>
                        <li>Tv Shows</li>
                        <li>Movies</li>
                        <li>New & Popular</li>
                        <li>My List</li>
                        <li>Browse by Languages</li>
                  </ul>
            </MuiModal>
      )
}

export default BrowseModal