import React, { useEffect } from "react";
import { Nav, Container, ButtonGroup, Button, Dropdown } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../Item/Item.jsx";
import "./ItemList.css";

const ItemList = ({
  products,
  page,
  addToCart,
  setPage,
  prevPage,
  nextPage,
  totalPages,
  category,
  setCategory
}) => {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam, setCategory]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    navigate(`/products/real/${newCategory || ""}`);
  };

  return (
    <section className="d-flex flex-column">
      <div className="hero-list d-flex align-items-center justify-content-center flex-column">
      <p className="lead text-light">La moda que buscas, en un solo lugar.</p>

      </div>
      <Container className="p-1 mb-1">
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="outline-dark" size="sm" id="dropdown-basic">
          {category ? category : "Filtrar"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleCategoryChange(null)}>Todos</Dropdown.Item>
          <Dropdown.Item onClick={() => handleCategoryChange('Ropa')}>Ropa</Dropdown.Item>
          <Dropdown.Item onClick={() => handleCategoryChange('Calzado')}>Calzado</Dropdown.Item>
          <Dropdown.Item onClick={() => handleCategoryChange('Accesorios')}>Accesorios</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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

export default ItemList;
