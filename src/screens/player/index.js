import { useEffect, useState } from "react"
import UserCard from "../../components/userCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const PlayerScreen = ({token}) => {
    const [user, setUser] = useState();
    let params = useParams();
    const history = useNavigate();
    useEffect( ()=>{
        if(token){
            fetch(`http://localhost:8000/users/${params.playerId}`,{
                method: 'GET', 
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            }).then((response)=>{
                
                response.json().then((res)=>{
                    setUser(res.data); 
                }).catch((e)=>console.log(e));
            }).catch((e)=>console.log(e));
            
        }
        
    },[]);

    return <div><h2>Player</h2> {user && <UserCard activeUser={user}
    key={`usersa`}
    isList={false}
    setActiveUser={() => history('/team/')} 
    />}
        </div>
}


export default PlayerScreen;