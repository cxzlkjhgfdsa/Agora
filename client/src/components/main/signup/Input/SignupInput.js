import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useNavigate } from "react-router-dom";

// 자식 컴포넌트 import
import CustomTextInput from './NameInput';
import NickNameInput from './NickNameInput';
import BirthInput from './BirthInput';
import PhoneNumInput from './PhoneNumInput';
import ImageInput from './ProfileImgInput';
import { SubText } from '../content/ContentBox';

// recoil import
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';

import { nameValidState } from 'stores/SignUpStates';
import { nicknameValidState } from 'stores/SignUpStates';
import { birthValidState } from 'stores/SignUpStates';
import { phoneValidState } from 'stores/SignUpStates';

import { nicknameCheckState } from 'stores/SignUpStates';
import { phoneCheckState } from 'stores/SignUpStates';

// theme 선언: mui customization
const theme = createTheme({
  palette: {
    custom: {
      main: "#F6C026"
    },
    button: {
      fontStyle: 'italic',
    }
  },
});

export default function SignUp() {
  
  // validation용 데이터 선언
  const [nameValid, setNameValid] = useRecoilState(nameValidState)
  const [nicknameValid, setNicknameValid] = useRecoilState(nicknameValidState)
  const [birthValid, setBrithValid] = useRecoilState(birthValidState)
  const [phoneValid, setPhoneValid] = useRecoilState(phoneValidState)

  const nicknameCheck = useRecoilValue(nicknameCheckState)
  const phoneCheck = useRecoilValue(phoneCheckState)

  // 임시 페이지 이동 함수
  // const navigate = useNavigate();
  // const moveToCategory = () => {
  //   navigate("/user/signup/category")
  // }

  // 데이터 제출 함수 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // validation 확인
    const formData = {
      name: data.get('name'),
      nickname: data.get('nickName'),
      year: data.get('year'),
      month: data.get('month'),
      date: data.get('date'),
      profileImage: data.get('profileImage')
    }

    // 1. name valid 확인
    if (formData.name === "") {
      setNameValid("notValid")
    }
    else {
      setNameValid("valid")
    };

    // 2. nickname check 확인
    if (nicknameCheck !== "valid") {
      setNicknameValid("notValid")
    } 
    else {
      setNicknameValid("valid")
    };

    // 3. birth valid 확인
    // 3.1. birthPattern 정의
    const birthPattern = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
    let birth
    // 3.2. birth data 공백 확인
    if (formData.year === "" | formData.month === "" | formData.date === "") {
      setBrithValid("notValid")
    }
    else {
      // 3.3. birth data - birthPattern 비교
      let month = formData.month
      let date = formData.date
      if (formData.month.length === 1) {
        month = '0' + month
      };

      if (formData.month.length === 1) {
        date = '0' + date
      };

      birth = formData.year + '-' + month + '-' + date

      if (!birthPattern.test(birth)) {
        setBrithValid("notValid")
      }
      else {
        setBrithValid("valid")
      };
    };

    // 4. phone valid 확인
    if (phoneCheck === "valid") {
      setPhoneValid("valid")
    }
    else {
      setPhoneValid("notValid")
    };
  };

  // valid 확인용 임시 버튼
  const tempButton = () => {
    const tempData = {
      name: nameValid,
      nickname: nicknameValid,
      birth: birthValid,
      phone: phoneValid
    }
    console.log(tempData)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SubText>
                  필수 정보를 입력해 주세요
                </SubText>
              </Grid>
              <CustomTextInput color="custom"/>
              <NickNameInput color="custom"/>
              <BirthInput color="custom"/>
              <PhoneNumInput color="custom"/>
            </Grid>
            <ImageInput color="custom"/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 55, color: '#ffffff', fontWeight: 'bold', fontSize: 20, marginBottom: 10}}
              color="custom"
            >
              완료 후 계속
            </Button>
            <Button variant="contained" onClick={tempButton}>
              체크용
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}