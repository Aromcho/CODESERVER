import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, TextField, Button, Stepper, Step, StepLabel, Divider } from '@mui/material';
import { CartContext } from '../../context/CartContext.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Checkout.css';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { cartItems, total, userId, borrarTodo } = useContext(CartContext);
  const steps = ['Resumen de la compra', 'Detalles de envío', 'Confirmación'];
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      await handlePayment();
    } else {
      handleNext();
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('/api/payments', { user_id: userId });
      
      // Redirigir al usuario a la URL de pago de Stripe
      const { url } = response.data;
      window.location.href = url;

    } catch (error) {
      console.error('Error al procesar el pago:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al realizar el pago',
        text: 'Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.',
        confirmButtonText: 'OK'
      });
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card className="checkout-card">
            <CardContent>
              <Typography variant="h5" component="h2" className="checkout-title">Resumen de la compra</Typography>
              <List>
                {cartItems.map((product) => (
                  <ListItem key={product._id}>
                    <ListItemText primary={product.product_id.title} secondary={`Precio: $${product.product_id.price}`} />
                  </ListItem>
                ))}
              </List>
              <Divider className="checkout-divider" />
              <Typography variant="body1" className="checkout-total">Total: ${total}</Typography>
              <Typography variant="body1" className="checkout-total">Cantidad de productos: {cartItems.length}</Typography>
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card className="checkout-card">
            <CardContent>
              <Typography variant="h5" component="h2" className="checkout-title">Detalles de la compra</Typography>
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
                  className="checkout-input"
                />
                <FormControl fullWidth margin="normal" className="checkout-input">
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
          <Card className="checkout-card">
            <CardContent>
              <Typography variant="h5" component="h2" className="checkout-title">Confirmación</Typography>
              <Typography variant="body1" className="checkout-confirmation">Tu pedido está casi listo. Revisa los detalles y finaliza tu compra.</Typography>
            </CardContent>
          </Card>
        );
      default:
        return 'Paso desconocido';
    }
  };

  return (
    <Container maxWidth="md" className="checkout-container">
      <Stepper activeStep={activeStep} alternativeLabel className="checkout-stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="checkout-content">
        {getStepContent(activeStep)}
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button disabled={activeStep === 0} onClick={handleBack} className="checkout-button">Atrás</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleFormSubmit} className="checkout-button">
              {activeStep === steps.length - 1 ? 'Pagar' : 'Siguiente'}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Checkout;
