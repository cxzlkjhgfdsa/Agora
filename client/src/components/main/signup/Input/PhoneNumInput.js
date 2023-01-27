import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

// recoil import
import { useRecoilState } from 'recoil';
import { phoneCheckState } from 'stores/SignUpStates';
import { phoneValidState } from 'stores/SignUpStates';

function PhoneNumInput({color}) {
  
  // state 선언
  const [phoneNum, setPhoneNum] = useState("")
  // 전화번호 인증 확인 변수
  const [isValid, setIsValid] = useRecoilState(phoneCheckState)
  const [phoneValid, setPhoneValid] = useRecoilState(phoneValidState)

  // 전화번호 데이터 저장
  const handlePhoneNum = (e) => {
    const value = e.target.value;
    setPhoneNum(value)
    setIsValid("notChecked")
    setPhoneValid("notChecked")
  }

  // 전화번호 인증 함수
  const checkPhoneNum = () => {
    console.log(phoneNum)
    setIsValid("valid")
    setPhoneValid("notChecked")
  }

  // 입력이 변경될 시, 인증 상태 초기화
  const resetValid = () => {
    setPhoneValid("notChecked")
  }


  return(
    <Grid container item xs={12} spacing={2}>
      <Grid item xs={9}>
        <TextField
          required
          fullWidth
          id="phoneNum"
          label="전화번호(-없이)"
          name="phoneNum"
          autoComplete="phoneNum"
          color={color}
          onChange={handlePhoneNum}
          disabled={isValid==="valid" ? true : false} 
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          size="medium"
          sx={{ padding: 1, height: 55, color: '#ffffff', fontSize: 16 }}
          fullWidth
          color={color}
          disabled={phoneNum.length !== 11 ? true : false}
        >
          인증요청
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="authNum"
          label="인증번호"
          type="authNum"
          id="authNum"
          color={color}
          error={isValid !== "notValid" & phoneValid !== "notValid" ? false : true}
          helperText={
            isValid === "notValid" 
              ? "올바르지 못한 인증번호입니다" 
              : (isValid === "valid" 
                  ? "인증되었습니다" 
                  : (phoneValid === "notValid" 
                    ? "전화번호를 인증해주세요" : null))}
          onChange={resetValid}
          disabled={isValid==="valid" ? true : false}
        />
      </Grid>
      <Grid item xs={12}>
      <Button
        fullWidth
        variant="contained"
        sx={{height: 55, color: '#ffffff', fontWeight: 'bold', fontSize: 20, marginBottom: 5}}
        color="custom"
        onClick={checkPhoneNum}
      >
        인증확인
      </Button>
      </Grid>
    </Grid>
  )
}

export default PhoneNumInput