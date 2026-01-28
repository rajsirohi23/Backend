const http = require('http');
const fs = require('fs');
const url = require('url');


let students = [
  { id: 1, name: "Amit", branch: "CSE" },
  { id: 2, name: "Neha", branch: "IT" }
];


function logRequest(req, message) {
  const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${message}\n`;
  fs.appendFile('log.txt', log, () => {});
}


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  
  if (method === 'GET' && path === '/students') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(students));
    logRequest(req, 'Returned all students');
  }

  
  else if (method === 'GET' && path.startsWith('/students/')) {
    const id = parseInt(path.split('/')[2]);
    const student = students.find(s => s.id === id);

    if (student) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(student));
      logRequest(req, 'Returned single student');
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Student not found' }));
      logRequest(req, 'Student not found');
    }
  }

  
  else if (method === 'POST' && path === '/students') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const newStudent = JSON.parse(body);
      newStudent.id = students.length + 1;
      students.push(newStudent);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newStudent));
      logRequest(req, 'Student added');
    });
  }

  
  else if (method === 'DELETE' && path.startsWith('/students/')) {
    const id = parseInt(path.split('/')[2]);
    const index = students.findIndex(s => s.id === id);

    if (index !== -1) {
      students.splice(index, 1);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Student deleted' }));
      logRequest(req, 'Student deleted');
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Student not found' }));
      logRequest(req, 'Delete failed');
    }
  }


  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
    logRequest(req, 'Invalid route');
  }
});


server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
