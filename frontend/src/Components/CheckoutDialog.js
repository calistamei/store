import { Button, Typography, Dialog, DialogTitle, DialogContent, TextField, Stack, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react';

export default function CheckoutDialog(props) {
    const { onClose, openCheckout } = props
    const handleClose = () => {
        onClose();
        setOrder(false)
    };
    const [order, setOrder] = useState(false)

    const handlePlaceOrder = () => {
        setOrder(true)
    }
    

  return (
    <Dialog fullwidth="true" maxWidth="md" onClose={handleClose} open={openCheckout} style={{ maxWidth: "100%", maxHeight: "100%" }}>
        <DialogTitle>
            Checkout
        </DialogTitle>
        <DialogContent>
            <Stack direction='column' sx={{marginBottom:'30px'}}>
                <Box>
                    <TextField sx={{marginTop:'10px', marginRight:'30px'}} label="First Name" variant="outlined" />
                    <TextField sx={{marginTop:'10px', marginRight: '30px'}} label="Last Name" variant="outlined" />
                    <TextField sx={{marginTop:'10px', width: '400px'}} label="Email Address" variant="outlined" />
                </Box>
                <TextField sx={{marginTop:'10px'}} label="Street Address" variant="outlined" />
                <Box>
                    <TextField sx={{marginTop:'10px', marginRight: '30px'}} label="City" variant="outlined" />
                    <TextField sx={{marginTop:'10px', marginRight: '30px'}} label="State" variant="outlined" />
                    <TextField sx={{marginTop:'10px'}} label="Zip Code" variant="outlined" />
                </Box>
            </Stack>
            <Typography variant="h6">
                Payment Info
            </Typography>
            <Stack direction='column' sx={{marginBottom:'30px'}}>
                <TextField sx={{marginTop:'10px'}} label="Card Number" variant="outlined" />
                <Box>
                    <TextField sx={{marginTop:'10px', marginRight: '30px'}} label="Month" variant="outlined" />
                    <TextField sx={{marginTop:'10px', marginRight: '30px'}} label="Year" variant="outlined" />
                    <TextField sx={{marginTop:'10px'}} label="CVV" variant="outlined" />
                </Box>
            </Stack>
            <Button onClick={() => handlePlaceOrder()} sx={{marginBottom:'30px', marginTop:'15px', minWidth: 50, maxWidth:150, height: 50, backgroundColor:'black'}} variant="contained">Place Order</Button>
            { order &&
                <Typography>
                    Order Placed.
                </Typography>
            }
        </DialogContent>
    </Dialog>
  )
}
