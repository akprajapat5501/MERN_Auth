import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = ({setIsAuthenticated}) => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('loggedInUser');

    if (token && user) {
      setIsAuthenticated(true);

      // Only redirect from public pages to /home if user is authenticated
      if (['/', '/login', '/signup'].includes(location.pathname)) {
        navigate('/home', { replace: true });
      }
    } else {
      setIsAuthenticated(false);

      // Redirect from protected route to /login if not authenticated
      if (['/home'].includes(location.pathname)) {
        navigate('/login', { replace: true });
      }
    }
  }, [location.pathname, navigate, setIsAuthenticated]);

    // useEffect(()=>{
    //     if(localStorage.getItem('token')){
    //         setIsAuthenticated(true)
    //     }else if(location.pathname === '/' ||
    //         location.pathname === '/login' ||
    //         location.pathname === '/signup'
    //     ){
    //         navigate('/home', {replace: true});
    //     }
    // },[location.pathname, navigate, setIsAuthenticated])
  return (
    null
  )
}

export default RefreshHandler