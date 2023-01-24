import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function NickNameInput({color}) {

  const [nickName, setNickName] = useState("")
  
  const handleNickName = (e) => {
    const value = e.target.value;
    setNickName(value)
  }

  const checkNickName = () => {
    console.log(nickName)
  }

  return(
    <Grid item xs={12} container spacing={2}>
      <Grid item xs={9}>
        <TextField
          required
          fullWidth
          id="nickName"
          label="닉네임"
          name="nickName"
          autoComplete="nickName"
          color={color}
          onChange={handleNickName}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          size="medium"
          sx={{ padding: 0, height: 55, color: '#ffffff', fontSize: 16,}}
          fullWidth
          color={color}
          onClick={checkNickName}
        >
          중복검사
        </Button>
      </Grid>
    </Grid>

  )
}

export default NickNameInput