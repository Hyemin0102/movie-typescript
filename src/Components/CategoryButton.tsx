import React from "react";
import { Category } from "../Api/HomePage";


type CategoryButtonProps = {
  category: Category,
  //onClick 추가, void 사용 => 인덱스를 받지만 return값은 없음 의미
  onClick: (index:number) => void
}



export const CategoryButton = ({category, onClick}:CategoryButtonProps) =>{
  const {id, lable} = category;

  return(
    <div className="space-x-4 
    border-solid border border-blue-500" onClick={()=>onClick(id)}> {/* 클릭 시 카테고리의 id보냄 */}
      <div className="">
        <img src="https://image.tmdb.org/t/p/original/1YYL1OcgjPLjAGi6n0iZe1gdl9i.jpg" alt="이미지" 
        className="rounded-full w-28 h-28 object-cover"/>
      </div>
      <div className="text-center">{lable}</div>
    </div>
  )
}