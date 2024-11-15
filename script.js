let gameRunning = true;

const heartIcons = ["❤️", "🖤"];
const heartMax = 7;
let heartCount = heartMax;
let sequenceCorrect = 0;
let sequenceRandom = [];

const soundRepository = {
  hit: "/assets/audio/collect-ring-15982.mp3",
  miss: "/assets/audio/error-8-206492.mp3",
  win: "/assets/audio/piglevelwin2mp3-14800.mp3",
  lose: "/assets/audio/brass-fail-8-a-207130.mp3",
};

const colorsAvailable = ["#ff0000", "#0000ff", "#00ff00", "#980000", "#9900ff"];

const clockIcon = "⏱️";
const sequenceIcon = "💠";

const statusBarContainerCorrects = document.querySelector(
  ".statusBarContainerCorrects"
);
const statusBarContainerClock = document.querySelector(
  ".statusBarContainerClock"
);
const statusBarContainerHearts = document.querySelector(
  ".statusBarContainerHearts"
);

const gameColorPlayer = document.querySelectorAll(".gameColorPlayer");
const gameColorRandom = document.querySelectorAll(".gameColorRandom");

function drawCorrects() {
  statusBarContainerCorrects.textContent = `${sequenceIcon} ${sequenceCorrect}/${gameColorPlayer.length}`;
}

function drawHearts() {
  let hearts = "";

  for (let x = 0; x < heartCount; x++) {
    hearts += heartIcons[0];
  }

  statusBarContainerHearts.textContent = hearts.padStart(
    heartMax * 2,
    heartIcons[1]
  );
}

let minutes = 0;
let seconds = 0;
function drawClock() {
  if (seconds <= 59) {
    seconds++;
  } else {
    seconds = 0;
    minutes++;
  }
  statusBarContainerClock.textContent = `${clockIcon} ${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function createDataList() {
  const list = document.createElement("datalist");
  list.id = "colourList";
  colorsAvailable.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    list.appendChild(option);
  });

  document.body.appendChild(list);
}
createDataList();

function createRandomSequence() {
  while (sequenceRandom.length < colorsAvailable.length) {
    const randomNumber = Math.floor(Math.random() * colorsAvailable.length);

    if (!sequenceRandom.includes(randomNumber)) {
      sequenceRandom.push(randomNumber);
    }
  }

  gameColorRandom.forEach((thisGameColorRandom, index) => {
    thisGameColorRandom.value = colorsAvailable[sequenceRandom[index]];
  });
}
createRandomSequence();

function playSound(sound) {
  let playSoundObj = document.querySelector("#playSoundObj");
  if (!playSoundObj) {
    playSoundObj = document.createElement("audio");
    playSoundObj.id = "playSoundObj";
    document.body.appendChild(playSoundObj);
  }

  playSoundObj.src = soundRepository[sound];
  playSoundObj.setAttribute("autoplay", "");
}

function verifyGameState(state) {
  switch (state) {
    case "hit":
      playSound("hit");
      break;
    case "miss":
      heartCount--;
      playSound("miss");
      drawHearts();
      break;
    default:
      console.log("option invalid!");
      break;
  }

  sequenceCorrect = 0;
  gameColorPlayer.forEach((itemPlayer, index) => {
    if (itemPlayer.value == gameColorRandom[index].value) {
      sequenceCorrect++;
    }
  });

  drawCorrects();

  if (heartCount <= 0) {
    gameColorPlayer.forEach((itemPlayer) => {
      itemPlayer.setAttribute("disabled", "");
    });

    document
      .querySelector(".gameWinScreenLose")
      .querySelector("h1").textContent = "Ops!!! Não foi desta vez... :(";
    document
      .querySelector(".gameWinScreenLose")
      .querySelector("h3").textContent = "";
    
    playSound("lose");
  }
  if (heartCount > 0 && sequenceCorrect == sequenceRandom.length) {
    playSound("win");
  }
    if (
      heartCount <= 0 ||
      (heartCount > 0 && sequenceCorrect == sequenceRandom.length)
    ) {
      gameRunning = false;
      document.querySelector(".gameContent").classList.remove("show");
      document.querySelector(".gameWinScreenLose").classList.add("show");
    }
}

function markColor(obj, position) {
  if (gameRunning) {
    if (obj.value == colorsAvailable[sequenceRandom[position]]) {
      verifyGameState("hit");
    } else {
      verifyGameState("miss");
    }
  }
}
gameColorPlayer.forEach((thisGameColorPlayer, position) => {
  thisGameColorPlayer.addEventListener("change", function () {
    markColor(thisGameColorPlayer, position);
  });
});

function restartGame() {
  location.href = location.href;
}
document.querySelector(".buttonRestart").addEventListener("click", function () {
  restartGame();
});

setInterval(function () {
  if (gameRunning) {
    drawClock();
  }
}, 1000);

drawHearts();
drawCorrects();
