import React, { useState, useEffect } from 'react';
import { Table, Button, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons'; // Asegúrate de instalar react-bootstrap-icons

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios('/api/user');
        setUsers(response.data.response);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error al cargar los usuarios: {error}</div>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id || user.id}>
            <td>
              <Image src="https://yt3.googleusercontent.com/vRF8BHREiJ3Y16AbMxEi_oEuoQlnNNqGpgULuZ6zrWSAi24HcxX3Vko42RN8ToctH-G0qlWd=s900-c-k-c0x00ffffff-no-rj" roundedCircle style={{ width: '50px', height: '50px' }} />
            </td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                <Button variant="outline-primary" size="sm" className="mr-2">
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

export default UserManagement;