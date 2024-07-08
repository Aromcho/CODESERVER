import React, { useState, useContext } from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Badge, TextField, Button, Stepper, Step, StepLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CartContext } from '../../context/CartContext.jsx';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { cartItems, getTotalPrice, total } = useContext(CartContext);
  const steps = ['Resumen de la compra', 'Detalles de envío', 'Confirmación'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      handleSubmit(); // Aquí se debería manejar la lógica de envío del formulario
    } else {
      handleNext();
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