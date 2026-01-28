const http = require('http');
const url = require('url');


const server = http.createServer((req, res) => {

  
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  
  if (req.method === 'GET') {

    switch (path) {

      
      case '/':
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Home Page');
        break;

      
      case '/about':
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page</h1><p>This is a simple HTML response</p>');
        break;

      
      case '/user':
        const { name, age } = parsedUrl.query;

        const userData = {
          name: name || 'Unknown',
          age: age || 'Not provided'
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userData));
        break;

      
      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found');
    }

  } else {
    
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});


server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
