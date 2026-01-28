console.log("start");

setTimeout(()=>{
    console.log("settimeout");
})

setImmediate(()=>{
    console.log("setimmediate");
});

process.nextTick(()=>{
    console.log("process.nextTick");
});

Promise.resolve().then(()=>{
    console.log("promise");
});

console.log("end");
