const questions = [
    {
        pic: "./imgs/1.jpg",
        q: "Ma____",
        c: [
            {text: "ma", correct: true},
            {text: "sa", correct: false},
            {text: "mas", correct: false},
            {text: "am", correct: false},

        ]
    },
    {
        pic: "./imgs/2.jpg",
        q: "a____",
        c: [
            {text: "mas", correct: false},
            {text: "sa", correct: false},
            {text: "asa", correct: false},
            {text: "sam", correct: true},
        ]
    },
    {
        pic: "./imgs/3.jpg",
        q: "Sa____",
        c: [
            {text: "as", correct: false},
            {text: "ma", correct: true},
            {text: "mas", correct: false},
            {text: "si", correct: false},

        ]
    },
    {
        pic: "./imgs/4.jpg",
        q: "Ma____",
        c: [
            {text: "asam", correct: false},
            {text: "misa", correct: false},
            {text: "sa", correct: true},
            {text: "a", correct: false},

        ]
    },
    {
        pic: "./imgs/5.jpg",
        q: "Masa____",
        c: [
            {text: "mang", correct: false},
            {text: "ma", correct: true},
            {text: "ama", correct: false},
            {text: "asa", correct: false},
        ]
    },
    {
        pic: "./imgs/6.jpg",
        q: "A____",
        c: [
            {text: "sim", correct: false},
            {text: "mam", correct: false},
            {text: "sa", correct: false},
            {text: "ma", correct: true},

        ]
    },
];

const itemNo = document.getElementById("item-no");
const totalQuestions = document.getElementById("total-questions");
const picture = document.getElementById("pic");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const next = document.getElementById("next-btn");
const screenShade = document.getElementById("screen-shade");
const optionsBox = document.getElementById("options");
const optionsButton = document.getElementById("options-btn")
const continueButton = document.getElementById("continue");
const restartButton = document.getElementById("restart")
const backButton = document.getElementById("back");
const confirmationBox = document.getElementById("confirmation-box");
const confirmationMessage = document.getElementById("confirmation-msg");
const yesRestartButton = document.getElementById("yes-btn");
const noRestartButton = document.getElementById("no-btn");
const yesBackButton = document.getElementById("");

let currentItem = 0;
score = 0;

function start() {
    currentItem = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
}

function resetState() {
    totalQuestions.innerHTML = questions.length;
    next.style.display = "none";
    while(choices.firstChild) {
        choices.removeChild(choices.firstChild);
    }
}

function showQuestion() {
    resetState();
    let current = questions[currentItem];
    let qNo = currentItem + 1;
    itemNo.innerHTML = qNo;
    question.innerHTML = current.q;
    
    if(current.pic) {
        picture.src = current.pic;
    }

    current.c.forEach(choice => {
        const button = document.createElement("button");
        button.innerHTML = choice.text;
        button.classList.add("btn");
        choices.appendChild(button);
    if (choice.correct) {
        button.dataset.correct = choice.correct;
    }
    button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(event) {
    const userSelected = event.target;
    const isCorrect = userSelected.dataset.correct === "true";

    if(isCorrect) {
        userSelected.classList.add("correct");
        score++
    }
    else {
        userSelected.classList.add("incorrect");
    }

    Array.from(choices.children).forEach(choice => {
        if(choice.dataset.correct === "true") {
            choice.classList.add("correct");
        }
        choice.disabled = true;
    });
    next.style.display = "block";
}

function nextBtnHandler() {
    currentItem++;
    if(currentItem < questions.length) {
        showQuestion();
    }
    else {
        displayResult();
    }
}

next.addEventListener("click", () => {
    if(currentItem < questions.length) {
        nextBtnHandler();
    }
    else {
        start();
    }
});

function displayResult() {
    resetState();
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("top-bar").style.display = "none";
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

    noRestartButton.addEventListener("click", () => {
        optionsBox.style.display = "block";
        confirmationBox.style.display = "none";
    });

    yesRestartButton.addEventListener("click", () => {
        currentItem = 0;
        score = 0;
        showQuestion();
        confirmationBox.style.display = "none";
        screenShade.style.display = "none";
    });

});




start();