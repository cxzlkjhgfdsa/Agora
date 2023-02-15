import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


// Wrapper 생성
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 50px;
`

// theme 생성
const theme = createTheme({
    palette: {
      custom: {
        main: "#F6C026"
      },
    },
  });


function CompleteButton() {

  const navigate = useNavigate();

  const moveToDebateList = () => {
    navigate("/user/login")
  }

  return(
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Button
          variant="contained"
          sx={{mb: 2, height: 55, width: 396, color: '#ffffff', fontWeight: 'bold', fontSize: 20, marginBottom: 10}}
          color="custom"
          onClick={moveToDebateList}
          >
          AGORA 로그인 하기
        </Button>
      </Wrapper>
    </ThemeProvider>
  )

}

export default CompleteButton