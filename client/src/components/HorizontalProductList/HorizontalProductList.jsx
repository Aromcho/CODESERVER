import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Item from "../Item/Item.jsx"; // Asegúrate de que este sea el camino correcto
import "./HorizontalProductList.css";

const HorizontalProductList = ({ category, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/product/paginate?limit=5&category=${category}`);
        if (response.data && response.data.response) {
          setProducts(response.data.response);
        } else {
          setProducts([]);
        }
      } catch (error) {
        setError("Error al cargar los productos");
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container className="horizontal-product-list-container">
      <div className="horizontal-product-list">
        {products.map((product) => (
          <div key={product._id} className="item-wrapper"> {/* Envolver cada Item */}
            <Item product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HorizontalProductList;
