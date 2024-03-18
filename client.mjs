import http2 from 'node:http2';
import fs from 'node:fs';
import { Decoder as CBORDecorder, Encoder as CBOREncoder } from "cbor";

const client = http2.connect('https://localhost:3000', {
    ca: fs.readFileSync('localhost-cert.pem'),
});

client.on('error', (err) => console.error(err));

const buffer = Buffer.from(CBOREncoder.encode('{"key": "value"}'));
const d = CBOREncoder.encode('{"key": "value"}');

const req = client.request({
    [http2.constants.HTTP2_HEADER_SCHEME]: "https",
    [http2.constants.HTTP2_HEADER_METHOD]: http2.constants.HTTP2_METHOD_POST,
    [http2.constants.HTTP2_HEADER_PATH]: `/`,
    "Content-Type": "application/json",
    "Content-Length": d.length,
    Command: 'NOTIFY'
});

// const req = client.request({ 'Command': 'NOTIFY' });
// req.emit(JSON.stringify({hello: "world!"}))
// https://stackoverflow.com/questions/48491814/sending-http-2-post-request-nodejs
req.setEncoding('utf8');
req.write(d);


req.on('response', (headers, flags) => {
    for (const name in headers) {
        console.log(`${name}: ${headers[name]}`);
    }
});

req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => {
    data += chunk;
});
req.on('end', () => {
    console.log(`\n${data}`);
    client.close();
});
req.end();