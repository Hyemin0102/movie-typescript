//액션 타입 정의
//as const 붙여줌으로 type 추론 과정에서 string이 아닌 실제 문자열 값으로 추론 되도록
const CHANGE_CATEGORY = 'movies/CHANGE_CATEGORY' as const;

//액션 생성 함수
//액션에 부가적으로 필요한 값 payload로 통일
export const changeCategory = (index:number) => ({
  type: CHANGE_CATEGORY,
  payload: index,
});

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
type CategoryAction = 
  | ReturnType<typeof changeCategory>;


  type CategoryState = {
  categoryIndex: number,
};

//초기 상태 정의
const initialState: CategoryState = {
  categoryIndex: 0,
}

//리듀서 함수 정의
//리듀서에서는 state 와 함수의 반환값이 일치하도록
const category = (state:CategoryState=initialState, action:CategoryAction):CategoryState => {
  switch (action.type) {
    case CHANGE_CATEGORY :
      return {
        ...state,
        categoryIndex: action.payload
      };
      default:
        return state;
  }
};

export default category;