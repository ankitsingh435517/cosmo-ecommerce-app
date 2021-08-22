import React,{ useEffect } from 'react';
import { SingleOrder } from '..';
import { useHistory } from 'react-router-dom';


const AdminSingleOrder = () => {
  const history = useHistory();

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    if(userData.role !== 'admin'){
        history.goBack();
        return;
    }
  },[])
    return (
        <>
          <SingleOrder />  
        </>
    )
}

export default AdminSingleOrder
