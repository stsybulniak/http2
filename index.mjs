import fs from 'node:fs';
import { H2Server } from './src/server.mjs';
import { Multiplexer } from './src/multiplexer.mjs';

const key = fs.readFileSync('localhost-privkey.pem');
const cert = fs.readFileSync('localhost-cert.pem');

const server = new H2Server({ ssl: { key, cert }, useWebSockets: true, allowHTTP1: true });
server.listen(3000, 'localhost');
const m = new Multiplexer(server, () => { console.log('callback!!!') })

// Command: '{"commandName": "getUsers", "payload": {"name": "Vasia"}}'

// curl --http2 -k -H "Command: '{\"commandName\": \"getUsers\", \"payload\": {\"name\": \"Vasia\"}}'" https://localhost:3000
// curl --http2 -k -H "Command:NOTIFY" -d 'A1636B65796376616C' -X POST https://localhost:3000