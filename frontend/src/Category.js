import React from 'react'
import { Box, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material'

export default function Category({categories}) {
  return (
    <Box marginBottom="10px">
        <Typography marginBottom="5px" variant="h6">
            Category
        </Typography>
        <Box marginLeft="15px">
          <FormGroup>
              {categories.map(c=>
              <FormControlLabel key={c.id} control={<Checkbox/>} label={<Typography variant="body2">{c.category_name}</Typography>} />
              )}
          </FormGroup>
        </Box>
    </Box>
  )
}
