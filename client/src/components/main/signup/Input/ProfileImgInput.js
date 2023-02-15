import styled from '@emotion/styled';
import ProfileImage from '../../../../assets/signup/ProfileImage.png'
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { SubText } from '../content/ContentBox';

// recoil import
import { useSetRecoilState } from 'recoil';
import { profileDataState } from 'stores/SignUpStates';

const PreviewImage = styled.img`
  height: 180px;
  width: 150px;
`;


function ImageInput({ color, defaultProfile }) {

  // 이미지 주소를 업로드하는 state
  const [imgFile, setImgFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(defaultProfile);
  // 최종 프로필 이미지 저장 state
  const setProfileData = useSetRecoilState(profileDataState)
  // 참조 위치
  const imgRef = useRef();


  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewFile(reader.result);
    }
    setImgFile(file)
  }

  // 업로드 이미지의 초기화
  const resetImgFile = () => {
    imgRef.current.value = "";
    setImgFile(null);
    setPreviewFile("");
  }

  // 컴포넌트가 unmount 될 때, 최종 데이터 저장
  useEffect(() => {
    return (
      setProfileData(imgFile)
    )
  })

  return(
    <Grid container item xs={12} spacing={2} sx={{marginTop: 5}}>
      <Grid item xs={12}>
        <SubText>
          프로필 이미지(선택)
        </SubText>
      </Grid>
      <Grid item xs={5}>
        <PreviewImage src={previewFile ? previewFile : ProfileImage}/>
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