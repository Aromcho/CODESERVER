import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import MyItemList from '../MyItemList/MyItemList.jsx';
import './UserProductList.css';

const UserProductList = () => {
  const { userId } = useContext(CartContext);  // Obtenemos el userId del contexto
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    try {
      let url = `/api/product/paginate?limit=15&page=${page}&user_id=${userId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data.response);
      setNextPage(data.info.nextPage);
      setPrevPage(data.info.prevPage);
      setTotalPages(Math.ceil(data.info.total / 15));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProducts();
    }
  }, [userId, page]);

  if (loading) {
    return <p className="text-center">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center">No has subido ningún producto.</p>;
  }

  return (
    <MyItemList
      setPage={setPage}
      page={page}
      totalPages={totalPages}
      prevPage={prevPage}
      nextPage={nextPage}
      products={products}
    />
  );
};

export default UserProductList;
