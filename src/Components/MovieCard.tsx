import React from "react";
import { Movie } from "./HomePage";

type MovieCardProps = {
  movie: Movie
}

//tmdb에서 제공하는 이미지 path url
const Image_url = 'https://image.tmdb.org/t/p/original';

export const MovieCard = ({movie}:MovieCardProps) =>{
  //console.log('movie',movie)
  const { title, overview, poster_path, vote_average } = movie;


  return(
    <div className=" w-1/5 p-7">
      <div className="">
        <img src={`${Image_url}${poster_path}`} alt="이미지" 
        className="rounded-xl w-full object-cover"/>
      </div>
      <div>
        <div className=" text-xl font-bold mb-2">{title}</div>
        <div className=" text-gray-800 line-clamp-3">{overview}</div>
        <div className=" text-gray-600">{`평점 : ${vote_average}`}</div>
      </div>
    </div>
  )
}