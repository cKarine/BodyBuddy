import React, { useState, useEffect } from "react";
import axios from "axios";
import RoutinesLayout from "../components/routinesLayout";
import { useRouter } from "next/router";

const Routines = () =>
{
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);

    const getRoutines = async () =>
    {
        try
        {
            setLoading(true);
            const currUser = localStorage.getItem("username");
            const res = await axios.get(`http://localhost:3001/api/user/routines/${currUser}`);
            console.log(res.data);
            setRoutines(res.data);
            setLoading(false);
        } catch (error)
        {
            console.error("Error fetching routines:", error);
        }
    };

    useEffect(() =>
    {
        getRoutines();
        setLoggedIn(localStorage.getItem('loggedIn'));
        console.log("loggedIn storage: ", localStorage.getItem('loggedIn'));
        setLoggedIn(localStorage.getItem('loggedIn') === 'true');
        console.log("loggedIn: ", loggedIn);
    }, []);


    return (
        <>
            {loggedIn == true ? (
                <>
                    <div>
                        <h1>Routines</h1>
                        <button onClick={() => router.push("/addRoutine")}>Add Routine</button>
                    </div>
                    <div className="routine-container">
                        {routines.map((routine) => (

                            <RoutinesLayout key={routine._id} routine={routine} setRoutines={setRoutines} />
                        ))}
                    </div>
                </>
            ) : (
                <p>
                    Please log in or sign up to view this page <br />
                    <button onClick={() => router.push("/login")}>Login</button>
                    <button onClick={() => router.push("/signUp")}>Sign up</button>
                </p>
            )}
        </>
    );
};

export default Routines;
