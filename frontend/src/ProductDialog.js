import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DialogContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ProductDialog(props) {
    const { onClose, open, product } = props;

    const handleClose = () => {
      onClose();
    };
    const [quantity, setQuantity] = React.useState('');

    if (product) {
        return (
        <Dialog fullwidth="true" maxWidth="md" onClose={handleClose} open={open} product={product} style={{ maxWidth: "100%", maxHeight: "100%" }}>
            <DialogContent>
                <Stack direction="row" spacing={3}>
                    <img alt={product.product_name} style={{float:"left", height:"300px", width:"auto"}} src={product.image_url}></img>
                    <Stack direction="column">
                        <Typography variant="subtitle2" sx={{fontWeight:"bold"}}>
                            {product.brand.brand_name}
                        </Typography>
                        <Typography variant="h5" sx={{marginTop:"10px", marginBottom:"10px"}}>
                            {product.product_name}
                        </Typography>
                        <Typography variant="body2">
                            {product.description}
                        </Typography>
                        <Stack direction="row" sx={{position:"absolute", bottom:"40px", right:"40px"}}>
                            <FormControl required sx={{ m: 1, minWidth: 120, maxWidth:120 }}>
                                <InputLabel>Quantity</InputLabel>
                                <Select value={quantity} label="Quantity" onChange={(e)=> {setQuantity(e.target.value)}}>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                            <Button sx={{ m: 1, minWidth: 120, maxWidth:150, height:56 }} variant="outlined">Add to Cart</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
        )
    }
  }

  ProductDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };