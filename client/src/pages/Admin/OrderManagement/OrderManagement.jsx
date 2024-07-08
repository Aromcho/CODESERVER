import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
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
  {orders.map((order) => (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td>{order.user_id.name} ({order.user_id.email})</td>
      <td>{order.fecha}</td>
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
  ))}
</tbody>
    </Table>
  );
};

export default OrderManagement;