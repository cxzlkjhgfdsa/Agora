import styled, { keyframes } from "styled-components";
import "./CardInputButton.css"
import { useEffect, useRef, useState } from "react";
// mui
import Grid from "@mui/material/Grid";
// recoil
import { SetRecoilState, useRecoilState } from "recoil";
import { cardNumState, firstCardState, secondCardState } from "stores/DebateStates";

function CardInputButton ({isReady}) {
  // state
  const [img1, setImg1] = useRecoilState(firstCardState);
  const [img2, setImg2] = useRecoilState(secondCardState);
  const [cardNum, setCardNum] = useRecoilState(cardNumState);
  // Ref
  const imgRef1 = useRef();
  const imgRef2 = useRef();
  // onChange => image upload
  const saveImgFile = (event) => {
    const id = event.target.id
    switch (id) {
      case 'card-input1':
        const file1 = imgRef1.current.files[0];
        const reader1 = new FileReader();
        reader1.readAsDataURL(file1);
        reader1.onloadend = () => {
          setImg1(reader1.result);
          setCardNum(cardNum + 1);
        };
        break;
      case 'card-input2':
        const file2 = imgRef2.current.files[0];
        const reader2 = new FileReader();
        reader2.readAsDataURL(file2);
        reader2.onloadend = () => {
          setImg2(reader2.result);
          setCardNum(cardNum + 1);
        };
        break;
    }
  }
  // onClick => reset image
  const resetImg1 = () => {
    imgRef1.current.value = "";
    setImg1("");
    setCardNum(cardNum - 1);
  };
  const resetImg2 = () => {
    imgRef2.current.value = "";
    setImg2("");
    setCardNum(cardNum - 1);
  };

  return(
    <Wrapper>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <ButtonWrapper>
            {img1 !== ""
              ?(
                <ImageCropping>
                  <ImgWrapper ref={imgRef1} onClick={resetImg1}>
                    <DeleteImg />
                    <TextWrapper>
                      Delete
                    </TextWrapper>
                    <PreviewImg src={img1} />  
                  </ImgWrapper>
                </ImageCropping>
              ):(
                <div className="card-input">
                  <label htmlFor="card-input1">✚</label>
                  <input type='file' id="card-input1" ref={imgRef1} onChange={saveImgFile} />
                </div>
            )}
            
          </ButtonWrapper>
        </Grid>
        <Grid item xs={6}>
          <ButtonWrapper>
            {img2 !== ""
              ?(
                <ImageCropping>
                  <ImgWrapper ref={imgRef2} onClick={resetImg2}>
                    <DeleteImg />
                    <TextWrapper>
                      Delete
                    </TextWrapper>
                    <PreviewImg src={img2} />
                  </ImgWrapper>
                </ImageCropping>
              ):(
                <div className="card-input">
                  <label htmlFor="card-input2">✚</label>
                  <input type='file' id="card-input2" ref={imgRef2} onChange={saveImgFile} />
                </div>
            )}
           
          </ButtonWrapper>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default CardInputButton

const Wrapper = styled.div`
`

const ButtonWrapper = styled.div`
  // margin
  margin-top: calc(60px - 2vw);

  // positioning
  display: flex;
  justify-content: center;
  algin-items: center;
`

const ImageCropping = styled.div`
  position: relative;
  overflow: hidden;

  width: calc(80px + 2vw);
  height: calc(80px + 2vw);
  border-radius: 5px;
  
  margin-left: 8px;
`

const PreviewImg = styled.img`
  position: absoulte;

  width: 150px;
  height: auto;

  margin-left: calc(50% - 75px);
`

const TextWrapper = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  opacity: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  color: white;

`

const DeleteImg = styled.img`
  position: absolute;

  width: 100%;
  height: 100%;

  opacity: 0;
  background-color: black;
`

const SelectAnime = keyframes`
  to {
    opacity: 0.7
  }
`

const SelectTextAnime = keyframes`
  to {
    opacity: 1
  }
`

const ImgWrapper = styled.div`
  cursor: pointer;

  &:hover {
    ${DeleteImg} {
      animation: ${ SelectAnime } 0.3s 0.01s ease 1 forwards;
    }
    ${TextWrapper} {
      animation: ${ SelectTextAnime } 0.3s 0.01s ease 1 forwards;
    }
  }
`
