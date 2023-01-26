import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

// recoil import
import { useRecoilState } from 'recoil';
import { nicknameCheckState } from 'stores/SignUpStates';

function NickNameInput({color}) {

  // useState 선언
  const [nickName, setNickName] = useState("");
  const [isValid, setIsValid] = useRecoilState(nicknameCheckState)
  

  const handleNickName = (e) => {
    const value = e.target.value;
    // 입력이 들어올 경우 Valid 처리k
    setIsValid("valid");
    // 현재 저장된 NickName을 현재 컴포넌트에 저장
    setNickName(value);
  }

  const checkNickName = () => {
    console.log(nickName);
    
    setIsValid("notValid");
  }

  return(
    <Grid item xs={12} container spacing={2}>
      <Grid item xs={9}>
        <TextField
          required
          fullWidth
          id="nickName"
          label="닉네임(2자 이상)"
          name="nickName"
          autoComplete="nickName"
          color={color}
          onChange={handleNickName}
          error={isValid !== 'notValid' ? false : true}
          helperText={isValid === "notValid" ? "이미 사용 중인 닉네임입니다" : (isValid === "Valid" ? "사용 가능한 닉네임입니다" : null)}
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
          disabled={nickName.length < 2 ? true : false}
        >
          중복검사
        </Button>
      </Grid>
    </Grid>

  )
}

export default NickNameInput