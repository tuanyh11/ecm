import React, { useState, useEffect } from "react";
import productData from '../assets/fake-data/products'

const Test = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(productData.getAllProducts);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = products.filter((product) =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // console.log(results);
    console.log(products.filter((product) =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    ));
    setSearchResults(results);
  }, [searchTerm, products]);
  
  return (
    <div>
      <form>
        <input type="text" placeholder="Search products" onChange={handleSearch} />
      </form>

      {searchResults.length > 0 ? (
        
        searchResults.map((products) => (
            
          <div key={products.id}>
            <h3>{products.name}</h3>
            <p>{products.description}</p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Test;

