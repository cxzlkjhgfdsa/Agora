import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function PhoneNumInput({color}) {
  
  const [phoneNum, setPhoneNum] = useState("")

  const handlePhoneNum = (e) => {
    const value = e.target.value;
    setPhoneNum(value)
  }

  const checkPhoneNum = () => {
    console.log(phoneNum)
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
          onClick={checkPhoneNum}
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
        />
      </Grid>
    </Grid>
  )
}

export default PhoneNumInput