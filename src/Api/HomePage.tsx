import React, { useEffect, useState } from "react";
import { MovieCard } from "../Components/MovieCard";
import { CategoryButton } from "../Components/CategoryButton";


const Access_Token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTljMGQ5NWJjNmQyMjZhNzg4ODE2MzY1NGQ2NTE3MyIsInN1YiI6IjY0ZTg0ZjkyMWZlYWMxMDBmZTVjNzljOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQPQd46Ef262NSd2ekBm4Mhca5KxlwKtMhzfPfGsrZE';

//interface로 정의해도 상관없음
export type Movie = {
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  vote_average: number
}

export type Category = {
  id: number,
  lable: string,
  url: string
}

const CategoryList = [
  {id: 0, lable: '현재 상영작', url:'/now_playing'},
  {id: 1, lable: '인기 상영작', url:'/popular'},
  {id: 2, lable: 'Top Lated', url:'/top_rated'},
  {id: 3, lable: 'Upcoming', url:'/upcoming'},
]; 

export const HomePage = () =>{
  const [isLoading, setIsLoading] = useState(true);
  //id값이 없다고 나오기 때문에 useState에 너는 빈배열이지만 Movie type을 받을거야 라고 명시해줘야함
  const [movies,setMovies] = useState<Movie[]>([]);
  const [categoryIndex, setCategoryIndex] = useState(0);//category중 몇번쨰 인덱스 선택했는지 관리

  //선택한 카테고리 관리하는 함수(카테고리 클릭 시 이 함수 호출해 카테고리 인덱스 변경)
  const setCategory = (index:number) =>{
    setCategoryIndex(index);
  }

  const getData = (categoryIndex:number) =>{
    const url = `https://api.themoviedb.org/3/movie${CategoryList[categoryIndex].url}?language=ko-KR&page=1`
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
    setIsLoading(false);
  }
  
  useEffect(()=>{
    getData(categoryIndex);
  },[categoryIndex])//카테고리 선택 시마다 data 가져와야함
  
  return(
    <div>
      {CategoryList.map((category)=><CategoryButton key={category.id} category={category} onClick={setCategory}/>)}
      {isLoading && <p>데이터를 불러오는 중입니다...</p>}
      {!isLoading && movies.map((movie)=><MovieCard key={movie.id} movie={movie}/>)}
    </div>
  )
};