import React from "react";
import { Movie } from "../Api/HomePage";

type MovieCardProps = {
  movie: Movie
}

export const MovieCard = ({movie}:MovieCardProps) =>{
  //console.log('bb',props)
  const { title, overview, poster_path, vote_average } = movie;
  return(
    <div>
      <h4>{title}</h4>
      <p>
        {overview}
      </p>
      <p>
        {poster_path}
      </p>
      <p>
        {vote_average}
      </p>
    </div>
  )
}