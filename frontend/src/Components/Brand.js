import React from 'react'
import { Box, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material'
import { UserContext } from '../Contexts/UserContext'
import { useContext } from 'react'

export default function Brand({brands}) {
  const {selectedBrands, setSelectedBrands} = useContext(UserContext)

  const handleCheckbox = (e, id) => {
    if (e.target.checked) {
      setSelectedBrands(new Set([...selectedBrands, id]))
    } else {
      let newSelected = new Set(selectedBrands)
      newSelected.delete(id)
      setSelectedBrands(newSelected)
    }
  }

  return (
    <>
        <Typography marginBottom="15px" variant="h6">
            Brands
        </Typography>
        <Box marginLeft="15px">
          <FormGroup>
              {brands.map(b=>
              <FormControlLabel sx={{marginBottom: "10px"}}key={b.id} control={<Checkbox onChange={(e) => handleCheckbox(e, b.id)} color="default"/>} label={<Typography variant="body2">{b.brand_name}</Typography>} />
              )}
          </FormGroup>
        </Box>
    </>
  )
}
