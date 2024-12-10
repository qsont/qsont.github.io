import { passPendingActs } from "./list.js";

let completed = 0, pending = 0, maxVal = 0;

if (JSON.parse(localStorage.getItem("data"))) {

    console.log("Gello")

    let temp = JSON.parse(localStorage.getItem("data"));
    let limit = temp.length;

    temp.forEach(act => {
        if(act.completed) {
            completed++;
        }
        else {
            pending++;
        }
    });

    maxVal = Math.round((completed/limit)*100);
}

const   roundProgressBar = document.querySelector("#prog"),
        progressValue = document.querySelector("#prog-val"),
        completedValue = document.getElementById("completed"),
        pendingValue = document.getElementById("pending");

let varVal = 0, speed = 20,
    rVal = 220, gVal = 0, bVal = 0;

let prog = setInterval( () => {
    varVal++;
    gVal+=5;

    if (gVal == 190) {
        gVal-=5;
        rVal-=2.6;
    }

    if (maxVal === 0) {
        progressValue.textContent = `0%`;
    }
    else {
        progressValue.textContent = `${varVal}%`;
    }
    
    roundProgressBar.style.background = `conic-gradient(rgb(${rVal}, ${gVal}, 0) ${varVal * 3.6}deg, hsl(0, 0%, 92%) 0deg)`;
    
    if (varVal === maxVal || maxVal === 0) {
        clearInterval(prog);
    }
}, speed);

completedValue.innerText = `Activities Completed: ${completed}`;
passPendingActs.then((r) => { pendingValue.innerText = `Activities Pending: ${r}` });
