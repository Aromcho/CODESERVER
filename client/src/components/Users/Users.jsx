import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios('/api/user');
        console.log('Datos recibidos:', response.data.response); // Agrega esto para inspeccionar la respuesta
        setUsers();
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setError(error.toString()); // Proporciona más información sobre el error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error al cargar los usuarios: {error}</div>; // Muestra el mensaje de error

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id || user.id}> {/* Asegúrate de que la clave es correcta */}
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              Editar | Eliminar
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserManagement;