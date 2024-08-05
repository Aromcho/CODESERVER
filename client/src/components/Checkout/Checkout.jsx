import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate para React Router v6
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, TextField, Button, Stepper, Step, StepLabel } from '@mui/material';
import { CartContext } from '../../context/CartContext.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { cartItems, total, userId, borrarTodo } = useContext(CartContext); // Obtener userId del contexto y la función borrarTodo
  const steps = ['Resumen de la compra', 'Detalles de envío', 'Confirmación'];
  const navigate = useNavigate(); // Hook para redireccionar

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      await handleSubmit(); // Aquí se maneja la lógica de envío del formulario
    } else {
      handleNext();
    }
  };

  const handleSubmit = async () => {
    try {
      const orderData = {
        user_id: userId, // Usar userId del contexto
        address,
        state: 'reserver',
        quantity: cartItems.length, // O la cantidad total de productos si es necesario
      };

      const response = await axios.post('/api/orders', orderData);
      console.log(response.data); // Manejar la respuesta según sea necesario

      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: 'Compra realizada con éxito',
        text: 'Tu pedido ha sido realizado correctamente.',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redireccionar a la página principal
        navigate('/');

        // Vaciar el carrito
        axios.delete(`/api/cart/all/${userId}`)
          .then(() => {
            borrarTodo(); // Llamar a la función borrarTodo del contexto
          })
          .catch((error) => {
            console.error('Error al vaciar el carrito:', error);
          });
      });

      // Resetear el formulario después de la compra
      setAddress('');
      setPaymentMethod('');
      setActiveStep(0);

    } catch (error) {
      console.error('Error al crear la orden:', error);
      // Mostrar SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error al realizar la compra',
        text: 'Hubo un problema al procesar tu pedido. Por favor, inténtalo de nuevo.',
        confirmButtonText: 'OK'
      });
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">Resumen de la compra</Typography>
              <List>
                {cartItems.map((product) => (
                  <ListItem key={product.id}>
                    <ListItemText primary={product.product_id.title} secondary={`Precio: $${product.product_id.price}`} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="body1">Total: ${total}</Typography>
              <Typography variant="body1">Cantidad de productos: {cartItems.length}</Typography>
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">Detalles de la compra</Typography>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  label="Dirección de envío"
                  type="text"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Método de pago</InputLabel>
                  <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <MenuItem value="credit">Tarjeta de crédito</MenuItem>
                    <MenuItem value="debit">Tarjeta de débito</MenuItem>
                    <MenuItem value="cash">Efectivo</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">Confirmación</Typography>
              {/* Aquí se pueden agregar más detalles de confirmación según sea necesario */}
            </CardContent>
          </Card>
        );
      default:
        return 'Paso desconocido';
    }
  };

  return (
    <Container maxWidth="md" className="mt-5">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStep)}
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button disabled={activeStep === 0} onClick={handleBack}>Atrás</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
              {activeStep === steps.length - 1 ? 'Finalizar compra' : 'Siguiente'}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Checkout;
