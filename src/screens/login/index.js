import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { TokenContext } from "../../utils";
const LoginPage = () => {
    const [email, setName] = useState('');
    const [password, setPass] = useState('');
    const { setAuthenticated } = useContext(TokenContext);
    const history = useNavigate();
  
    const submitHandler = async (event)=>{
        event.preventDefault();
        const response = await fetch('http://localhost:8000/login',{
            method: 'POST', // или 'PUT'
            body: JSON.stringify({email, password}), // данные могут быть 'строкой' или {объектом}!
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        setAuthenticated(json.auth.token);
        localStorage.setItem('token',json.auth.token);
        history("/team");
    }

    return (<div className="form">
                
            <form onSubmit={submitHandler}>
            <div className="input-container"  >
                <label>Username</label>
                <input type="text" name="uname" onChange={(event)=>{
                setName(event.target.value)
                }} required />          
            </div>
            <div className="input-container">
                <label>Password</label>
                <input type="password" name="pass" onChange={(event)=>{setPass(event.target.value)}} required />        
            </div>
            <div className="button-container">
                <input type="submit" />
            </div>
            </form> 
        </div>)
    ;
}

export default LoginPage;