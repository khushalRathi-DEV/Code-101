import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFetchposts } from './hooks/useFetch'
import { useTimer } from './hooks/useTimer'

function App() {
  const posts = useFetchposts();
  const timer = useTimer();
  return (
    <div>
      {posts.length > 0 && (
        <>
          <h1>{posts[timer].name}</h1>
          <p>{posts[timer].body}</p>
        </>
      )}
    </div>
  )
}

export default App
