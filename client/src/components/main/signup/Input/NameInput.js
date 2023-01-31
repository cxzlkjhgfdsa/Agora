import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

// recoil import
import { useRecoilState, useSetRecoilState } from 'recoil';
import { nameValidState, nameDataState } from 'stores/SignUpStates';

function CustomTextInput ({color}) {

  const [nameValid, setNameValid] = useRecoilState(nameValidState)
  const setNameData = useSetRecoilState(nameDataState)

  // Valid 초기화 함수
  const handleInput = (e) => {
    const value = e.target.value
    setNameData(value)
    setNameValid("notChecked")
  }


  return(
    <Grid item xs={12}>
      <TextField
        autoComplete="name"
        name="name"
        required
        fullWidth
        id="name"
        label="이름"
        autoFocus
        color={color}
        error={nameValid === "notValid" ? true : false}
        helperText={nameValid === "notValid" ? "이름을 입력해주세요" : null}
        onChange={handleInput}
      />
    </Grid>

  )
}

export default CustomTextInput