import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import { useState, useEffect } from 'react';

// recoil import
import { useRecoilState, useSetRecoilState } from 'recoil';
// recoil : 데이터 유효성 검사용
import { birthValidState } from 'stores/SignUpStates';
// recoil : 데이터 최종 저장용
import { birthDataState } from 'stores/SignUpStates';

function BirthInput({color}) {

  // 유효성 검사용 데이터
  const [birthValid, setBirthValid] = useRecoilState(birthValidState);
  // 데이터 저장용 
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const setBirthData = useSetRecoilState(birthDataState)

  // 입력 데이터 관리
  const handleData = (e) => {
    const value = e.target.value
    const id = e.target.id

    if (id === "year") {
      setYear(value)
    }
    else if (id === "month") {
      if (value.length === 2) {
        setMonth(value)
      }
      else {
        setMonth("0" + value)
      }
    }
    else {
      if (value.length === 2) {
        setDay(value)
      }
      else {
        setDay("0" + value)
      }
    }

    // 유효성 검사 초기화
    setBirthValid("notChecked")
  }

  useEffect(() => {
    setBirthData(year + month + day)
  },[year, month, day])

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
          onChange={handleData}
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
          onChange={handleData}
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
          onChange={handleData}
        />
      </Grid>
      <FormHelperText error sx={{marginLeft: 3}}>
        {(birthValid === "notValid" ? "생년월일을 정확히 입력하세요" : null)}
      </FormHelperText>
    </Grid>
  )
}

export default BirthInput