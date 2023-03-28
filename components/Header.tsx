import { useEffect, useState } from 'react'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { VscTriangleDown } from 'react-icons/vsc'
import useAuth from '../custom-hook/useAuth'
import BrowseModal from './BrowseModal'
import Link from 'next/link'

function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isShowBrowseModal, setIsShowBrowseModal] = useState(false)
    const { logout } = useAuth()


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) setIsScrolled(true)
            else setIsScrolled(false)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`} >
            <div className='flex items-center space-x-2 md:space-x-10'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png'
                    alt="logo"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                />

                <ul className='hidden space-x-4 md:flex'>
                    <li className='headerLink'>Home</li>
                    <li className='headerLink'>TV Shows</li>
                    <li className='headerLink'>Movies</li>
                    <li className='headerLink'>New & popular</li>
                    <li className='headerLink'>My List</li>
                </ul>
                <div onClick={() => setIsShowBrowseModal(!isShowBrowseModal)} className='flex relative pl-6 items-center gap-x-1 md:hidden cursor-pointer'>
                    <span className=''>Browse</span>
                    <VscTriangleDown className='text-m' />
                    {isShowBrowseModal && <BrowseModal isOpen={isShowBrowseModal} setIsOpen={setIsShowBrowseModal} />}
                </div>
            </div>

            <div className='flex items-center space-x-4 text-sm font-light' >
                <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline" />
                <p className='hidden lg:inline'>Kids</p>
                <BellIcon className='h-6 w-6' />
                <Link href="/account">
                    <img
                        // onClick={logout}
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="/"
                        className="cursor-pointer rounded w-6"
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header