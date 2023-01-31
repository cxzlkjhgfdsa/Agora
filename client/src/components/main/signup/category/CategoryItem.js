import styled from "styled-components";
import { Grid } from "@mui/material";
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from "axios";

// 이동을 위한 useNavigate 선언
// import { useNavigate } from "react-router-dom";

// 사진 import
import food from "../../../../assets/signup/food.jpg"
import daily from "../../../../assets/signup/daily.png"
import cinema from "../../../../assets/signup/cinema.jpg"
import game from "../../../../assets/signup/game.jpg"
import IT from "../../../../assets/signup/IT.jpg"
import Love from "../../../../assets/signup/Love.jpg"
import sports from "../../../../assets/signup/sports.jpg"
import fashion from "../../../../assets/signup/fashion.jpg"
import study from "../../../../assets/signup/study.jpg"
import music from "../../../../assets/signup/music.jpg"


// recoil import
import { useRecoilValue } from "recoil";
// recoil : 최종 저장 데이터 
import { nameDataState, nicknameDataState, profileDataState, phoneDataState, birthDataState, socialDataState } from "stores/SignUpStates";

// Button 컴포넌트 import
import CategoryButton from "./CategoryButton";

// theme 생성
const theme = createTheme({
  palette: {
    custom: {
      main: "#F6C026"
    },
  },
});

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center
`

// 본함수 설정
function CategoryItem() {
  
  // 선택 항목 저장 변수
  const [select, setSelect] = useState([]);
  
  const imageUrls = [
    {id: 1, url: daily, title: '일상'},
    {id: 2, url: food, title: '음식'},
    {id: 3, url: cinema, title: '영화/드라마'},
    {id: 4, url: Love, title: '연애'},
    {id: 5, url: game, title: '게임'},
    {id: 6, url: IT, title: 'IT/전자제품'},
    {id: 7, url: sports, title: '스포츠'},
    {id: 8, url: fashion, title: '패션'},
    {id: 9, url: study, title: '공부'},
    {id: 10, url: music, title: '음악'},
  ];
 
  // 최종 데이터
  const nameData = useRecoilValue(nameDataState)
  const nicknameData = useRecoilValue(nicknameDataState)
  const phoneData = useRecoilValue(phoneDataState)
  const birthData = useRecoilValue(birthDataState)
  const socialData = useRecoilValue(socialDataState)
  const profileData = useRecoilValue(profileDataState)

  const ImageList = imageUrls.map((image) => (
    <Grid item md={3} sm={4} xs={6} key={image.id} 
      onClick={() => {
        !select.includes(image.id)
          ?(select.length < 3 ? setSelect((select) => [...select, image.id]) : alert("3개의 카테고리만 선택해주세요"))
          :setSelect(select.filter((item) => item !== image.id))
      }}
    >
      <CategoryButton image={image} isActive={select.includes(image.id)} />
    </Grid>

  ));
    
  // 다음 항목 이동을 위한 임시 함수
  // const navigate = useNavigate();
  // const moveToComplete = () => {
  //   navigate("/user/signup/complete")
  // }

  // 데이터 제출 함수
  const handleForm = () => {
    
    console.log(nameData)
    console.log(nicknameData)
    console.log(birthData)
    console.log(phoneData)
    console.log(socialData)
    console.log(profileData)

    // axios({
    //   method: "post",
    //   url: "https://2eabc1ce-08b7-4b51-a88a-89f8081e62e3.mock.pstmn.io/user/join",
    //   data: inputData,
    //   headers: {
    //     withCredentials : true,
    //   }
    // })
    // .then((response) => {
    //   console.log(response.data)
    //   console.log(inputData)
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  
  }


  return(
    <ThemeProvider theme={theme}>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}> 
        <Container component="main" maxWidth="lg">
          <ButtonWrapper>
            <Button
              variant="contained"
              sx={{mb: 2, height: 55, width: 396, color: '#ffffff', fontWeight: 'bold', fontSize: 20, marginBottom: 10}}
              color="custom"
              disabled={select.length===0 ? true : false}
              onClick={handleForm}
            >
              선택({select.length}/3) 후 계속
            </Button>
          </ButtonWrapper>
          <Grid container spacing={2}>
            {ImageList}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>

  );
}

export default CategoryItem
