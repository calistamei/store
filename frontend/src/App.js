import React, { useState, useEffect } from 'react'
import ProductList from './ProductList'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/getallproducts").then(res => {
      setProducts(Array.from(res.data.products))
    })
  })

  return (
    <ProductList products={products} />
  );
}

export default App;
