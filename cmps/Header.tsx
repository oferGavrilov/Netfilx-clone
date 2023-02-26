// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
function Header() {
    return (
        <header >
            <div className='flex items-center space-x-2 md:space-x-10'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png'
                    alt="logo"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                />

                <ul className='flex'>
                    <li className='headerLink'>Home</li>
                    <li className='headerLink'>TV Shows</li>
                    <li className='headerLink'>Movies</li>
                    <li className='headerLink'>New & popular</li>
                    <li className='headerLink'>My List</li>
                </ul>

            </div>

            <div>
                {/* <MagnifyingGlassIcon className="hidden sm:inline" /> */}
            </div>
        </header>
    )
}

export default Header