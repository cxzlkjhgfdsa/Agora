import styled from "styled-components";
import { Grid } from "@mui/material";
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';


// 사진 import
import food from "../../../../assets/signup/food.jpg"
import daily from "../../../../assets/signup/daily.png"

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
  
  const [select, setSelect] = useState([]);
  
  const imageUrls = [
    {id: 1, url: daily, title: '일상'},
    {id: 2, url: food, title: '음식'},
    {id: 3, url: food, title: '영화/드라마'},
    {id: 4, url: food, title: '연애'},
    {id: 5, url: food, title: '게임'},
    {id: 6, url: food, title: 'IT/전자제품'},
    {id: 7, url: food, title: '스포츠'},
    {id: 8, url: food, title: '패션'},
    {id: 9, url: food, title: '공부'},
    {id: 10, url: food, title: '음악'},
  ];

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
