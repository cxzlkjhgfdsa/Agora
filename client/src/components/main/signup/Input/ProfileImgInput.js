import styled from '@emotion/styled';
import ProfileImage from '../../../../assets/signup/ProfileImage.png'
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useState, useRef } from 'react';
import { SubText } from '../content/ContentBox';

const PreviewImage = styled.img`
  height: 180px;
  width: 150px;
`;


function ImageInput({color}) {

  //이미지 주소를 업로드하는 상태
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result)
    }
  }

  // 업로드 이미지의 초기화
  const resetImgFile = () => {
    imgRef.current.value = "";
    setImgFile("");
  }

  return(
    <Grid container item xs={12} spacing={2} sx={{marginTop: 5}}>
      <Grid item xs={12}>
        <SubText>
          프로필 이미지(선택)
        </SubText>
      </Grid>
      <Grid item xs={5}>
        <PreviewImage src={imgFile ? imgFile : ProfileImage}/>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" component="label" color={color} sx={{color: '#ffffff'}}>
          업로드
          <input hidden accept="image/*" name="profileImage" type="file" id="profileImage" onChange={saveImgFile} ref={imgRef}/>
        </Button>
        <Button variant="contained" sx={{marginTop: 1, color: '#ffffff'}} onClick={resetImgFile} color={color}>
          초기화
        </Button>
      </Grid>
    </Grid>
  )
}

export default ImageInput