import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import ReactPlayer from 'react-player/lazy'

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'

import { modalState, movieState } from '../atoms/modal'
import { Element, Genre } from '../models/main.model'
import { movieService } from '../services/move.service'

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
            console.log(data)
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
            <MuiModal open={showModal} onClose={handleClose} className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden 
            overflow-y-scroll rounded-md scrollbar-hide">
                  <>
                        <button onClick={handleClose}
                              className="modalBtn absolute right-5 top-5 !z-40
                         h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
                              <XMarkIcon className='h-6 w-6' />
                        </button>

                        <div className='relative pt-[56.25%]'>
                              <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer}`}
                                    width="100%"
                                    height="100%"
                                    style={{ position: 'absolute', top: '0', left: '0' }}
                                    playing
                                    muted={muted} />

                              <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
                                    <div className='flex space-x-2'>
                                          <button className='flex items-center gap-x-2 rounded 
                                                 bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                                                <FaPlay className="h-7 w-7 text-black" />
                                                Play
                                          </button>
                                          <button className='modalBtn'>
                                                <PlusIcon className='h-7 w-7' />
                                          </button>
                                          <button className='modalBtn'>
                                                <HandThumbUpIcon className='h-7 w-7' />
                                          </button>
                                    </div>

                                    <button className='modalBtn' onClick={() => setMuted(!muted)}>
                                          {muted ? (
                                                <FaVolumeMute className='h-6 w-6' />
                                          ) : (
                                                <FaVolumeUp className='h-6 w-6' />
                                          )}
                                    </button>
                              </div>
                        </div>
                        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                              <div className="space-y-6 text-lg">
                                    <div className="flex items-center space-x-2 text-sm">
                                          <p className="font-semibold text-green-400">
                                                {(movie?.vote_average * 10).toFixed()}% Match
                                          </p>
                                          <p className="font-light">
                                                {movie?.release_date || movie?.first_air_date}
                                          </p>
                                          <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                                                HD
                                          </div>
                                    </div>

                                    <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                                          <p className="w-5/6">{movie?.overview}</p>
                                          <div className="flex flex-col space-y-3 text-sm">
                                                <div>
                                                      <span className="text-[gray]">Genres: </span>
                                                      {genres.map((genre) => genre.name).join(', ')}
                                                </div>

                                                <div>
                                                      <span className="text-[gray]">Original language: </span>
                                                      {movie?.original_language}
                                                </div>

                                                <div>
                                                      <span className="text-[gray]">Total votes: </span>
                                                      {movie?.vote_count}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>

                  </>
            </MuiModal>
      )
}
