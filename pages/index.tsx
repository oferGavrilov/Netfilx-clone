import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../cmps/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        {/* Banner */}
      </main>
    </div>
  )
}

export default Home
