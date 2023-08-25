import React, { useEffect, useState } from "react";
import { MovieCard } from "../Components/MovieCard";
import { toBeDisabled } from "@testing-library/jest-dom/matchers";


const Access_Token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTljMGQ5NWJjNmQyMjZhNzg4ODE2MzY1NGQ2NTE3MyIsInN1YiI6IjY0ZTg0ZjkyMWZlYWMxMDBmZTVjNzljOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQPQd46Ef262NSd2ekBm4Mhca5KxlwKtMhzfPfGsrZE';

//interface로 정의해도 상관없음
export type Movie = {
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  vote_average: number
}


export const HomePage = () =>{
  //id값이 없다고 나오기 때문에 useState에 너는 빈배열이지만 Movie type을 받을거야 라고 명시해줘야함
  const [movies,setMovies] = useState<Movie[]>([]);

  const getData = () =>{
    const url = "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1"
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${Access_Token}`
      }
    };
  
    fetch(url, options)
    .then(response => response.json())
    .then(data => setMovies(data.results))
    .catch(err => console.error(err));

  }
  
  useEffect(()=>{
    getData();
  },[])
  
  return(
    <div>
      뮤비앱입니다!!!
      {movies.map((movie)=><MovieCard key={movie.id} movie={movie}/>)}
    </div>
  )
};