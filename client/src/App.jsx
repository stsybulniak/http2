import { createRef } from 'react'
import './App.css'
import axios from 'axios'
import { Encoder } from 'cbor';

const url = 'https://localhost:3000';

function App() {
  const commandRef = createRef();
  const bodyRef = createRef();

  const handleClick = () => {
    console.log(commandRef.current.value)
    console.log(bodyRef.current.value)
    const Command = commandRef.current.value;
    const body = bodyRef.current.value;
    console.log(Encoder.encode(JSON.parse(body)))

    const req = axios.post(url, Encoder.encode(JSON.parse(body)), { headers: { Command } });
  }

  return (
    <>
      <div className="container">
        <div><label>Command</label><input ref={commandRef} name='command' defaultValue="NOTIFY" /></div>
        <div><label>Body</label><input ref={bodyRef} name='body' defaultValue='{"key":"value"}' /></div>
        <button type='button' onClick={handleClick}>Send</button>
      </div>
    </>
  )
}

export default App
