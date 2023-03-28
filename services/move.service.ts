import { DocumentData } from "firebase/firestore"
import { Movie } from "../models/main.model"

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const movieService = {
    getMovieById,
    fetchMovie
}

function getMovieById(moveId: number) {
    return fetch(`${BASE_URL}/movie/${moveId}?api_key=${API_KEY}`).then((res) => res.json())
}

function fetchMovie(movieId:number , movieType:string) {
    console.log('movieType:', movieType)
    return fetch(`${BASE_URL}/${movieType === 'tv' ? 'tv' : 'movie'}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`)
        .then(res => res.json())
}