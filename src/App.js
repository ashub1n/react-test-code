 
import './App.css';
import {useEffect, useState} from 'react';
//import UserCard from './components/userCard';  
import LoginPage from './screens/login';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link
} from "react-router-dom";
import { TokenContext } from './utils';
import TeamsScreen from './screens/team';
import PlayerScreen from './screens/player';
// function App() {

//   const [token, setToken] = useState('');
//   const [users, setUsers] = useState([]);
//   const [activeUser, setActiveUser] = useState();

//   

//   if(!token){
//     return (
//       <div className="form">
        
//         <form onSubmit={async(event)=>{
//           event.preventDefault();
//           const response = await fetch('http://localhost:8000/login',{
//             method: 'POST', // или 'PUT'
//             body: JSON.stringify({email, password}), // данные могут быть 'строкой' или {объектом}!
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
//           const json = await response.json();
//           setToken(json.auth.token);
//         }}>
//           <div className="input-container"  >
//             <label>Username</label>
//             <input type="text" name="uname" onChange={(event)=>{
//               setName(event.target.value)
//             }} required />
            
//           </div>
//           <div className="input-container">
//             <label>Password</label>
//             <input type="password" name="pass" onChange={(event)=>{setPass(event.target.value)}} required />
          
//           </div>
//           <div className="button-container">
//             <input type="submit" />
//           </div>
//         </form> 
//       </div>
//     );
//   }

//   if (activeUser){
//     return (
//       <UserCard activeUser={activeUser} key={`auser`} isList={false} setActiveUser={setActiveUser} />
//     )
//   }

//   return (
//     <div className="form">
//       {users.map((user, i)=> <UserCard activeUser={user} key={`users_${i}`} setActiveUser={setActiveUser} />)}
//     </div>
//   );

// }

export const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(()=>{
    let token = localStorage.getItem('token');
    setAuthenticated(token);
  },[])
  console.log(authenticated);
  return (
    <TokenContext.Provider value={{ authenticated, setAuthenticated }}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LoginPage />}/>
          <Route index path="login" element={<LoginPage />}/>
          {authenticated &&
            <Route path="team" element={<Teams token={authenticated} />}>
              <Route path=":playerId" element={<PlayerScreen token={authenticated}  />}/>
              <Route path="new" element={<NewTeamForm  token={authenticated}/>}/>
              <Route index element={<TeamsScreen  token={authenticated}/>} />
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  )
};

const Teams = () => <div>
  <h1>Welcome to team!</h1>
  <nav>
    <Link to="/team">Team </Link> 
    <Link to="new">New</Link>   
  </nav>
  <div className="content">
    <Outlet />
  </div>
</div>;



 

const NewTeamForm = () => <h2>NewTeamForm</h2>;
const LeagueStandings = () => <h2>LeagueStandings</h2>;

const Home = () => <h2>Home</h2>;
const Main = () => <h2>Main</h2>;

export default App;
