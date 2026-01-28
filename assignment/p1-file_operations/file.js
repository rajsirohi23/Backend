const fs = require("fs");

const path = require("path");


const filepath= path.resolve(__dirname);
const file = path.join(filepath, "unknown.txt");
console.log(filepath);


const fileoutput = path.resolve(__dirname);
const fileout = path.join(fileoutput, "output.txt");
console.log(fileout);


const data = fs.readFile(file,"utf8",(err,data) =>{
    if(err){
        console.log("error in reading file",err);
        return;
    }
    const words = data.split(/\s+/);
    const wordcount = words.length;
    const output = `word count : ${wordcount}`;
    
    fs.writeFile(fileout ,output, (err)=>{
        if(err){
            console.log("error in writing file",err);
            return;
        }
        console.log("words written in output.txt");
    });
});
