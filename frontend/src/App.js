import React, { useState, useEffect, useContext } from 'react'
import ProductList from './ProductList'
import NavBar from './NavBar'
import Pricing from './Pricing'
import Brand from './Brand'
import Category from './Category'
import { Grid } from '@mui/material'
import axios from 'axios'
import { UserContext } from './Contexts/UserContext'
import SearchBar from './SearchBar'

function App() {

  const {selectedCategories, minPrice, maxPrice} = useContext(UserContext)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  
  // let criteria = {}
  // if (category) {criteria['category'] = category}
  // if (brands) {criteria['brands'] = brands}
  // console.log(criteria)

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

  function getByPrice() {
    if (minPrice === undefined) {
      return products.filter(p=>p.price <= maxPrice)
    } else if (maxPrice === undefined) {
      return products.filter(p=>p.price >= minPrice)
    } else {
      return products.filter(p=>p.price <= maxPrice && p.price >= minPrice)
    }
  }

  useEffect(() => {
    if (minPrice || maxPrice) {
      setFilteredProducts((getByPrice()))
    } else {
      setFilteredProducts((products.filter(p=>selectedCategories.has(p.category_id))))
    }
  }, [selectedCategories, minPrice, maxPrice]);

  return (
      <>
        <SearchBar />
        <NavBar categories={categories}/>
        <Grid container spacing={2} marginTop="15px">
          <Grid item xs={2}>
            <Pricing />
            <Category categories={categories}/>
            <Brand brands={brands} />
          </Grid>
          <Grid item xs={10}>
            <ProductList products={selectedCategories.size !== 0 || minPrice || maxPrice ?filteredProducts:products} />
          </Grid>
        </Grid>
      </>
  );
}

export default App;
