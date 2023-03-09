import React from 'react'
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material'

export default function Brands({brands}) {
  return (
    <>
        <Typography marginBottom="15px" variant="h6">
            Brands
        </Typography>
        <FormGroup>
            {brands.map(b=>
            <FormControlLabel sx={{marginBottom: "10px"}}key={b.id} control={<Checkbox/>} label={<Typography variant="body2">{b.brand_name}</Typography>} />
            )}
        </FormGroup>
    </>
  )
}
