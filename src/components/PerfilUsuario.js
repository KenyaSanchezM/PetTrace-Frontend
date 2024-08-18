import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PerfilUsuario = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        // Obtener el token de autenticación desde el almacenamiento local
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8000/api/perfil_usuario/', {
          headers: {
            'Authorization': `Token ${token}`  // O `Bearer ${token}` si usas JWT
          }
        });

        setPerfil(response.data);
      } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error);
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!perfil) return <div>No se encontró el perfil</div>;

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <p>Nombre de usuario: {perfil.username}</p>
      <p>Email: {perfil.email}</p>
      {/* Añadir más campos según sea necesario */}
    </div>
  );
};

export default PerfilUsuario;
  