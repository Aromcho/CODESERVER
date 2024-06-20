import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [], // Aquí se almacenarán los pedidos
        };
    }

    // Asume que tienes una función para obtener los pedidos
    componentDidMount() {
        this.getOrders();
    }

    getOrders() {
        axios.get('/api/orders')
            .then(response => {
                this.setState({ orders: response.data });
                console.log('Pedidos:', response.data);
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    handleAccept(orderId) {
        // Aquí debes implementar la lógica para aceptar un pedido
    }

    handleReject(orderId) {
        // Aquí debes implementar la lógica para rechazar un pedido
    }

    render() {
        return (
            <Container className='mt-5 d-flex flex-column align-items-center'>
            {this.state.orders.map((order) => (
                <Card key={order.id} className="mb-4 bg-dark text-white w-75">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                            <Card.Title>{order.user_id.name}</Card.Title>
                            <Card.Text>{order.quantity}</Card.Text>
                        </div>
                        <div>
                            <Button variant="success" onClick={() => this.handleAccept(order.id)}>Aceptar</Button>
                            <Button variant="danger" className="ml-2" onClick={() => this.handleReject(order.id)}>Rechazar</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
        );
    }
}

export default Orders;