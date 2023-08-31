
import { Movie } from "./HomePage"
import { MovieCard } from "./MovieCard"

type MovieBoxProps = {
  movies: Movie[]
}

export const MovieBox = ({movies}:MovieBoxProps) =>{
  return(
    <div className="flex m-5 flex-wrap">
      {movies.map((movie)=>
      <MovieCard key={movie.id} movie={movie}/>)}
    </div>
  )
}