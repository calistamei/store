import { Button, Dialog, Typography, Stack, DialogContent, DialogTitle, Box } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItem } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

export default function CartDialog(props) {
    const dispatch = useDispatch()
    const { onClose, openCart } = props;

    const handleClose = () => {
        onClose();
    };
    const cart = useSelector((state) => state.cart)

  return (
    <Dialog fullwidth="true" maxWidth="md" onClose={handleClose} open={openCart} style={{ maxWidth: "100%", maxHeight: "100%" }}>
        <DialogTitle>
            Shopping Cart
        </DialogTitle>
        <DialogContent>
        {cart?.map((item) => (
            <Box key={item.id} sx={{marginBottom: '20px', borderBottom: '1px solid'}}>
                <Stack direction="row">
                    <img alt={item.pname} style={{float:"left", height:"200px", width:"auto"}} src={item.img}></img>
                    <Stack direction="column" sx={{width:'400px'}}>
                        <Typography variant="body2" sx={{fontWeight:"bold"}}>
                            {item.brand}
                        </Typography>
                        <Typography variant="body1">
                            {item.pname}
                        </Typography>
                    </Stack>
                    <Stack direction="column" sx={{alignItems:"flex-end"}}>
                        <Typography>
                            {item.price}
                        </Typography>
                        <Stack direction="row" sx={{marginTop:"130px"}}>
                        <Button onClick={() => dispatch(removeItem(item.id))} variant='text'>
                            Remove
                        </Button>
                            <Button onClick={() => dispatch(decrementQuantity(item.id))} sx={{ m: 1, minWidth: 30, maxWidth:70, height:30 }} variant="outlined">-</Button>
                            <Typography sx={{marginTop: '10px'}}>
                                {item.quantity}
                            </Typography>
                            <Button onClick={() => dispatch(incrementQuantity(item.id))} sx={{ m: 1, minWidth: 30, maxWidth:150, height:30 }} variant="outlined">+</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        ))}
        </DialogContent>
        </Dialog>
  )
}
