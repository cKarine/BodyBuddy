import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const RoutinesLayout = ({ routine, setRoutines }) =>
{
    const [routineData, setRoutineData] = useState(routine);
    const { _id, name, description } = routineData;
    const [exercises, setExercises] = useState([]);
    const router = useRouter();

    useEffect(() =>
    {
        const getExercisesForRoutine = async () =>
        {
            try
            {
                const res = await axios.get(`http://localhost:3001/api/routines/exercises/${_id}`);
                setExercises(res.data);
                console.log("exercises: ", res.data);
            } catch (error)
            {
                console.error("Error fetching exercises for routine:", error);
            }
        };

        getExercisesForRoutine();
    }, [_id]);

    const deleteRoutine = async () =>
    {
        try
        {
            await axios.delete(`http://localhost:3001/api/routines/${_id}`);
            setRoutines((prev) => prev.filter((ex) => ex._id !== _id));
        } catch (error)
        {
            console.error("Error deleting routine: ", error);
        }
    };

    return (
        <>
            <div className="routine-card">
                <h2>{name}</h2>
                <p>{description}</p>

                <button
                    onClick={() =>
                    {
                        localStorage.setItem('currRoutineId', _id);
                        router.push(`/editRoutine`);
                    }}
                >
                    edit
                </button>

                <button onClick={deleteRoutine}>delete</button>
            </div>

            <div className="routine-exercise-container">
                {exercises.length > 0 &&
                    exercises.map((exercise) => (
                        <div className="exercise-card">
                            <div style={{ border: "solid", borderWidth: "1px", fontFamily: "sans-serif" }}>
                                <div style={{ textAlign: "center" }}>
                                    <h1 style={{ borderBottom: "solid", borderBottomWidth: "1px" }}>
                                        {exercise.exercisesFull.length > 0 && exercise.exercisesFull[0].name}
                                    </h1>
                                </div>
                                <div style={{ borderBottom: "solid", borderBottomWidth: "1px", padding: "10px" }}>
                                    <img
                                        src={exercise.exercisesFull.length > 0 && exercise.exercisesFull[0].image}
                                        height={"300px"}
                                        width={"300px"}
                                        alt="exercise"
                                        style={{ borderBottom: "solid", borderBottomWidth: "1px" }}
                                    />
                                </div>
                                <div style={{ borderBottom: "solid", borderBottomWidth: "1px", padding: "10px" }}>
                                    <p>{exercise.exercisesFull.length > 0 && exercise.exercisesFull[0].description}</p>
                                </div>
                                <div style={{ borderBottom: "solid", borderBottomWidth: "1px", padding: "10px" }}>
                                    <a href={exercise.exercisesFull.length > 0 && exercise.exercisesFull[0].link}>Link</a>
                                </div>
                                <div style={{ border: "solid", borderWidth: "1px", fontFamily: "sans-serif" }}>
                                    <div style={{ textAlign: "center" }}>
                                        <p style={{ borderBottom: "solid", borderBottomWidth: "1px" }}>
                                            Difficulty:
                                            {exercise.exercisesFull.length > 0 && exercise.exercisesFull[0].difficulty}
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

export default RoutinesLayout;
