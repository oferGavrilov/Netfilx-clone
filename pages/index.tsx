import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modal'

import Banner from '../components/Banner'
import Header from '../components/Header'
import MovieDetails from '../components/MovieDetails'
import Row from '../components/Row'
import useAuth from '../custom-hook/useAuth'
import { Movie } from '../models/main.model'
import requests from '../utils/request'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaryMovies: Movie[]
}

export default function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaryMovies,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) {
  const { loading } = useAuth()
  const showModal = useRecoilValue(modalState)

  if (loading) return null

  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh]
                    ${showModal && '!h-screen overflow-hidden'}`}>
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List Component */}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaryMovies} />
        </section>
      </main>
      <MovieDetails />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaryMovies,
    actionTV,
    comedyTV,
    horrorTV,
    romanceTV,
    documentaryTV,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaryMovies).then((res) => res.json()),
    fetch(requests.fetchActionTV).then((res) => res.json()),
    fetch(requests.fetchComedyTV).then((res) => res.json()),
    fetch(requests.fetchHorrorTV).then((res) => res.json()),
    fetch(requests.fetchRomanceTV).then((res) => res.json()),
    fetch(requests.fetchDocumentaryTV).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results.concat(actionTV.results),
      comedyMovies: comedyMovies.results.concat(comedyTV.results),
      horrorMovies: horrorMovies.results.concat(horrorTV.results),
      romanceMovies: romanceMovies.results.concat(romanceTV.results),
      documentaryMovies: documentaryMovies.results.concat(documentaryTV.results),
    }
  }
}
