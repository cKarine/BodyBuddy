import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ExercisesLayout = ({ exercise, setExercises }) =>
{
    const [exerciseData, setExerciseData] = useState(exercise);
    const { _id, name, description, image, link, difficulty } = exerciseData;
    const [editMode, setEditMode] = useState(false);
    const router = useRouter();

    const deleteExercise = async () =>
    {
        try
        {
            await axios.delete(`http://localhost:3001/api/exercises/${_id}`);
            setExercises((prev) => prev.filter((ex) => ex._id !== _id));
        } catch (error)
        {
            console.error('Error deleting exercise: ', error);
        }
    };

    const handleEditClick = () =>
    {
        setEditMode(true);
    };

    const handleCancelEdit = () =>
    {
        setEditMode(false);
        setExerciseData(exercise);
    };

    const handleSaveEdit = async () =>
    {
        try
        {
            await axios.patch(`http://localhost:3001/api/exercises/${_id}`, exerciseData);
            setExercises((prev) =>
                prev.map((ex) => (ex._id === _id ? { ...ex, ...exerciseData } : ex))
            );
            setEditMode(false);
        } catch (error)
        {
            console.error('Error updating exercise: ', error);
        }
    };

    return (
        <>
            <div style={{ border: 'solid', borderWidth: '1px', fontFamily: 'sans-serif' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>
                        {editMode ? (
                            <>
                                <label style={{ marginRight: '5px' }} key="editNameLabel">
                                    Name:{' '}
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setExerciseData({ ...exerciseData, name: e.target.value })}
                                    key="editNameInput"
                                />
                            </>
                        ) : (
                            <>{name}</>
                        )}
                        {editMode ? (
                            <>
                                <button onClick={handleSaveEdit} key="saveButton">
                                    save
                                </button>
                                <button onClick={handleCancelEdit} key="cancelButton">
                                    cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={handleEditClick} key="editButton">
                                edit
                            </button>
                        )}
                        <button onClick={deleteExercise} key="deleteButton">
                            delete
                        </button>
                    </h1>
                </div>

                <div>
                    {editMode ? (
                        <>
                            <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                <label style={{ marginRight: '5px' }} key="editImageLabel">
                                    Image URL:{' '}
                                </label>
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setExerciseData({ ...exerciseData, image: e.target.value })}
                                    key="editImageInput"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                <img
                                    src={image}
                                    height={"300px"}
                                    width={"300px"}
                                    alt="exercise"
                                    style={{ borderBottom: "solid", borderBottomWidth: "1px" }}
                                />
                            </div>
                        </>
                    )}

                    {editMode ? (
                        <>
                            <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                <label style={{ marginRight: '5px' }} key="editDescriptionLabel">
                                    Description:{' '}
                                </label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setExerciseData({ ...exerciseData, description: e.target.value })}
                                    key="editDescriptionInput"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                <p>{description}</p>
                            </div>
                        </>
                    )}

                    {editMode ? (
                        <>
                            <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                <label style={{ marginRight: '5px' }} key="editLinkLabel">
                                    Video Link:{' '}
                                </label>
                                <input
                                    type="text"
                                    value={link}
                                    onChange={(e) => setExerciseData({ ...exerciseData, link: e.target.value })}
                                    key="editLinkInput"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                <a href={link}>video</a>
                            </div>
                        </>
                    )}

                    {editMode ? (
                        <>
                            <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                <label>
                                    Difficulty:
                                    <select value={difficulty} onChange={(e) => setExerciseData({ ...exerciseData, difficulty: e.target.value })}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </label>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ borderBottom: 'solid', borderBottomWidth: '1px', padding: '10px' }}>
                                <p>Difficulty: {difficulty}</p>
                            </div>
                        </>
                    )

                    }
                </div>
            </div>
        </>
    );
};

export default ExercisesLayout;
