import React, { useState, useEffect } from "react";
import axios from "axios";
import ExercisesLayout from "../components/ExercisesLayout";
import { useRouter } from "next/router";





const Exercises = () =>
{
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);


    const getExercises = async () =>
    {
        try
        {
            setLoading(true);

            const res = await axios.get("http://localhost:3001/api/exercises/1");
            setExercises(res.data);

            setLoading(false);
        } catch (error)
        {
            console.error('Error fetching exercises:', error);
        }
    }
    useEffect(() =>
    {
        getExercises();
    }, []);

    const router = useRouter();
    return (
        <>
            <div>
                <h1>Exercises</h1>
                <button onClick={() => router.push("/addExercise")}>add exercise</button>
            </div>
            <div className="exercise-container">
                {
                    exercises.map((exercise) =>
                    (
                        <ExercisesLayout
                            key={exercise._id}
                            exercise={exercise}
                            setExercises={setExercises}
                        />
                    ))
                }


            </div>

            <style jsx>{`
        .exercise-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 10px;
        }
        .exercise-item {
          width: 100%;
        }
        
      `}</style>
        </>
    );
};

export default Exercises;
