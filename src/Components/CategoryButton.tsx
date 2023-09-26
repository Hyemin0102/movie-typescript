
import { Category } from "./HomePage";


type CategoryButtonProps = {
  category: Category,
  //onClick 추가, void 사용 => 인덱스를 받지만 return값은 없음 의미
  onClick: (index:number) => void,
  isSelected: boolean,
}

export const CategoryButton = ({category, onClick, isSelected}:CategoryButtonProps) =>{
  const {id, lable} = category;

  return(
    <div className="flex mx-5 cursor-pointer sm:mx-3">
      <div className={`${isSelected ? 'font-bold' : 'opacity-50'} `} 
        onClick={()=>onClick(id)}> {/* 클릭 시 카테고리의 id보냄 */}
        <div className="text-center text-xl sm:text-base font-Pretendard">{lable}</div>
      </div>
    </div>
  )
}