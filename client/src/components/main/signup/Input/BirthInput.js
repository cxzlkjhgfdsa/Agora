import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function BirthInput({color}) {
  return(
    <Grid container item xs={12} spacing={1}>
      <Grid item xs={4}>
        <TextField
          required
          fullWidth
          id="year"
          label="생년(0000)"
          name="year"
          autoComplete="year"
          color={color}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          fullWidth
          id="month"
          label="월"
          name="month"
          autoComplete="month"
          color={color}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          fullWidth
          id="date"
          label="일"
          name="date"
          autoComplete="date"
          color={color}
        />
      </Grid>
    </Grid>
  )
}

export default BirthInput