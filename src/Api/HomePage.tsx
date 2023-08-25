import React, { useEffect, useState } from "react";
import { MovieCard } from "../Components/MovieCard";


const API_KEY='6a9c0d95bc6d226a7888163654d65173';

export const HomePage = () =>{
  const [movies,setMovies] = useState([]);
  

  const getData = async() =>{
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
    const response = await fetch(url);
    //status가 200이면 정상적으로 데이터 받아온 의미
    if(response.status === 200){
      //데이터 받아왔을 때 실행할 내용
      const data = await response.json();
      console.log('data',data)
      setMovies(data.results);
      console.log('movies',movies)
    } else {
      throw Error("데이터를 받아오지 못했습니다.")
    }
  }

  useEffect(()=>{
    getData();
  },[])
  
  return(
    <div>
      뮤비앱입니다아아아아
      <MovieCard />
    </div>
  )
};