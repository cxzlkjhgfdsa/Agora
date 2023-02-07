import styled from "styled-components";
import "./CardInputButton.css"
import { useRef } from "react";
// mui
import Grid from "@mui/material/Grid";

function CardInputButton () {
  // Ref
  const imgRef = useRef();
  // Onclick => image upload
  const saveImgFile = () => {
    console.log('img')
  }

  return(
    <Wrapper>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="card-input">
            <label htmlFor="card-input">✚</label>
            <input type='file' id="card-input" />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="card-input">
            <label htmlFor="card-input">✚</label>
            <input type='file' id="card-input" />
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default CardInputButton

const Wrapper = styled.div`
  margin-top: 30px;
`