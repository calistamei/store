import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProductDialog from './ProductDialog';
import { Container } from '@mui/system';

export default function ProductList({products}) {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState()
  const handleClickProduct = (p) => {
    setOpen(true)
    setProduct(p)
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        {products.map(p => (
          <Grid key={p.id} item xs={4} md={3} lg={2} >
            <Card onClick={() => handleClickProduct(p)}>
              <Container sx={{marginTop:"10px"}}>
                <CardMedia component="img" image={p.image_url}></CardMedia>
              </Container>
              <CardContent>
                <Typography sx={{fontWeight:"bold"}} variant="subtitle2">
                  {p.brand.brand_name}
                </Typography>
                <Typography variant="body1">
                  {p.product_name}
                </Typography>
                <Typography variant="body2">
                  {p.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ProductDialog product={product} open={open} onClose={handleClose}/>
    </>
  )
}
