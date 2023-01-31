// 모듈 import
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

// 자식 컴포넌트 import
import CustomTextInput from './NameInput';
import NickNameInput from './NickNameInput';
import BirthInput from './BirthInput';
import PhoneNumInput from './PhoneNumInput';
import ImageInput from './ProfileImgInput';
import { SubText } from '../content/ContentBox';

// recoil import
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// recoil : 데이터 유효 검사용
import { nameValidState, nicknameValidState, birthValidState, phoneValidState } from 'stores/SignUpStates';
// recoil : 데이터 검사 결과
import { nicknameCheckState, phoneCheckState } from 'stores/SignUpStates';
// recoil : 최종 저장 데이터
import { nameDataState, birthDataState, socialDataState } from 'stores/SignUpStates';

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
  // Querystring 데이터 확인
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const queryNickname = queryParams.get('nickname')
  const queryType = queryParams.get('type')
  const queryProfile = queryParams.get('profile')
  const querySocialId = queryParams.get('userId')

  // query social data 저장
  const setSocialData = useSetRecoilState(socialDataState)

  // validation용 데이터 선언
  const [nameValid, setNameValid] = useRecoilState(nameValidState)
  const [nicknameValid, setNicknameValid] = useRecoilState(nicknameValidState)
  const [birthValid, setBrithValid] = useRecoilState(birthValidState)
  const [phoneValid, setPhoneValid] = useRecoilState(phoneValidState)

  const nicknameCheck = useRecoilValue(nicknameCheckState)
  const phoneCheck = useRecoilValue(phoneCheckState)

  const nameData = useRecoilValue(nameDataState)
  const birthData = useRecoilValue(birthDataState)

  // flag 변수 선언
  const [allValid, setAllValid] = useState(false)

  // 페이지 이동 함수
  const navigate = useNavigate();

  // 데이터 제출 함수 
  const handleSubmit = (event) => {
    event.preventDefault();

    // 1. name valid 확인
    if (nameData.length === 0) {
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
    const birthPattern = /^([0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
    let birth
    // 3.2. birth data 공백 확인
    if (birthData.length !== 6) {
      setBrithValid("notValid")
    }
    else {
      // 3.3. birth data - birthPattern 비교
      if (!birthPattern.test(birthData)) {
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

  // 모든 데이터 유효성 검사 후 social 데이터 저장
  useEffect(() => {
    if (nameValid === "valid" & nicknameValid === "valid" & birthValid === "valid" & phoneValid === "valid") {
      setSocialData({type: queryType, userId: querySocialId})
      setAllValid(true)
    }
  }, [nameValid, nicknameValid, birthValid, phoneValid])

  // social 데이터 저장 이후 
  useEffect(() => {
    
    if (allValid) {
      navigate('/user/signup/category')
    } 
  }, [allValid])

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
          <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SubText>
                  필수 정보를 입력해 주세요
                </SubText>
              </Grid>
              <CustomTextInput color="custom" />
              <NickNameInput color="custom" defaultNickname={queryNickname} />
              <BirthInput color="custom"/>
              <PhoneNumInput color="custom"/>
            </Grid>
            <ImageInput color="custom" defaultProfile={queryProfile} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 55, color: '#ffffff', fontWeight: 'bold', fontSize: 20, marginBottom: 10}}
              color="custom"
            >
              완료 후 계속
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}