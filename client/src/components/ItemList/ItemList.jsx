import React, { useEffect, useContext } from "react";
import { Nav, Container, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Item from "../Item/Item.jsx";

const ItemList = ({
  products,
  category,
  page,
  addToCart,
  setPage,
  prevPage,
  nextPage,
  totalPages,
}) => {
  useEffect(() => {}, [category, page, addToCart]);


    
  return (
    <section className="d-flex flex-column">
      <Nav
        className="nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm"
        id="pillNav2"
        role="tablist"
        style={{
          "--bs-nav-link-color": "var(--bs-white)",
          "--bs-nav-pills-link-active-color": "var(--bs-primary)",
          "--bs-nav-pills-link-active-bg": "var(--bs-white)",
        }}
      >
        <Nav.Item>
          <Link to="/products/real">
            <Nav.Link
              className="active rounded-5"
              id="home-tab2"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="true"
            >
              todos
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/products/real/Ropa">
            <Nav.Link
              className="rounded-5"
              id="profile-tab2"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
            >
              Ropa
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/products/real/Calzado">
            <Nav.Link
              className="rounded-5"
              id="contact-tab2"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
            >
              Calzado
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/products/real/Accesorios">
            <Nav.Link
              className="rounded-5"
              id="contact-tab2"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
            >
              Accesorios
            </Nav.Link>
          </Link>
        </Nav.Item>
      </Nav>
      <h1 className="text-center p-4">Lista de Productos</h1>
      <Container className="p-4 mb-4">
        <div className="item-list">
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
