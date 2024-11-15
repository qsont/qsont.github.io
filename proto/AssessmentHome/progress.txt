const   roundProgressBar = document.querySelector("#prog"),
        progressValue = document.querySelector("#prog-val");

let varVal = 0, endVal = 50, speed = 20,
    rVal = 220, gVal = 0, bVal = 0;

let prog = setInterval( () => {
    varVal++;
    gVal+=5;

    if (gVal == 190) {
        gVal-=5;
        rVal-=2.6;
    }

    progressValue.textContent = `${varVal}%`;
    roundProgressBar.style.background = `conic-gradient(rgb(${rVal}, ${gVal}, 0) ${varVal * 3.6}deg, hsl(0, 0%, 92%) 0deg)`;
    
    if (varVal == endVal) {
        clearInterval(prog);
    }
}, speed);