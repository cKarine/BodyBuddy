import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const AddExercise = () =>
{
    const router = useRouter();

    const [exercise, setExercise] = useState({
        name: '',
        description: '',
        image: '',
        link: '',
        difficulty: 0
    });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setExercise(prevExercise => ({
            ...prevExercise,
            [name]: value
        }));
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try
        {
            await axios.post('http://localhost:3001/api/exercises', exercise);


            setExercise({
                name: '',
                description: '',
                image: '',
                link: '',
                difficulty: 0
            });

            router.push('/exercises');
        } catch (error)
        {
            console.error('Error adding exercise:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={exercise.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Description:
                <textarea name="description" value={exercise.description} onChange={handleChange} />
            </label>
            <br />
            <label>
                Image:
                <input type="text" name="image" value={exercise.image} onChange={handleChange} />
            </label>
            <br />
            <label>
                Video Link:
                <input type="text" name="link" value={exercise.link} onChange={handleChange} />
            </label>
            <br />
            <label>
                Difficulty:
                <select name="difficulty" value={exercise.difficulty} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <button type="submit">Add Exercise</button>
        </form>
    );
};

export default AddExercise;
