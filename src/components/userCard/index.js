const userCard = function ({activeUser, setActiveUser, isList=true}){
    const divStyle = {
        textAlign: 'center',
        width: '100%'
    };

   // eslint-disable-next-line
    return (
        <div className='users'>
            {!isList && <div style={divStyle} >  
                <button onClick={()=>setActiveUser(null)} >Close</button>
            </div>}
            <div className='avatar'><img src={activeUser.avatar} alt={`${activeUser.firstName} ${activeUser.lastName}`} /></div>
            <div className='right'>
                <div className='name'>ID: {activeUser.id} </div>
                
                {isList ? 
                    <div className='name'><button onClick={()=>setActiveUser(activeUser)}> {activeUser.firstName} {activeUser.lastName}</button></div> : 
                    <div className='name'>Full name: {activeUser.firstName} {activeUser.lastName}</div>
                }
                <div className='name'>Email: {activeUser.email} </div>
            </div>
        </div>
    );
}


export default userCard;