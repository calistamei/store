import React from 'react'
import { Box, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material'
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';

export default function Category({categories}) {
  const {selectedCategories, setSelectedCategories} = useContext(UserContext)

  const handleCheckbox = (e, id) => {
    if (e.target.checked) {
      setSelectedCategories(new Set([...selectedCategories, id]))
    } else {
      let newSelected = new Set(selectedCategories)
      newSelected.delete(id)
      setSelectedCategories(newSelected)
    }
  }

  return (
    <Box marginBottom="10px">
        <Typography marginBottom="5px" variant="h6">
            Category
        </Typography>
        <Box marginLeft="15px">
          <FormGroup>
              {categories.map(c=>
              <FormControlLabel key={c.id} control={<Checkbox color="default" checked={selectedCategories.has(c.id)?true:false} onChange={(e) => handleCheckbox(e, c.id)}/>} label={<Typography variant="body2">{c.category_name}</Typography>} />
              )}
          </FormGroup>
        </Box>
    </Box>
  )
}
