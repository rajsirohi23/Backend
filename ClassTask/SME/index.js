const express = require("express");

const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// REST API -->

// (i) get method -->

app.get("/users" , (req , res) => {
    res.json(users);
})

app.get("/api/users" , (req , res) => {
    res.json(users);
})


app.get("/api/users/:id" ,(req,res)=>{
    const id= req.params.id;
    const user = users.find((u)=>u.id==id);
    return res.json(user);
})

app.get("/users", (req , res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li> ${user.first_name} ${user.last_name}</li>`).join("")}
    </ul>`

    res.send(html)
})


app.post("/api/users", (req,res) => {
    // TODO : create a new user
    const {first_name , last_name , email , gender , job_title}= req.body;
    const newUser = {
        id: users.length+1,
        first_name,
        last_name,
        email,
        gender,
        job_title,
    };

    users.push(newUser);

    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users, null , 2), () => {
        res.status(201).json({
            message: "user created sucessfully",
            user:newUser,

        });
    });
});

app.patch("/api/users/:id", (req,res)=>{
   const id = parseInt(req.params.id);
   const {last_name} = req.body;

   const index = users.findIndex((u)=>u.id==id);

   if(index===-1){
    res.status(404).json({message:"user not found"});

   }

   if(!last_name){
    res.status(404).json({message:"last name is required"});
   }

   users[index].last_name = last_name;
   fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users, null , 2), () => {
        res.status(201).json({
            message: "last name updated sucessfully",
            updateduser:users[index],
        });
    });

});

app.delete("/api/users/:id", (req , res) => {
    const id = req.params.id;

    const index = users.findIndex((user)=> user.id===id);

    if(index===-1){
        res.status(404).json({message:"user not found"})
    }

    const deleteuser = users.splice(index,1);


     fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users, null , 2), () => {
        res.status(201).json({
            message: "user deleted  sucessfully",
        });
    });
});


// same api

// app.route("/api/user/:id")
//     .get((req , res) => {
//         const id= req.params.id;
//     const user = users.find((u)=>u.id==id);
//     return res.json(user);
//     })

app.listen(8080 , () => {
    console.log("Server is running..")
})