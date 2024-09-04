import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Alert, Card, Row, Col } from "react-bootstrap";
import { TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { CartContext } from "../../context/CartContext.jsx";
import Swal from "sweetalert2";
import "./Vender.css";
import UserProductList from "../../components/UserProductList/UserProductList.jsx";

const Vender = () => {
  const { isAdmin, userId } = useContext(CartContext);
  const [newProduct, setNewProduct] = useState({
    title: "",
    photo: "",
    category: "",
    price: "",
    stock: "",
    user_id: userId,
  });
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]); // Estado para manejar los productos

  useEffect(() => {
    if (!isAdmin) {
      Swal.fire({
        icon: "info",
        title: "Acceso Denegado",
        text: "Solo los usuarios PREMIUM o ADMIN pueden vender productos.",
        showCancelButton: true,
        confirmButtonText: "Actualizar a PREMIUM",
        cancelButtonText: "Volver",
      });
    }
  }, [isAdmin]);

  // Obtener productos del usuario al cargar la página
  const fetchUserProducts = async () => {
    try {
      const response = await axios.get(`/api/product?user_id=${userId}`);
      setProducts(response.data.response); // Actualizar estado con productos del usuario
    } catch (err) {
      setError("Error al cargar los productos del usuario.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProducts(); // Cargar productos cuando el componente se monta
    }
  }, [userId]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/product", {
        ...newProduct,
        user_id: userId,
      });
      Swal.fire("Producto subido!", "Tu producto ha sido subido exitosamente.", "success");
      setProducts([...products, response.data.product]); // Actualizar estado con el nuevo producto
    } catch (err) {
      setError("Error al subir el producto. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <Container fluid className="vender-container mt-5">
      <Row>
        <Col md={6}>
          <Card className="vender-card">
            <Card.Body>
              <h2 className="vender-title">Vender un Producto</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit} className="vender-form">
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Título del Producto"
                    name="title"
                    value={newProduct.title}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="URL de la Foto"
                    name="photo"
                    value={newProduct.photo}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="Ropa">Ropa</MenuItem>
                    <MenuItem value="Calzado">Calzado</MenuItem>
                    <MenuItem value="Accesorios">Accesorios</MenuItem>
                    <MenuItem value="Electrónica">Electrónica</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Precio"
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Stock"
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
                <Button type="submit" variant="primary" className="mt-3 btn-custom">
                  Vender Producto
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="vender-card">
            <Card.Body>
              <h2 className="vender-title">Mis Productos</h2>
              <UserProductList products={products} /> {/* Mostrar productos del usuario */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Vender;
