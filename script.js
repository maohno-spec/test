const questions = [
    {
        question: "日本で一番高い山は？",
        answers: [
            { text: "富士山", correct: true },
            { text: "北岳", correct: false },
            { text: "奥穂高岳", correct: false },
            { text: "間ノ岳", correct: false }
        ]
    },
    {
        question: "プログラミング言語「Python」の名前の由来は？",
        answers: [
            { text: "蛇のニシキヘビ", correct: false },
            { text: "コメディ番組「空飛ぶモンティ・パイソン」", correct: true },
            { text: "開発者のペットの名前", correct: false },
            { text: "ギリシャ神話の怪物", correct: false }
        ]
    },
    {
        question: "ウェブページの骨組みを作る言語は？",
        answers: [
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: false },
            { text: "HTML", correct: true },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "1バイトは何ビット？",
        answers: [
            { text: "4ビット", correct: false },
            { text: "8ビット", correct: true },
            { text: "16ビット", correct: false },
            { text: "32ビット", correct: false }
        ]
    },
    {
        question: "世界で最も利用されている検索エンジンは？",
        answers: [
            { text: "Bing", correct: false },
            { text: "Yahoo!", correct: false },
            { text: "DuckDuckGo", correct: false },
            { text: "Google", correct: true }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-btn');
const controlsElement = document.getElementById('controls');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hide');
    resultContainer.classList.add('hide');
    controlsElement.classList.add('hide');
    nextButton.innerHTML = "次へ";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    controlsElement.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    controlsElement.classList.remove('hide');
    nextButton.classList.remove('hide');

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.onclick = () => {
            currentQuestionIndex++;
            showQuestion();
        };
    } else {
        nextButton.innerHTML = "結果を見る";
        nextButton.onclick = showResult;
    }
}

function showResult() {
    quizContainer.classList.add('hide');
    controlsElement.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.innerText = score;
    totalQuestionsElement.innerText = questions.length;
}

restartButton.addEventListener('click', startGame);

startGame();
