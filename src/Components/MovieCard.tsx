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
    <div className=" p-5 basis-80 grow">
      <div className="">
        <img src={`${Image_url}${poster_path}`} alt="이미지" 
        className="rounded-xl w-full object-cover"/>
      </div>
      <div className=" p-2">
        <div className=" text-xl font-bold my-2">{title}</div>
        <div className=" text-gray-800 line-clamp-3 mb-2">{overview}</div>
        <div className=" text-gray-600 font-bold">{`⭐${vote_average}`}</div>
      </div>
    </div>
  )
}