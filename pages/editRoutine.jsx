import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';




const EditRoutine = () =>
{
    const [exercises, setExercises] = useState([]);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [description, setDescription] = useState('');
    const [routineName, setRoutineName] = useState('');

    const router = useRouter();

    const handleUpdateRoutine = async () =>
    {
        try
        {
            let id = localStorage.getItem('currRoutineId');
            await axios.patch(`http://localhost:3001/api/routines/${id}`, {
                name: routineName,
                description: description,
                username: localStorage.getItem('username'),
                exercises: routineExercises
            });

            router.push('/routines');
        } catch (error)
        {
            console.error('Error updating routine:', error);
        }
    };

    const getExercises = async () =>
    {
        try
        {
            const res = await axios.get(`http://localhost:3001/api/exercises/1`);
            setExercises(res.data);
        } catch (error)
        {
            console.error('Error fetching exercises:', error);
        }
    };


    useEffect(() =>
    {
        console.log('Updated routineExercises:', routineExercises);
        getExercises();
    }, [routineExercises]);

    const handleChange = (e, id) =>
    {
        const isChecked = e.target.checked;
        if (isChecked)
        {
            setRoutineExercises((prevExercises) => [...prevExercises, id]);
        } else
        {
            setRoutineExercises((prevExercises) =>
                prevExercises.filter((ex) => ex !== id)
            );
        }
    };



    return (
        <>
            <div>
                <label>
                    Routine name:
                    <input
                        type="text"
                        value={routineName}
                        onChange={(e) => setRoutineName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <br />
                <button onClick={handleUpdateRoutine}>Update Routine</button>
                <button onClick={() => router.push('/routines')}>Cancel</button>
            </div>
            <div className="routine-exercise-container">

                {exercises.length > 0 &&
                    exercises.map((exercise) => (
                        <div key={exercise._id} className="exercise-card">
                            <div style={{ border: 'solid', borderWidth: '1px', fontFamily: 'sans-serif' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h1 style={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>
                                        {exercise.name}
                                        <input
                                            type="checkbox"
                                            checked={routineExercises.includes(exercise._id)}
                                            onChange={(e) => handleChange(e, exercise._id)}
                                        />
                                    </h1>
                                </div>
                                <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                    <img
                                        src={exercise.image}
                                        height={'300px'}
                                        width={'300px'}
                                        alt="exercise"
                                        style={{ borderBottom: 'solid', borderBottomWidth: '1px' }}
                                    />
                                </div>
                                <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                    <p>{exercise.description}</p>
                                </div>
                                <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                    <a href={exercise.link}>Link</a>
                                </div>

                                <div style={{ border: 'solid', borderWidth: '1px', fontFamily: 'sans-serif' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>
                                            Difficulty:
                                            {exercise.difficulty}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <style jsx>{`
        .routine-card {
          border: 1px solid black;
          margin: 10px;
          padding: 10px;
        }
        .routine-exercise-container {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .exercise-card {
          margin-right: 10px;
        }
      `}</style>
        </>
    );
};

export default EditRoutine;
