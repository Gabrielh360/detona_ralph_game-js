const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-laft"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        gameOver: document.querySelector("#game-over"),
        finalScore: document.querySelector(".final-score")
    },
    values: {
        gameVelocty: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0)  {
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)
        loseLife()
        resetTime()
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let ramdomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[ramdomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function resetTime() {
    state.values.curretTime = 60;
    state.view.timeLeft.textContent = state.values.curretTime;
}

function loseLife() {
    const lifesElement = document.querySelector("#lifes");
    let currentLives = parseInt(lifesElement.textContent.slice(1));
    currentLives--;
    lifesElement.textContent = "x" + currentLives;

    if (currentLives === 0) {
        clearInterval(state.actions.countDownTimerId); // Interrompe o contador de tempo
        clearInterval(state.actions.timerId); // Interrompe o intervalo do jogo
    
        localStorage.setItem("finalScore", state.values.result);

        window.location.href = "./src/pages/gameover.html";
        state.view.squares.forEach((square) => {
        square.removeEventListener("mousedown", onSquareClick); // Remove o evento de clique nos quadrados
    })
  }
};


function initialize() {
    addListenerHitbox();
}

initialize();
