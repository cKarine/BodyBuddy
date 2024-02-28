import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function UserSettingsPage()
{
    const [newUserName, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);

    const handleUsernameChange = async () =>
    {
        try
        {
            if (newUserName !== '')
            {
                await axios.patch(`http://localhost:3001/api/user/name/${username}`, { name: newUserName });
                setUsername(newUserName);
                localStorage.setItem('username', newUserName);
                setIsEditing(false);
                window.location.reload(false);
            }
        } catch (error)
        {
            console.error('Error changing username:', error);
        }
    };

    const handleChangePassword = async () =>
    {
        try
        {
            if (newPassword !== '')
            {
                await axios.patch(`http://localhost:3001/api/user/password/${username}`, { password: newPassword });
                setPassword(newPassword);
                setIsEditingPassword(false);
            }
        } catch (error)
        {
            console.error('Error changing password:', error);
        }
    };

    const handleChangeAvatar = async () =>
    {
        try
        {
            if (newAvatar !== '')
            {
                await axios.patch(`http://localhost:3001/api/user/avatar/${username}`, { avatar: newAvatar });
                setAvatar(newAvatar);
                setIsEditingAvatar(false);
            }
        } catch (error)
        {
            console.error('Error changing avatar:', error);
        }
    };

    const handleEditClick = (type) =>
    {
        if (type === 'username')
        {
            setIsEditing(true);
        } else if (type === 'password')
        {
            setIsEditingPassword(true);
        } else if (type === 'avatar')
        {
            setIsEditingAvatar(true);
        }
    };

    const handleCancelEdit = (type) =>
    {
        if (type === 'username')
        {
            setIsEditing(false);
            setNewUsername(username);
        } else if (type === 'password')
        {
            setIsEditingPassword(false);
            setNewPassword(password);
        } else if (type === 'avatar')
        {
            setIsEditingAvatar(false);
            setNewAvatar(avatar);
        }
    };

    useEffect(() =>
    {
        const currUser = localStorage.getItem('username');
        setUsername(currUser);
        setAvatar(localStorage.getItem('avatar'));
    }, []);

    return (
        <div>
            <h1>HELLO, {username}!</h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h2>Avatar:</h2>
                {isEditingAvatar ? (
                    <>
                        <input
                            type="text"
                            placeholder="New Avatar URL"
                            value={newAvatar}
                            onChange={(e) => setNewAvatar(e.target.value)}
                        />
                        <button onClick={() => handleChangeAvatar('avatar')}>Save</button>
                        <button onClick={() => handleCancelEdit('avatar')}>Cancel</button>
                    </>
                ) : (
                    <>
                        <img src={avatar} alt="avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                        <button onClick={() => handleEditClick('avatar')}>Edit</button>
                    </>
                )}
            </div>
            <div>
                <h2>
                    Username:{' '}
                    {isEditing ? (
                        <>
                            <input type="text" onChange={(e) => setNewUsername(e.target.value)} />
                            <button onClick={() => handleUsernameChange('username')}>Save</button>
                            <button onClick={() => handleCancelEdit('username')}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={() => handleEditClick('username')}>Edit</button>
                    )}
                </h2>
            </div>
            <div>
                <h2>
                    Password:{' '}
                    {isEditingPassword ? (
                        <>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button onClick={() => handleChangePassword('password')}>Save</button>
                            <button onClick={() => handleCancelEdit('password')}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={() => handleEditClick('password')}>Edit</button>
                    )}
                </h2>
            </div>
        </div>
    );
}

export default UserSettingsPage;
