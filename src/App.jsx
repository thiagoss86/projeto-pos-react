import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieForm from './components/MovieForm'
import MovieTable from './components/MovieTable'

function App() {

  return (
    <div className="container">
      <header className='header'>
        <h1>Catálogo de Filmes</h1>
        <div className='header-actions'>
          <button className='ghost' onClick={() => clearMovies()}>Limpar Tudo</button>
          <a className='link' href='https://github.com/' target='_blank' rel='noreferrer'>
            GitHub do Projeto
          </a>
        </div>
      </header>

      <MovieForm 
        onCreate={createMovie}
        onUpdate={updateMovie}
        editingMovie={editingMovie}
        onCancelEdit={handleCancelEdit}
      />

      <MovieTable 
        movies = {movies}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <footer className='footer'>
        Feito com React + Vue por Thiago Santos
      </footer>
    </div>
  )
}

export default App
