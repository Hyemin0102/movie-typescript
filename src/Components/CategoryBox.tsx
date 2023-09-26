import { CategoryButton } from "./CategoryButton"
import { Category } from "./HomePage"

type CategoryBoxProps = {
  CategoryList: Category[],
  categoryIndex: number,
  onSetCategory: (index: number) => void,
}

export const CategoryBox = ({CategoryList,categoryIndex,onSetCategory}:CategoryBoxProps) =>{
  return(
    <div className="flex m-5 h-20 items-center">
      <div className="w-44 sm:w-24">
        <img className="" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo"/>
      </div>
      <div className="flex items-center gap-8 w-full ml-8 sm:ml-2 sm:gap-4">
      {CategoryList.map((category)=>(
        <CategoryButton 
          key={category.id} 
          category={category} 
          onClick={onSetCategory}
          isSelected={category.id === categoryIndex}/>
      ))}
      </div>
    </div>
  )
}