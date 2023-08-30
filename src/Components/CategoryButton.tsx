import React from "react";
import { Category } from "./HomePage";


type CategoryButtonProps = {
  category: Category,
  //onClick 추가, void 사용 => 인덱스를 받지만 return값은 없음 의미
  onClick: (index:number) => void,
  isSelected: boolean,
}

export const CategoryButton = ({category, onClick, isSelected}:CategoryButtonProps) =>{
  const {id, lable,image} = category;

  return(
    <div className={`${isSelected ? 'font-bold' : 'opacity-50'} `} 
      onClick={()=>onClick(id)}> {/* 클릭 시 카테고리의 id보냄 */}
      <img src={image} alt="이미지" 
        className="rounded-full w-28 h-28 object-cover"/>
      <div className="text-center">{lable}</div>
    </div>
  )
}