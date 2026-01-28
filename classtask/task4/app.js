const getSystemInfo = require('./systeminfo');
const logToFile = require('./logger');


setInterval(() => {
  const info = getSystemInfo();

  const logData = `
Timestamp: ${new Date().toISOString()}
CPU Count: ${info.cpuCount}
Free Memory: ${info.freeMemory}
Total Memory: ${info.totalMemory}
Platform: ${info.platform}
--------------------------
`;

  logToFile(logData);
  console.log('System info logged');

}, 5000);
