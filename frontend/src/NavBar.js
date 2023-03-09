import React, { useContext}  from 'react'
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import { UserContext } from './Contexts/UserContext';

export default function NavBar({categories}) {
    const {setCategory} = useContext(UserContext)

    return (
    <div>
        <AppBar position="static" sx={{ backgroundColor: "black"}}>
            <Container>
                <Toolbar sx={{display:"flex", justifyContent:"center"}}>
                    <Box>
                        <Button onClick={(e)=>setCategory(0)} sx={{ color: 'white', margin: "0 60px 0 60px"}}>
                            ALL
                        </Button>
                    {categories.map((c) => (
                        <Button key={c.id} onClick={(e)=>setCategory(c.id)} sx={{ color: 'white', margin: "0 60px 0 60px"}}>
                            {c.category_name}
                        </Button>
                    ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    </div>
  )
}
