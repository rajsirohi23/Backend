const fs = require('fs');
const os = require('os');
const path = require('path');


const filepath = path.resolve(__dirname)
const file = path.join(filepath,"systemlogs.txt");

function systemlogsinfo(){
    const systeminfo = 
    `Time: ${new Date().toLocaleString()}\n
    Platform: ${os.platform()}\n
    CPU Cores: ${os.cpus().length}\n
    Total memory: ${os.totalmem()}\n`

    fs.appendFile(file, systeminfo, (err) => {
  if (err) throw err;
  console.log('The data is appended in file');
});
}

setInterval(systemlogsinfo, 5000)
console.log(systemlogsinfo)

