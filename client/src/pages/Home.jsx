import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess('User LoggedOut');
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const fetchProducts = async () => {
    try {
      const url = "http://127.0.0.1:9000/products"
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers)
      const result = await response.json();
      console.log(result);
      setProducts(result)

    } catch (err) {
      handleError(err)
    }
  }

  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <div>
      {/* <img src="https://media.tenor.com/c4JRSv74FFgAAAAm/nurse-nursevo.webp" alt="" style={{width:'200px', height:'350px'}} /> */}
      <h1>Keya lene aaya hai idhar {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <div>

        {
          products.map((item, index) => (
            <ul key={index}>
              <span>{item.name}:{item.price}</span>
            </ul>
          ))}

      </div>

      <ToastContainer />
    </div>

  )
}

export default Home