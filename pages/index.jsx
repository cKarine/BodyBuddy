
import router from 'next/router';
import React from 'react';



export default function IndexPage()
{
  return (
    <div>
      <h1>BodyBuddy - workout routine manager</h1>

      <p> Welcome to BodyBuddy! This is a workout routine manager that allows you to create, edit, and delete workout routines.
        <br /> You can also add, edit, and delete exercises to your routines. </p>

      <p> lets get started!</p>

      <button onClick={() => router.push("/login")}>Login</button>
      <button onClick={() => router.push("/signUp")}>Sign up</button>
    </div>
  )
}