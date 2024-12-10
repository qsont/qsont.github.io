export {start, resetState, showQuestion, selectAnswer, nextBtnHandler, displayResult, score, activityFinished, items, totalQuestions, quiz};

const items = [];

/* DOM ELEMENTS */

const topBar = document.getElementById("top-bar");
const itemNo = document.getElementById("item-no");
const totalQuestions = document.getElementById("total-questions");
const screenShade = document.getElementById("screen-shade");
const optionsBox = document.getElementById("options");
const optionsButton = document.getElementById("options-btn")

const quiz = document.getElementById("quiz");

const quizBox = document.getElementById("quiz-box");
const picture = document.getElementById("pic");
const next = document.getElementById("next-btn");


const continueButton = document.getElementById("continue");
const restartButton = document.getElementById("restart")
const quitButton = document.getElementById("quit");
const confirmationBox = document.getElementById("confirmation-box");
const confirmationMessage = document.getElementById("confirmation-msg");
const yesConfirmationButton = document.getElementById("yes-btn");
const noConfirmationButton = document.getElementById("no-btn");

const result = document.getElementById("result");
const finalScore = document.getElementById("final-score");

let currentItem = 0;
let score = 0;
let activityFinished = false;

/* START OF FUNCTIONS */

function start() {
    currentItem = 0;
    score = 0;
    next.innerHTML = "Next";
    totalQuestions.innerHTML = items.length;
    showQuestion();
}

function resetState() {
    next.style.display = "none";
    while(quizBox.firstChild) {
        quizBox.removeChild(quizBox.firstChild);
    }
}

function showQuestion() {
    resetState();
    let current = items[currentItem];

    const instructions = document.createElement("div");
    instructions.id = "instructions";
    let qNo = currentItem + 1;
    itemNo.innerHTML = qNo;
    
    if(current.pic) {
        picture.src = current.pic;
    }


    if (current.type === "multiple"){
        instructions.innerHTML = "<p>Piliin ang angkop na nawawalang mga letra</p>";
        quizBox.appendChild(instructions);

        quizBox.appendChild(picture);
        
        const fillBlank = document.createElement("div");
        fillBlank.innerHTML = `${current.q}____`;
        fillBlank.id = "fillBlank";
        quizBox.appendChild(fillBlank);

        const choices = document.createElement("div");
        choices.id = "choices";

        let c = [current.correct, ...current.incorrect].sort(() => Math.random() - 0.5);

        c.forEach(choice => {
            choices.classList.add("choices");
            const button = document.createElement("button");
            button.innerHTML = choice;
            button.classList.add("btn");
            choices.appendChild(button);

            button.addEventListener("click", selectAnswer);
        });

        quizBox.appendChild(choices);
        quizBox.appendChild(next);
    }
    else {
        if (current.type === "identify"){
            instructions.innerHTML = "<p>Ano ang naaayong salita sa imahe?</p>";
        }
        if (current.type === "audio") {
            instructions.innerHTML = "<p>Pindutin ang larawan at i-type ang iyong narinig.</p>";

            const audio = document.createElement("audio");
            audio.id = "audio";
            audio.src = current.audio;
            quizBox.appendChild(audio);

            picture.addEventListener("click", () => {document.getElementById("audio").play();});
        }
        
        quizBox.append(instructions);
        quizBox.append(picture);

        const textBox = document.createElement("input");
        textBox.id = "textbox"
        textBox.type = "text";
        textBox.placeholder = "Ilagay ang sagot dito.";
        textBox.autocomplete = "off";
        textBox.addEventListener("keyup", (e) => {
            if(e.key === 'Enter') {
                checkText();
            }
        });

        const enter = document.createElement("button");
        enter.id = "enter-btn";
        enter.classList.add("quiz-btn");
        enter.innerHTML = "Enter";
        enter.addEventListener("click", () => {checkText()});

        quizBox.appendChild(textBox);
        quizBox.appendChild(enter);
        quizBox.appendChild(next);
    }
}

function selectAnswer(event) {
    const userSelected = event.target;

    document.getElementById("fillBlank").innerHTML = `${items[currentItem].q}${items[currentItem].correct}`;

    if(userSelected.innerHTML === items[currentItem].correct) {
        userSelected.classList.add("correct-choice");
        score++;
    }
    else {
        userSelected.classList.add("incorrect-choice");
    }

    Array.from(choices.children).forEach(choice => {
        if(choice.innerHTML === items[currentItem].correct) {
            choice.classList.add("correct-choice");
        }
        else if(!choice.classList.contains("incorrect-choice")) {
            choice.style.opacity = 0;
        }
        choice.disabled = true;
    });
    next.style.display = "block";
}

function checkText() {
    const textbox = document.getElementById("textbox");
    let answer = textbox.value.toLowerCase();

    if(answer === items[currentItem].correct) {
        score++;
        textbox.disabled = "true";
        textbox.classList.add("correct-textBox");
    }
    else {
        textbox.disabled = "true";
        textbox.classList.add("incorrect-textBox");
        const correctText = document.createElement("div");
        correctText.id = "correctText";
        correctText.classList.add("correct-choice");
        correctText.innerHTML = items[currentItem].correct;
        quizBox.insertBefore(correctText, next);

    }
    const enter = document.getElementById("enter-btn");
    enter.style.display = "none";
    next.style.display = "block";
}

function nextBtnHandler() {
    ++currentItem;
    console.log(currentItem);
    showQuestion();
}

next.addEventListener("click", () => {
    if(currentItem < (items.length)-1) {
        nextBtnHandler();
    }
    else {
        displayResult();
    }
});

function displayResult() {
    resetState();
    quizBox.style.display = "none";
    topBar.style.display = "none";

    result.style.display = "block";
    finalScore.innerHTML = `You scored ${score} out of ${totalQuestions.innerText}`;


        
}

optionsButton.addEventListener("click", () => {
    screenShade.style.display = "block";
    optionsBox.style.display = "block";
});

continueButton.addEventListener("click", () => {
    screenShade.style.display = "none";
});

restartButton.addEventListener("click", () => {
    optionsBox.style.display = "none";
    confirmationBox.style.display = "block";
    confirmationMessage.innerHTML = "Are you sure you want to restart this activity?";
    yesConfirmationButton.value = "restart";
});

yesConfirmationButton.addEventListener("click", () => {
    if (yesConfirmationButton.value === "restart") {
        currentItem = 0;
        score = 0;
        showQuestion();
        confirmationBox.style.display = "none";
        screenShade.style.display = "none";
    }
    else if (yesConfirmationButton.value === "quit") {
        document.location.href = '../index.html';
    }
});

quitButton.addEventListener("click", () => {
    optionsBox.style.display = "none";
    confirmationBox.style.display = "block";
    confirmationMessage.innerHTML = "Are you sure you want to go back to the assessment page?";
    yesConfirmationButton.value = "quit";
});

noConfirmationButton.addEventListener("click", () => {
    optionsBox.style.display = "block";
    confirmationBox.style.display = "none";
});
