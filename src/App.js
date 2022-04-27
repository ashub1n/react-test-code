import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import { getDefaultNormalizer } from '@testing-library/react';

function App() {
  const [email, setName] = useState('');
  const [password, setPass] = useState('');
  const [token, setToken] = useState('');
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState();
  useEffect( ()=>{
    if(token){
        fetch('http://localhost:8000/users',{
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then((response)=>{
           
          response.json().then((res)=>{
            setUsers(res.data);
            console.log(res.data);
          }).catch((e)=>console.log(e));
         
          
        }).catch((e)=>console.log(e));
       
    }
     
  },[token]);

  if(!token){
    return (
      <div className="form">
        
        <form onSubmit={async(event)=>{
          event.preventDefault();
        const response = await fetch('http://localhost:8000/login',{
          method: 'POST', // или 'PUT'
          body: JSON.stringify({email, password}), // данные могут быть 'строкой' или {объектом}!
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        setToken(json.auth.token);

        
        }}>
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
      </div>
    );
  }

  if (activeUser){


    return (
      <div className='users'>
          <div style={{
            textAlign: 'center',
            width: '100%'
          }} ><a onClick={()=>setActiveUser(null)} >Close</a></div>
          <div className='avatar'><img src={activeUser.avatar} alt={`${activeUser.firstName} ${activeUser.lastName}`} /></div>
          <div className='right'>
            <div className='name'>ID: {activeUser.id} </div>
            <div className='name'>Full name: {activeUser.firstName} {activeUser.lastName}</div>
            <div className='name'>Email: {activeUser.email} </div>
          </div>
      </div>
    )
  }

  return (
    <div className="form">
      {users.map((user)=> <div className='users'>
          <div className='avatar'><img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} /></div>
          <div className='right'>
            <div className='name'><a onClick={()=>setActiveUser(user)}> {user.firstName} {user.lastName}</a></div>
            <div className='name'>ID: {user.id} </div>
            
            <div className='name'>Email: {user.email} </div>
          </div>
      </div> )}
    </div>
  );

}

export default App;
