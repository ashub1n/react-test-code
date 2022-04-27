import UserCard from '../userCard'; 
import { useNavigate } from "react-router-dom";
const UserList = ({users})=> {
    const history = useNavigate();
    return (
        <div className="form">
            {users && users.map((user, i)=> <UserCard activeUser={user}
            key={`users_${i}`} setActiveUser={
                (user) =>{
                    history('/team/'+user.id)
                }
                } />
                )}
        </div>)
}
;

export default UserList;