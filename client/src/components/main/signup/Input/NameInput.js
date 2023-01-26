import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function CustomTextInput ({color}) {
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
        error={false ? true : false}
      />
    </Grid>

  )
}

export default CustomTextInput