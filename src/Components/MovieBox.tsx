
import { Movie } from "./HomePage"
import { MovieCard } from "./MovieCard"

type MovieBoxProps = {
  movies: Movie[]
}

export const MovieBox = ({movies}:MovieBoxProps) =>{
  return(
    <div className="flex mx-5 my-12 flex-wrap gap-4">
      {movies.map((movie)=>
      <MovieCard key={movie.id} movie={movie}/>)}
    </div>
  )
}