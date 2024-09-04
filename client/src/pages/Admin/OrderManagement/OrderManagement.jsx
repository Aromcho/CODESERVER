import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);  // Inicializado como un arreglo vacío

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();

        // Verifica si data es un arreglo
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('El dato recuperado no es un arreglo:', data);
          setOrders([]);  // Asegúrate de que orders sea un arreglo
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);  // Asegúrate de que orders sea un arreglo incluso en caso de error
      }
    };

    fetchOrders();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.user_id ? `${order.user_id.name} (${order.user_id.email})` : 'Cliente desconocido'}
              </td>
              <td>{new Date(order.fecha).toLocaleDateString()}</td> {/* Formato de fecha */}
              <td>${order.total}</td>
              <td>
                <OverlayTrigger overlay={<Tooltip>Ver Detalles</Tooltip>}>
                  <Button variant="outline-secondary" size="sm" className="mx-1">
                    <Eye />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                  <Button variant="outline-primary" size="sm" className="mx-1">
                    <PencilSquare />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                  <Button variant="outline-danger" size="sm" className="mx-1">
                    <Trash />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">No hay órdenes disponibles</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default OrderManagement;
