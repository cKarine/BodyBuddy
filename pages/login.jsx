
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { set } from 'mongoose';


const Login = () =>
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleUsernameChange = (e) =>
    {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) =>
    {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try
        {
            const res = await axios.get(`http://localhost:3001/api/user/login/${username}/${password}`);


            if (res && res.data)
            {
                localStorage.setItem('username', username);
                console.log("Avatar:", res.data.avatar);
                localStorage.setItem('avatar', res.data.avatar);
                localStorage.setItem('loggedIn', true);

                setUsername(username);
                setPassword(password);
                router.push('/routines');
            } else
            {
                alert("Username or password is incorrect. Please sign up or try again.");
            }
        } catch (error)
        {
            console.error("Error during login:", error);
        }

        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
