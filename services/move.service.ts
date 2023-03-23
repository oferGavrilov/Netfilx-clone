
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const movieService = {
    getMovieById,
}

function getMovieById(moveId: number) {
   return fetch(`${BASE_URL}/movie/${moveId}?api_key=${API_KEY}`).then((res) => res.json())
}