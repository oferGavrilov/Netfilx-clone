import Image from "next/image"
import { Movie } from "../models/main.model"
import { PlayIcon } from '@heroicons/react/24/solid'
import { PlusIcon, HandThumbUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface Props {
    movie: Movie | null
    pos: {
        x: number
        y: number
    }
    setIsHover(isHover: boolean): void
}

function HoverImgModal({ movie, pos, setIsHover }: Props) {

    return (
          <article onMouseLeave={() => setIsHover(false)} className='bg-black fixed top-[pos.y] left-[pos.x] z-30 flex flex-col h-[450px] w-[300px]'>
                <Image src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path}`}
                      alt="movie"
                        width="300"
                        height="150"
                      />
                     
                <div className='flex justify-between items-center'>
                    <div>
                        <span className='bg-white h-20 w-20 rounded-full'>
                            <PlayIcon className='h-5 w-5' />
                        </span>
                        <span className='bg-black h-20 w-20 rounded-full'>
                            <PlusIcon className='decoration-white h-5 w-5' />
                        </span>
                        <span className='bg-black h-20 w-20 rounded-full'>
                            <HandThumbUpIcon className='decoration-white h-5 w-5' />
                        </span>
                    </div>
                    <div>
                        <span className='bg-black h-20 w-20 rounded-full'>
                                <ChevronDownIcon className='decoration-white h-5 w-5' />
                        </span>
                    </div>
                </div>
          </article>
    )
}

export default HoverImgModal