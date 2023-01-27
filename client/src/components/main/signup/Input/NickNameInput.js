import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';

// recoil import
import { useRecoilState } from 'recoil';
import { nicknameCheckState } from 'stores/SignUpStates';
import { nicknameValidState } from 'stores/SignUpStates';

function NickNameInput({color}) {

  // useState 선언
  const [nickName, setNickName] = useState("");
  // 닉네임 인증 확인용 변수
  const [isValid, setIsValid] = useRecoilState(nicknameCheckState)
  const [nicknameValid, setNicknameValid] = useRecoilState(nicknameValidState)
  
  // 닉네임 데이터 저장
  const handleNickName = (e) => {
    const value = e.target.value;
    // 입력이 들어올 경우 notChecked 처리
    setIsValid("notChecked");
    setNicknameValid("notChecked")
    // 현재 저장된 NickName을 현재 컴포넌트에 저장
    setNickName(value);
  }

  // 닉네임 인증 함수
  const checkNickName = () => {
    axios({
      // 목업 서버 url
      method: 'get',
      url: "https://2eabc1ce-08b7-4b51-a88a-89f8081e62e3.mock.pstmn.io/user/check/nickname?",
      params: {
        "nickname" : nickName
      }
    })
    .then((response) => {
      if (response.data.state === "TRUE") {
        setIsValid("valid");
        setNicknameValid("notChecked")
      }
      else {
        setIsValid("notValid")
      }
    })
    .catch((error) => {
      console.log(error)
    });
    

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
          error={isValid === 'notValid' | nicknameValid === 'notValid' ? true : false}
          helperText={isValid === "notValid" 
            ? "이미 사용 중인 닉네임입니다" 
            : (isValid === "valid" 
              ? "사용 가능한 닉네임입니다" 
              : (nicknameValid === "notValid") ? "닉네임을 인증해주세요" : null)}
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