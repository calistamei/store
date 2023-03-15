import { Box, AppBar, Toolbar, Typography, IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useContext } from 'react'
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserContext } from './Contexts/UserContext';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center'
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {width: '20ch'},
      },
    },
  }));

export default function SearchBar() {
    const {setSearch} = useContext(UserContext)
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", color:"black"}}>
        <Toolbar>
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            >
            LOGO
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e)=>{setSearch(e.target.value)}}
            />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <ShoppingCartIcon />
            </IconButton>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            </Box>
        </Toolbar>
        </AppBar>
    </Box>
    )
}
