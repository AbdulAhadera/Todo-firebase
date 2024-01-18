import React from 'react'
import Navbar from '../Navbar'
import TodoApp from '../todo'
function Home() {
  return (
    <>
    <Navbar />
    <div>
      <TodoApp />
    </div>
    </>
  )
}

export default Home