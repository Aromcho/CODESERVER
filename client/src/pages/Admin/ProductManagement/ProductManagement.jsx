import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, OverlayTrigger, Form, Modal } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import axios from 'axios';

const ProductManagement = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    photo: '',
    category: '',
    price: 0,
    stock: 0
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product');
        if (!response.data || response.data.statusCode !== 200) {
          throw new Error('Failed to fetch products');
        }
        setProductos(response.data.response); // Asegúrate de ajustar según la estructura de tu respuesta
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/product', newProduct);
      console.log('Product uploaded:', response.data);
      fetchProducts(); // Actualizar la lista de productos después de la carga exitosa
      setNewProduct({
        title: '',
        photo: '',
        category: '',
        price: 0,
        stock: 0
      });
      setShow(false); // Cerrar el modal
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <>
      <Button variant="success" onClick={() => setShow(true)}>
        Agregar Producto
      </Button>
      
      <Table striped bordered hover className="mt-3">
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
              <td>
                <img src={product.photo} alt={product.title} style={{ width: '50px' }} />
              </td>
              <td>{product._id}</td>
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

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="title" value={newProduct.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="photo">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control type="text" name="photo" value={newProduct.photo} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Categoría</Form.Label>
              <Form.Control type="text" name="category" value={newProduct.category} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="price" value={newProduct.price} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={newProduct.stock} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Subir Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductManagement;
