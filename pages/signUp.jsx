import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const Signup = () =>
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const router = useRouter();

    const handleSignUp = async () =>
    {
        try
        {
            const response = await axios.post('http://localhost:3001/api/user/signup', { name: username, password, avatar });
            if (response.data != "User already exists")
            {
                console.log("Signup successful");
                router.push('/login');
            }
            else
            {
                alert("User already exists, please login or try a different username");
            }

        } catch (error)
        {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
            />
            <br />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default Signup;
