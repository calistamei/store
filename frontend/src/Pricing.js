import React, { useContext } from 'react'
import { Stack, TextField } from '@mui/material'
import { InputAdornment, Typography } from '@mui/material'
import { UserContext } from './Contexts/UserContext'

export default function Pricing() {
  const {setMinPrice, setMaxPrice} = useContext(UserContext)
  return (
    <Stack direction="column" marginBottom="20px">
        <Typography marginBottom="15px" variant="h6">
            Price Range
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
        <TextField onChange={(e)=>setMinPrice(e)}size="small" sx={{width:"100px"}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment> }} id="outlined-basic" label="Min" variant="outlined" />
        <TextField size="small" sx={{width:"100px"}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment> }} id="outlined-basic" label="Max" variant="outlined" />
        </Stack>
    </Stack>
  )
}
