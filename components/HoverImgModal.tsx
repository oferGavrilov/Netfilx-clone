import Image from "next/image"
import { Data, Element } from "../models/main.model"
import { PlayIcon } from '@heroicons/react/24/solid'
import { PlusIcon, HandThumbUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { BsCircleFill } from 'react-icons/bs'
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modal"
import { movieService } from "../services/move.service"
import ReactPlayer from "react-player/lazy"
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa"

interface Props {
    handleHover: Function
}

function HoverImgModal({ handleHover }: Props) {
    const [movie, setMovie] = useRecoilState(movieState)
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [trailer, setTrailer] = useState('')
    const [data, setData] = useState<Data>()
    const [muted, setMuted] = useState(true)
    const [isReady, setIsReady] = useState(false)

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
        setData(data)
  }

  function getAge() {
    return data?.adult ? '18+' : '12+'
  }

  function getRunTime() {
    const runTime:number = data?.runtime || 0
    const hours = Math.floor(runTime / 60)
    const minutes = runTime % 60
    let result = hours ? hours + 'h ' : ''
    result += minutes ? minutes + 'm' : ''
    return result
  }

    return (
        <article onMouseLeave={(ev) => handleHover(ev, 'mouse-leave')} 
         className='bg-[#141414] flex flex-col rounded-lg font-medium'>
            <div className="h-[200px] w-[350px] relative" >
            {!trailer ? <Image src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path}`}
                alt="movie"
                layout="fill"
                className="rounded-lg"
            /> : 
            <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="100%"
                loop={true}
                playing={true}
                muted={muted} />
        }
             {trailer && <button className='modalBtn h-9 w-9 absolute bottom-5 right-5' onClick={() => setMuted(!muted)}>
                        {muted ? (
                            <FaVolumeMute className='h-4 w-4' />
                        ) : (
                            <FaVolumeUp className='h-4 w-4' />
                        )}
                </button>}
            </div>
            <div className="h-[150px] shadow-lg shadow-black p-[24px] flex flex-col justify-between" >
                <div className='center-flex justify-between'>
                    <div className="center-flex self-start gap-[8px]">
                        <span className='bg-white h-8 w-8 rounded-full center-flex'>
                            <PlayIcon className='h-5 w-5 text-black' />
                        </span>
                        <span className='hover-modal-btn'>
                            <PlusIcon className='decoration-white h-5 w-5' />
                        </span>
                        <span className='hover-modal-btn'>
                            <HandThumbUpIcon className='decoration-white h-5 w-5' />
                        </span>
                    </div>
                    <div className="center-flex self-start" onClick={() => setShowModal(true)}>
                        <span className='hover-modal-btn'>
                            <ChevronDownIcon className='decoration-white h-5 w-5' />
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-[#e5e5e5]">
                        <p className="font-semibold text-green-400">
                            {(movie?.vote_average * 10).toFixed()}% Match
                        </p>
                        <div className="flex h-6 w-10 items-center justify-center rounded border border-white/40 px-1.5 text-[15px]">
                            {getAge()}
                        </div>
                        <div className="text-[15px]">
                            {getRunTime()}
                        </div>
                        <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                            HD
                        </div>
                </div>
                <ul className='flex text-[#e5e5e5] font-medium'>
                    {data?.genres?.map((genre, idx) => (
                        <li className='center-flex' key={genre.id}>
                            {genre.name}
                            {idx < (data?.genres?.length - 1) && <BsCircleFill className='h-1 w-1 mx-[8px]' />}
                        </li>
                    )) } 
                </ul>
            </div>
        </article>
    )
}

export default HoverImgModal