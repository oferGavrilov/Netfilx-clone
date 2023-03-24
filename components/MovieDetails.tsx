import React, { useEffect, useState } from 'react'

import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modal'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Element, Genre, Movie } from '../models/main.model'
import { movieService } from '../services/move.service'
import ReactPlayer from 'react-player/lazy'

export default function MovieDetails() {
      const [showModal, setShowModal] = useRecoilState(modalState)
      const [movie, setMovie] = useRecoilState(movieState)
      const [trailer, setTrailer] = useState('')
      const [genres, setGenres] = useState<Genre[]>([])
      const [muted, setMuted] = useState(true)
      useEffect(() => {
            if (!movie) return
            loadMovieData()
      }, [movie])

      const loadMovieData = async () => {
            const data = await movieService.fetchMovie(movie?.id, movie?.media_type)
            console.log('data', data);
            if (data?.videos) {
                  const index = data.videos.results.findIndex((element: Element) => {
                        return element.type === 'Trailer'
                  })
                  setTrailer(data.videos?.results[index]?.key)
            }
            if (data?.genres) setGenres(data?.genres)
      }

      const handleClose = () => {
            setShowModal(false)
      }


      return (
            <MuiModal open={showModal} onClose={handleClose}>
                  <>
                        <button onClick={handleClose}
                              className="modalBtn absolute right-5 top-5 !z-40
                         h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
                              <XMarkIcon className='h-6 w-6' />
                        </button>

                        <div>
                              <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer}`}
                                    width="100%"
                                    height="100%"
                                    style={{ position: 'absolute', top: '0', left: '0' }}
                                    playing
                                    muted={muted} />
                        </div>
                  </>
            </MuiModal>
      )
}
