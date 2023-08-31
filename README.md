# Movie-app
타입스크립트를 사용해 영화 오픈 api를 연동한 현재 상영작, 인기 상영작을 알려주는 토이 프로젝트

<br>

## 🔎프로젝트 소개
타입스크립트를 공부하며 open api를 활용한 토이 프로젝트. 원래 프로젝트 진행 시 UI를 먼저 구상 후 기능 구현을 하지만 이번에는 api먼저 연동 후 UI를 만들 예정이다.

공부하며 만드는 프로젝트 답게 프로젝트 과정을 세세히 기록해보겠다.

<br>

## ⚙개발 환경
react, typescript, open API, react-redux


<br>

## 🧾목차
- [typescript 프로젝트 생성](#typescript-프로젝트-생성)
- [영화 Open API 가져오기](#영화-Open-API-가져오기)
- [카테고리별 API 연동, 선택 카테고리 css 적용](#카테고리-별-API연동)
---

<br>

### 💻typescript 프로젝트 생성
우선, 나는 기존 리액트 프로젝트에 타입스크립트를 적용하는 것이 아닌 새로 시작하는 것이기 때문에 공식홈페이지 참고해서 간단하게 시작했다.
```javascript
npx create-react-app my-app --template typescript
```
만약 기존 리액트에 타입스크립트를 적용하는 것이라면
```javascript
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```
이렇게 설정하고 tsconfig.json 파일도 생성해야 하지만 이건 나중에 진행해 보겠다.

<br>
<hr>

### 💻영화 Open API 가져오기
영화 관련 오픈 API가 많이 있었는데 검색해보니 tmdb 사이트를 많이 이용하는 것 같다. 

https://www.themoviedb.org/ → 회원가입 → API 키 받기 를 진행하고 내가 필요한 API 를 어떻게 끌고 오는지 문법을 확인했다.

관련해서 검색했을 때 방법이 나오긴 했지만 최근에 업데이트가 된건지 공식 홈페이지에서 제공하는 코드랑 다르길래 참고만 하고 그냥 공식 홈페이지에서 그대로 코드를 긁어와 사용했다.

우선, 내가 필요한 API는 현재상영작, 인기상영작, 높은 평점 등이었는데 이건 쿼리값만 조금씩 수정하면 되니 우선 현재상영작을 기준으로 먼저 연동해보겠다.

<img src="https://github.com/Hyemin0102/movie-typescript/assets/128768462/0618e5f3-91d1-4d2e-80f7-65ba1d716537">

우측에 코드를 그대로 긁어와 사용하면 되는데 나는 한국 기준이기때문에 query params를 ko로 변경했다. 그리고 프로젝트에 적용하기!!

**HomePage.tsx**
```javascript
const Access_Token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTljMGQ5NWJjNmQyMjZhNzg4ODE2MzY1NGQ2NTE3MyIsInN1YiI6IjY0ZTg0ZjkyMWZlYWMxMDBmZTVjNzljOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQPQd46Ef262NSd2ekBm4Mhca5KxlwKtMhzfPfGsrZE';

export const HomePage = () =>{
  const [movies,setMovies] = useState<Movie[]>([]);
  console.log('movies',movies)

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
    </div>
  )
};
```
api를 받아올 수 있는 Authorization의 Access token auth 코드가 길어서 따로 변수로 설정해주었고 데이터를 받아와 그 중 results 부분을 useState를 사용해 movies 상태를 업데이트해주었다.

그리고 이 과정은 처음 페이지가 로드되었을때만 실행하면 되므로 useEffect를 사용했다. 이렇게하면 movies에 영화 관련 정보가 담기게 된다.

<img src="https://github.com/Hyemin0102/movie-typescript/assets/128768462/503df223-5c10-49dc-9e7c-19c824ecf24c">

이 중 내가 필요한 정보는 id, title, vote_average, overview, poster_path 정도이고 영화 카드 컴포넌트를 따로 만들어 해당 정보를 넘겨줘 화면에 출력해보도록 하겠다.

movies가 배열이므로 map을 사용해 컴포넌트를 해당 배열의 갯수만큼 생성할 건데 일단 한개의 카드 역할을 할 컴포넌트를 생성해준다.

우선 아무 스타일도 설정하지 않고 화면에 제대로 출력하는 것만 확인할 것이기 때문에 간단하게 만들어줬다.

이 컴포넌트를 HomePage.tsx에 import해주는데 타입스크립트를 사용하지 않았다면 그냥 MovieCard만 import해오고 movies를 props로 전달해주면 됐을 것이다. 

**하지만 타입스크립트의 경우 타입을 지정해주어야 하기때문에 Movie 타입을 따로 지정해주었다.**
```javascript
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
  //...생략

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
```
여기서 MovieCard를 movies 배열의 아이템 만큼 map을 이용해 생성할 때 리액트와 마찬가지로 고유의 key값을 전달해주어야하는데, useState에 타입을 명시하지 않으면 처음에 빈 배열이기 때문에 에러가 발생한다. 이에 useState에 Movie 타입을 사용할 것이라고 명시해주어야 한다. 

그리고 타입스크립트에서는 받아오는 props의 타입도 명시해주어야 한다.

**MovieCard.tsx**
```javascript
type MovieCardProps = {
  movie: Movie
}

export const MovieCard = ({movie}:MovieCardProps) =>{
  const { title, overview, poster_path, vote_average } = movie;
  return(
    <div>
      <h4>{title}</h4>
      <p>
        {overview}
      </p>
      <p>
        {poster_path}
      </p>
      <p>
        {vote_average}
      </p>
    </div>
  )
}
```
여기서 MovieCardProps는 MovieCard컴포넌트의 프로퍼티에 대한 타입 정의이다. 

즉, **MovieCardProps에는 movie 라는 이름의 프로퍼티가 있고 이는 Movie 타입의 객체인 것이다.**

여기까지 open API 연동하기 완료!

<br>
<hr>

### 💻카테고리별 API 연동, 선택 카테고리 css 적용
카테고리를 관리하는 useState를 사용해 카테고리의 인덱스를 구하고 그 정보로 데이터를 불러오는 기능과 클릭한 카테고리에 따라 다른 css 를 적용하는 기능을 구현할 것이다. 

**HomePage.tsx**

- 사용할 category의 타입을 정의하고 사용할 카테고리의 리스트도 배열로 만들어준다.
- CategoryList 배열을 MovieCard와 동일하게 map으로 화면에 출력해주는데 이 때, props로 CategoryList 의 각 아이템과 클릭 시 발생할 함수, 선택한 카테고리인지 확인하는 props를 보내준다.
- setCategory 함수를 클릭한 index의 id로 받아 categoryIndex를 업데이트 해줌
- getData 함수의 url 에서 카테고리 부분을 변수로 만들어 클릭한 카테고리의 url이 들어가게 함
- 기존 useEffect는 처음 페이지 로드되었을 때 getData 함수를 호출해 데이터를 불러왔는데 categoryIndex가 변경될 때 마다 getData 함수 호출해 해당 url의 data를 불러옴
```javascript
export type Category = {
  id: number,
  lable: string,
  url: string,
  image: string
}

const CategoryList = [
  {id: 0, lable: '현재 상영작', url:'/now_playing', image:'./now_playing.AVIF'},
  {id: 1, lable: '인기 상영작', url:'/popular', image:'./popular.jpg'},
  {id: 2, lable: 'Top Lated', url:'/top_rated', image:'./top_lated.jpg'},
  {id: 3, lable: 'Upcoming', url:'/upcoming', image:'./upcoming.jpg'},
];

export const HomePage = () =>{
  const [isLoading, setIsLoading] = useState(true);
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
      {CategoryList.map((category)=>(
        <CategoryButton 
          key={category.id} 
          category={category} 
          onClick={setCategory}
          isSelected={category.id === categoryIndex}/>
      ))}
      {isLoading && <p>데이터를 불러오는 중입니다...</p>}
      {!isLoading && movies.map((movie)=><MovieCard key={movie.id} movie={movie}/>)}
    </div>
  )
};
```
**CategoryButton.tsx**
- 받아오는 props의 타입 지정
    - onClick은 return값 없으므로 void 타입 사용
    - isSelected의 boolean값에 따라 css 다르게 적용
- CategoryButton 클릭 시 onClick  props로 category의 id값이 전달되고, 그 id값이 categoryIndex 로 업데이트 됨
```javascript
type CategoryButtonProps = {
  category: Category,
  //onClick 추가, void 사용 => 인덱스를 받지만 return값은 없음 의미
  onClick: (index:number) => void,
  isSelected: boolean
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
```
이렇게 하면 카테고리 선택에 따라 해당 api 정보가 불려오게 된다!

이제 api 연동 기능 구현은 끝났고, 리덕스를 활용해 movie, category 정보를 전역적으로 다루고 더 세밀한 UI 구성을 할 예정이다.

