import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';

const BioCard = () => {
  const [usuario, setUsuario] = useState({
    nombre: "Cargando...",
    email: "",
    avatarUrl: "https://via.placeholder.com/150"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('/api/sessions/online');
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const userId = response.data.user_id;
        console.log(userId); 

        // Realizar una solicitud GET a /api/user/:uid con el userId obtenido
        const userResponse = await axios(`/api/user/${userId}`);
        if (userResponse.status !== 200) {
          throw new Error('Network response was not ok');
        }
        // Suponiendo que la respuesta tenga la forma del objeto proporcionado
        const userData = userResponse.data.response;
        console.log(userData);
        // Actualiza el estado del usuario aquí con los datos recibidos
        setUsuario({ nombre: userData.name, email: userData.email, avatarUrl: userData.photo, edad: userData.age });

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className='mt-2 mb-2'>
      <Card.Body>
        <div className="text-center">
        <Image src="https://yt3.googleusercontent.com/vRF8BHREiJ3Y16AbMxEi_oEuoQlnNNqGpgULuZ6zrWSAi24HcxX3Vko42RN8ToctH-G0qlWd=s900-c-k-c0x00ffffff-no-rj" roundedCircle style={{ width: '100px', height: '100px' }} />          <div className="mt-3">
            <h5>{usuario.nombre}</h5>
            <p>{usuario.email}</p>
          </div>
          <div>
            <Button variant="link" className="p-0 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                {/* SVG path aquí */}
              </svg>
            </Button>
            <Button variant="link" className="p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                {/* SVG path aquí */}
              </svg>
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BioCard;