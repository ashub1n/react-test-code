import { useEffect, useState } from "react"
import UserList from "../../components/userList";

export const TeamsScreen = ({token}) => {
    const [users, setUsers] = useState();
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
                }).catch((e)=>console.log(e));
            }).catch((e)=>console.log(e));
            
        }
        
    },[]);

    return <div><h2>TeamList</h2><UserList users={users} /></div>
}


export default TeamsScreen;