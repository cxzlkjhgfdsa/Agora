import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

// recoil import
import { useRecoilState } from 'recoil';
import { phoneCheckState } from 'stores/SignUpStates';

function PhoneNumInput({color}) {
  
  const [phoneNum, setPhoneNum] = useState("")
  const [isValid, setIsValid] = useRecoilState(phoneCheckState)

  const handlePhoneNum = (e) => {
    const value = e.target.value;
    setPhoneNum(value)
    setIsValid("notChecked")
  }

  const checkPhoneNum = () => {
    console.log(phoneNum)
    setIsValid("notValid")
  }

  const resetValid = () => {
    setIsValid("notChecked")
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
          error={isValid !== "notValid" ? false : true}
          helperText={isValid === "notValid" ? "올바르지 못한 인증번호입니다" : (isValid === "valid" ? "인증되었습니다" : null)}
          onChange={resetValid}
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