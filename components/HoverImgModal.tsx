import Image from "next/image"
import { Movie } from "../models/main.model"
import { PlayIcon } from '@heroicons/react/24/solid'
import { PlusIcon, HandThumbUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react"

interface Props {
    handleHover: Function
}

function HoverImgModal({ handleHover }: Props) {



    return (
        <article onMouseLeave={(ev) => handleHover(ev, 'mouse-leave')}
         className='bg-black flex flex-col h-[350px] w-[350px] transition'>
            {/* <Image src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path}`}
                alt="movie"
                width="300"
                height="150"
            /> */}

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