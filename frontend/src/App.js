import React, { useState, useEffect, useContext } from 'react'
import ProductList from './ProductList'
import NavBar from './NavBar'
import Pricing from './Pricing'
import Brands from './Brands'
import { Grid } from '@mui/material'
import axios from 'axios'
import { UserContext } from './Contexts/UserContext'

function App() {

  const {category} = useContext(UserContext)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  await axios.get("http://127.0.0.1:5000/getallproducts").then(res => {
      console.log(res.data.products)
      setProducts(Array.from(res.data.products))
  })
  await axios.get("http://127.0.0.1:5000/getallcategories").then(res => {
    setCategories(Array.from(res.data.categories))
  })
  await axios.get("http://127.0.0.1:5000/getallbrands").then(res => {
    setBrands(Array.from(res.data.brands))
  })
  };

  useEffect(() => {
    setFilteredProducts((products.filter(p=>p.category_id === category)))
  }, [category]);

  return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NavBar categories={categories}/>
          </Grid>
          <Grid item xs={2}>
            <Pricing />
            <Brands brands={brands} />
          </Grid>
          <Grid item xs={10}>
            <ProductList products={category?filteredProducts:products} />
          </Grid>
        </Grid>
      </>
  );
}

export default App;
