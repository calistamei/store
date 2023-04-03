import { Box, AppBar, Toolbar, Typography, IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useState } from 'react'
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserContext } from '../Contexts/UserContext';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import CartDialog from './CartDialog';

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
    const cart = useSelector((state) => state.cart)

    const getTotalQuantity = () => {
      let total = 0
      cart.forEach(item => {
        total += item.quantity
      })
      return total
    }

    const [openCart, setOpenCart] = useState(false)
    const handleClickCart = () => {
      setOpenCart(true)
    };
    const handleCloseCart = () => {
      setOpenCart(false);
    };

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", color:"black"}}>
        <Toolbar>
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            >
            MKSTORE
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
            <Box sx={{ display: { md: 'flex' } }}>
            <IconButton onClick={() => handleClickCart()} size="large" aria-label="cart" color="inherit">
                <Badge badgeContent={getTotalQuantity()}>
                  <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
            >
            </IconButton>
            </Box>
        </Toolbar>
        </AppBar>
      </Box>
      <CartDialog openCart={openCart} onClose={handleCloseCart}/>
      </>
    )
}
