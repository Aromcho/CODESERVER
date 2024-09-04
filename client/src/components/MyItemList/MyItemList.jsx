import React, { useEffect } from "react";
import { Nav, Container, ButtonGroup, Button, Dropdown } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../Item/Item.jsx";
import "./MyItemList.css";

const MyItemList = ({
  products,
  page,
  addToCart,
  setPage,
  prevPage,
  nextPage,
  totalPages,
  category
}) => {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí es donde estaba el problema. Eliminamos esta línea si no es necesaria.
    // setCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (newCategory) => {
    // Si necesitas cambiar la categoría, asegúrate de que `setCategory` se define en el componente padre.
    // setCategory(newCategory);
    setPage(1);
    navigate(`/products/real/${newCategory || ""}`);
  };

  return (
    <section className="d-flex flex-column">
      
      <Container className="p-1 mb-1">
        <div className="container item-list">
          {products.map((product) => (
            <Item key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </Container>
      <div className="d-flex justify-content-around mt-4">
        <button onClick={() => setPage(prevPage)} disabled={!prevPage}>Anterior</button>
        <ButtonGroup aria-label="First group">
          <Button variant="secondary">{page}</Button>{' '}
          <Button variant="secondary">{page + 1}</Button>{' '}
          <Button variant="secondary">{page + 2}</Button>{' '}
          <Button variant="secondary">{page + 3}</Button>
        </ButtonGroup>
        <button onClick={() => setPage(nextPage)} disabled={!nextPage}>Siguiente</button>
      </div>
    </section>
  );
};

export default MyItemList;
