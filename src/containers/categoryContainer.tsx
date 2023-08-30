import { useSelector } from "react-redux";
import { RootState } from '../modules';
import { useDispatch } from "react-redux";
import category, { changeCategory } from "../modules/category";
import { CategoryButton } from "../Components/CategoryButton";

function categoryContainer(){
  const categoryItem = useSelector((state: RootState)=>state.category.categoryIndex);
  const dispatch = useDispatch();

  const onCategoryChange = (index:number) =>{
    dispatch(changeCategory(index));
  };


};
