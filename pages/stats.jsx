import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';



const StatsPage = () =>
{
    const [hardestRoutine, setHardestRoutine] = useState([]);

    const getHardestRoutine = async () =>
    {
        try
        {
            const res = await axios.get(`http://localhost:3001/api/routines/`);

            setHardestRoutine(res.data[0].name);
        } catch (error)
        {
            console.error('Error fetching exercises:', error);
        }
    }

    useEffect(() =>
    {
        getHardestRoutine();
    }, []);

    return (
        <div>
            <h1>Stats Page</h1>
            <p>hardest routine: {hardestRoutine}</p>
        </div>
    );
};

export default StatsPage;
