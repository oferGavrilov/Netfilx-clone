import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useAuth from '../custom-hook/useAuth'

function Account() {

      const { user } = useAuth()
      console.log(user)

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

                  <main className='pt-24'>
                        <div>
                              <h1 className='text-3xl md:text-4xl'>Account</h1>
                              <div>

                              </div>
                        </div>
                  </main>
            </div>
      )
}

export default Account

