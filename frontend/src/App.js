import React, { useState, useEffect, useContext } from 'react'
import ProductList from './ProductList'
import NavBar from './NavBar'
import axios from 'axios'
import { UserContext } from './Contexts/UserContext'

function App() {

  const {category} = useContext(UserContext)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  
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
  };

  useEffect(() => {
    setFilteredProducts((products.filter(p=>p.category_id === category)))
  }, [category]);

  return (
      <>
        <NavBar categories={categories}/>
        <ProductList products={category?filteredProducts:products} />
      </>
  );
}

export default App;
