import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import useAuth from '../custom-hook/useAuth'
import { TbVideo } from 'react-icons/tb'

function Account() {
      const { user } = useAuth()

      const getCreatedDate = () => {
            const dateArray = user?.metadata?.creationTime?.split(' ')
            if (!user || !dateArray) return Date.now()
            if (dateArray) return dateArray[2] + " " + dateArray[3]
      }

      return (
            <div>
                  <Head>
                        <title>Home - Netflix</title>
                        <link rel="icon" href="/favicon.ico" />
                  </Head>
                  <header className={`bg-[#141414]`}>
                        <Link href="/">
                              <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                                    width={120}
                                    alt="logo"
                                    height={120}
                                    className="cursor-pointer object-contain"
                              />
                        </Link>
                        <Link href="/account">
                              <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                                    alt="profile-image"
                                    className="cursor-pointer rounded w-8"
                              />
                        </Link>
                  </header>
                  <main className='pt-24 px-12 font-'>
                        <div className='flex items-center pb-4 gap-x-8 border-b-2'>
                              <h1 className='text-3xl md:text-4xl'>Account</h1>
                              <div className='flex items-center gap-x-3'>
                                    <TbVideo className='text-xl text-red-600' />
                                    <span className='font-bold'>Member Since {getCreatedDate()}</span>
                              </div>
                        </div>
                        <ul className='pt-8'>
                              <li className='flex justify-between'>
                                    <span className='font-semibold'>{user?.email}</span>
                                    <button className='text-[#4ca3fb] hover:underline'>Change email</button>
                              </li>
                              <li className='flex justify-between py-4'>
                                    <span className='text-[#afadad]'>Password: ********</span>
                                    <button className='text-[#4ca3fb] hover:underline'>Change password</button>
                              </li>
                        </ul>
                  </main>
            </div>
      )
}

export default Account

