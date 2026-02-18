const fs = require("fs");

const command = process.argv[2];
const content = process.argv[4];


const path = require("path");
const filepath = path.join(__dirname, "file.txt");
const destpath = path.join(__dirname, "copied.txt");

if(command ==="read"){
    fs.readFile(filepath,"utf-8",(err,data)=>{
        if(err){
            console.log("error",err);
            return;
        }
        else{
            console.log("content readed successfully",data);
        }
    })
}
else if(command==="write"){

    fs.writeFile(filepath,"welcome to gla university",(err,data)=>{
        if(err){
            console.log("error",err);
            return;
        }
        else{
            console.log("content written successfully",data);
        }
    })

}

else if(command==="append"){

    fs.appendFile(filepath, `${Date.now()} : today's date`, (err,data)=>{
        if(err){
            console.log("error in appending data",err);
        }
        else{
            console.log("appended successfully",data);
        }
    })
}

else if (command === "copy") {
  const destination = process.argv[4];
  fs.copyFile(filepath, destpath, (err) => {
    if (err) {
      console.error("Error:", err.message);
      return;
    }
    console.log("File copied successfully");
  });
}

else if(command==="delete"){
    fs.unlink(filepath,(err)=>{
        if(err){
            console.log("error in file deletion");
        }
        else{
            console.log("file deleted successfully");
        }
    })
}

else if (command === "list") {
  fs.readdir(filepath, (err,files) => {
    if (err) {
      console.error("Error:", err.message);
      return;
    }
   files.forEach(file => console.log(file));
  });
}
else{
    console.log("invalid command");
}
