import React, { useMemo, useState, useEffect, useContext } from 'react'
import ProductList from './Components/ProductList'
import NavBar from './Components/NavBar'
import Pricing from './Components/Pricing'
import Brand from './Components/Brand'
import Category from './Components/Category'
import { Grid } from '@mui/material'
import axios from 'axios'
import { UserContext } from './Contexts/UserContext'
import SearchBar from './Components/SearchBar'

function App() {

  const {selectedBrands, selectedCategories, minPrice, maxPrice, search} = useContext(UserContext)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  await axios.get("http://127.0.0.1:5000/getallproducts").then(res => {
      setProducts(Array.from(res.data.products))
  })
  await axios.get("http://127.0.0.1:5000/getallcategories").then(res => {
    setCategories(Array.from(res.data.categories))
  })
  await axios.get("http://127.0.0.1:5000/getallbrands").then(res => {
    setBrands(Array.from(res.data.brands))
  })
  };

  const filteredProducts = useMemo(() => {
    function getByPrice() {
      if (minPrice === undefined || isNaN(minPrice)) {
        return products.filter(p=>parseFloat(p.price.substring(1)) <= maxPrice)
      } else if (maxPrice === undefined || isNaN(maxPrice)) {
        return products.filter(p=>parseFloat(p.price.substring(1)) >= minPrice)
      } else {
        return products.filter(p=>parseFloat(p.price.substring(1)) <= maxPrice && parseFloat(p.price.substring(1)) >= minPrice)
      }
    }

    let criteria = {}
    if (selectedCategories.size > 0) {criteria['category_id'] = selectedCategories}
    if (selectedBrands.size > 0) {criteria['brand_id'] = selectedBrands}
    if (search) {criteria['search'] = search}


    if (minPrice || maxPrice) {
      return getByPrice().filter(p=> Object.keys(criteria).every(key=>key==='search'? p.brand.brand_name.toLowerCase().includes(search.toLowerCase())
      || p.product_name.toLowerCase().includes(search.toLowerCase()) :criteria[key].has(p[key])))
    } else if (selectedCategories.size === 0 && selectedBrands.size === 0) {
      return products.filter(p=> Object.keys(criteria).every(key=>key==='search'? p.brand.brand_name.toLowerCase().includes(search.toLowerCase())
      || p.product_name.toLowerCase().includes(search.toLowerCase()) :criteria[key].has(p[key])))
    } else {
      return products.filter(p=> Object.keys(criteria).every(key=>key==='search'? p.brand.brand_name.toLowerCase().includes(search.toLowerCase())
      || p.product_name.toLowerCase().includes(search.toLowerCase()) :criteria[key].has(p[key])))
    } 
  }, [products, selectedBrands, selectedCategories, minPrice, maxPrice, search]);

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
            <ProductList products={selectedBrands.size !==0 || selectedCategories.size !== 0 || minPrice || maxPrice || search?filteredProducts:products} />
          </Grid>
        </Grid>
      </>
  );
}

export default App;
