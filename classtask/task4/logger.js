const fs = require('fs');
const path = require('path');


const logFilePath = path.join(__dirname, 'system-log.txt');

function logToFile(data) {
  fs.appendFile(logFilePath, data, (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });
}

module.exports = logToFile;
