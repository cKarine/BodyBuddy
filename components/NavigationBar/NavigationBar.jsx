
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { set } from 'mongoose';


const NavigationBar = () =>
{
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() =>
    {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        setLoggedIn(isLoggedIn);
        setUsername(localStorage.getItem('username'));
        setAvatar(localStorage.getItem('avatar'));

    }, [router.asPath]);

    const handleLogout = async () =>
    {
        try
        {
            localStorage.removeItem('username');
            localStorage.removeItem('avatar');
            localStorage.setItem('loggedIn', false);
            setLoggedIn(false);
            router.push('/');
        } catch (error)
        {
            console.error(error);
        }
    };


    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
                <div style={{ borderRight: "1px solid #ccc", justifyContent: "center" }} >
                    <img src={"/react logo.png"} alt="logo" style={{ height: "50px", objectFit: "contain" }} />
                </div>
                <div style={{ borderRight: "1px solid #ccc", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "60px" }}>
                        <img hidden={!loggedIn} src={avatar} alt="avatar" style={{ height: "50px", width: "50px", objectFit: "contain", borderRadius: "50%" }} />
                    </div>
                    {<a href="../user"><p>{username}</p></a>}
                </div>

                <div style={{ borderRight: "1px solid #ccc", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <a href="../routines"><p>ROUTINES</p></a>
                </div>
                <div style={{ borderRight: "1px solid #ccc", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <a href="/exercises"><p>EXERCISES</p></a>
                </div>
                <div style={{ borderRight: "1px solid #ccc", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <a href="../stats"><p>STATS</p></a>
                </div>


                {(
                    <div style={{ borderRight: "1px solid #ccc", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <a href="#" hidden={!loggedIn} onClick={handleLogout}><p>LOGOUT</p></a>
                    </div>
                )}
            </div>

            <div style={{ borderBottom: "1px solid #ccc" }} className="flex justify-between items-center py-4" />
        </>
    );
}

export default NavigationBar;
