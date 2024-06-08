import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa el componente Link
import './Face.css';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx'; // Asegúrate de importar ItemDetailContainer correctamente

const Face = () => {
  return (
    <div className="hero">
      <div className="overlay d-flex align-items-center justify-content-center flex-column">
          <h1 className="display-3">Bienvenido a MiWebSite</h1>
          <p className="lead">Encuentra los mejores productos aquí.</p>
          {/* Utiliza el componente Link con "to" en lugar de "href" */}
          <Link to="/products/real">
            <Button variant="primary" size="lg">Explora nuestros productos</Button>
          </Link>
      </div>
      <Container>
        <ItemListContainer />
      </Container>
    </div>
  );
};

export default Face;
