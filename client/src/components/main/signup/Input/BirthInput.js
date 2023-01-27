import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';

// recoil import
import { useRecoilState } from 'recoil';
import { birthValidState } from 'stores/SignUpStates';

function BirthInput({color}) {

  const [birthValid, setBirthValid] = useRecoilState(birthValidState);
  
  // birthValid 초기화 함수
  const resetBrithValid = () => {
    setBirthValid("notChecked")
  }

  return(
    <Grid container item xs={12} spacing={1}>
      <Grid item xs={4}>
        <TextField
          required
          fullWidth
          id="year"
          label="년도(00)"
          name="year"
          autoComplete="year"
          color={color}
          error={birthValid==="notValid" ? true : false}
          onChange={resetBrithValid}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          fullWidth
          id="month"
          label="월"
          name="month"
          autoComplete="month"
          color={color}
          error={birthValid==="notValid" ? true : false}
          onChange={resetBrithValid}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          fullWidth
          id="date"
          label="일"
          name="date"
          autoComplete="date"
          color={color}
          error={birthValid==="notValid" ? true : false}
          onChange={resetBrithValid}
        />
      </Grid>
      <FormHelperText error sx={{marginLeft: 3}}>
        {(birthValid === "notValid" ? "생년월일을 정확히 입력하세요" : null)}
      </FormHelperText>
    </Grid>
  )
}

export default BirthInput