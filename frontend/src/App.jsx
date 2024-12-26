import { useState } from 'react'
import './App.css'

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/shorten`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ url: originalUrl })
      });

      const data = await response.json();
      setShortUrl(`${import.meta.env.VITE_API_URL}/shorten/${data.shortCode}`);
    } catch (err) {
      console.error('Error creating shortener URL:', err);
    }
  }

  return (
    <div className='App'>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="url" 
        placeholder='Enter a URL'
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type='submit'>Shorten</button>
      </form>
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl} target='_blank' rel='noopener noreferrer'>{shortUrl}</a>
        </div>
      )}
    </div>
  )
}

export default App
