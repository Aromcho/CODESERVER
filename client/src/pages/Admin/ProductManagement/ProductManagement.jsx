import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../../context/CartContext.jsx';
import { Table, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const ProductManagement = () => {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/api/product/paginate?limit=15&page=1`; // Ajusta según sea necesario
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductos(data.response); // Asegúrate de ajustar según la estructura de tu respuesta
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((product) => (
          <tr key={product._id}>
<td><img src='https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png' alt={product.title} style={{width: '50px'}} /></td>            <td>{product._id}</td>
            <td>{product.title}</td>
            <td>${product.price}</td>
            <td>{product.stock}</td>
            <td>
              
              <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                <Button variant="outline-primary" size="sm" className="mx-2">
                  <PencilSquare />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                <Button variant="outline-danger" size="sm">
                  <Trash />
                </Button>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductManagement;