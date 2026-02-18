const fs = require("fs");
const readline = require("readline");

let totallines = 0;
let errorcount = 0;
let warningcount= 0;
let infocount = 0;



const read = fs.createReadStream("server.log",{
    encoding: "utf-8"
})

const r1 = readline.createInterface({
    input:fs.ReadStream,
    crlfDelay : Infinity
});

r1.on("line",(line)=>{
    totallines++;

    if(line.includes("ERROR")) errorcount++;
    else if(line.includes("WARNING")) warningcount++;
    else if(line.includes("INFO")) info++;
});

rq.on("close",()=>{
    `Total lines = ${totallines}
    error counts = ${errorcount}
    warning counts = ${warningcount}
    info count = ${infocount}`;

    fs.writeFile("summary.txt",summary,(err)=>{
        if(err){
            console.log("error writing summary");
            return;
        }
        else{
            console.log("summary written successfully");
        }
    });
});
