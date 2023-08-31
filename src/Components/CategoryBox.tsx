import { CategoryButton } from "./CategoryButton"
import { Category } from "./HomePage"

type CategoryBoxProps = {
  CategoryList: Category[],
  categoryIndex: number,
  onSetCategory: (index: number) => void,
}

export const CategoryBox = ({CategoryList,categoryIndex,onSetCategory}:CategoryBoxProps) =>{
  return(
    <div className="flex m-5">
      {CategoryList.map((category)=>(
        <CategoryButton 
          key={category.id} 
          category={category} 
          onClick={onSetCategory}
          isSelected={category.id === categoryIndex}/>
      ))}
    </div>
  )
}