
import { Movie } from "./HomePage"
import { MovieCard } from "./MovieCard"

type MovieBoxProps = {
  movies: Movie[]
}

export const MovieBox = ({movies}:MovieBoxProps) =>{
  return(
    <div className="flex mx-5 mt-32 mb-12 sm:my-8 flex-wrap gap-4 font-Pretendard">
      {movies.map((movie)=>
      <MovieCard key={movie.id} movie={movie}/>)}
    </div>
  )
}