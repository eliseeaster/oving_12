import React, {useEffect, useState} from 'react';
import './index.jsx';

function UserInfo(){

    const [users, setUsers] = useState([]);

    async function loadJson() {

        const res = await fetch("/api/users");
        if (!res.ok) {
            throw new Error("Something went wrong")
        }
        const json = await res.json();
        setUsers(json)

    }
    useEffect(loadJson, []);

    return(
        <div>
            {users.map(user => (
                <h2>{user.name}</h2>
            ))}
        </div>
    )
}

export default UserInfo;