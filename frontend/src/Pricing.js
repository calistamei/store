import React from 'react'
import { Stack, TextField } from '@mui/material'
import { InputAdornment, Typography } from '@mui/material'

export default function Pricing() {
  return (
    <Stack direction="column" marginBottom="20px">
        <Typography marginBottom="15px" variant="h6">
            Price Range
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
        <TextField size="small" sx={{width:"100px"}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment> }} id="outlined-basic" label="Min" variant="outlined" />
        <TextField size="small" sx={{width:"100px"}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment> }} id="outlined-basic" label="Max" variant="outlined" />
        </Stack>
    </Stack>
  )
}
