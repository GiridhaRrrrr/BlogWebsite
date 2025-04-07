// this component is used to prodect routes its like container where user if logged in only can enter the routes
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {// filenameand function name can be different 

    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [loding, setloading] = useState(true);

    useEffect(() => { //understand it on your own 
        //will understand better during the routing part
        if(authentication && authentication !== authStatus){
            navigate('/login')
        }
        else if(!authentication && authentication !== authStatus){
            navigate('/')
        }

        setloading(false);
    }, [authStatus, navigate, authentication])
    

  return loding ? <p>Loading...</p> : {children}
}

