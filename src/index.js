import "./style.css";
import Pan from "./pan";

const pan = Pan();

const previousMoves = document.querySelector(".previous-moves");
const scrambleBtn = document.querySelector(".scramble");

const colors = [".red", ".blue", ".green", ".yellow", ".orange", ".white"];

const front = document.querySelector(".front");
const right = document.querySelector(".right");
const back = document.querySelector(".back");
const left = document.querySelector(".left");
const top = document.querySelector(".top");
const down = document.querySelector(".down");

const moves = {
  U: [
    { face: front, from: [0, 1, 2], to: [0, 1, 2] },
    { face: left, from: [0, 1, 2], to: [0, 1, 2] },
    { face: back, from: [0, 1, 2], to: [2, 1, 0] },
    { face: right, from: [0, 1, 2], to: [2, 1, 0] },
  ],
  R: [
    { face: front, from: [2, 5, 8], to: [2, 5, 8] },
    { face: top, from: [2, 5, 8], to: [2, 6, 10] },
    { face: back, from: [2, 5, 8], to: [10, 6, 2] },
    { face: down, from: [2, 5, 8], to: [10, 6, 2] },
  ],
  D: [
    { face: front, from: [6, 7, 8], to: [6, 7, 8] },
    { face: right, from: [6, 7, 8], to: [6, 7, 8] },
    { face: back, from: [6, 7, 8], to: [8, 7, 6] },
    { face: left, from: [6, 7, 8], to: [8, 7, 6] },
  ],
  L: [
    { face: front, from: [0, 3, 6], to: [0, 3, 6] },
    { face: down, from: [0, 3, 6], to: [0, 4, 8] },
    { face: back, from: [0, 3, 6], to: [7, 4, 0] },
    { face: top, from: [0, 3, 6], to: [7, 4, 0] },
  ],
  F: [
    { face: top, from: [6, 7, 8], to: [6, 6, 6] },
    { face: right, from: [0, 3, 6], to: [0, 4, 8] },
    { face: down, from: [0, 1, 2], to: [2, 1, 0] },
    { face: left, from: [2, 5, 8], to: [2, 6, 10] },
  ],
  B: [
    { face: top, from: [2, 1, 0], to: [0, 1, 2] },
    { face: left, from: [0, 3, 6], to: [0, 4, 8] },
    { face: down, from: [6, 7, 8], to: [6, 7, 8] },
    { face: right, from: [2, 5, 8], to: [10, 6, 2] },
  ],
};

document.addEventListener("keypress", (e) => {
  keyPressHandler(e);
});

scrambleBtn.addEventListener("click", () => {
  for (let i = 0; i < 100; i++) {
    let index = Math.floor(Math.random() * 12);
    let fakeKeys = [
      { key: "u", shiftKey: false },
      { key: "U", shiftKey: true },
      { key: "d", shiftKey: false },
      { key: "D", shiftKey: true },
      { key: "r", shiftKey: false },
      { key: "R", shiftKey: true },
      { key: "l", shiftKey: false },
      { key: "L", shiftKey: true },
      { key: "f", shiftKey: false },
      { key: "F", shiftKey: true },
      { key: "b", shiftKey: false },
      { key: "B", shiftKey: true },
    ];

    keyPressHandler(fakeKeys[index]);
  }

  [...previousMoves.children].forEach((c) => {
    if (!c.classList.contains("title")) previousMoves.removeChild(c);
  });
});

const keyPressHandler = (e) => {
  let shiftAdjust = 1;
  if (e.shiftKey) shiftAdjust = 3;

  let move;
  let face;

  switch (e.key) {
    case "u":
    case "U":
      move = moves.U;
      face = top;
      break;
    case "r":
    case "R":
      move = moves.R;
      face = right;
      break;
    case "d":
    case "D":
      move = moves.D;
      face = down;
      break;
    case "l":
    case "L":
      move = moves.L;
      face = left;
      break;
    case "f":
    case "F":
      move = moves.F;
      face = front;
      break;
    case "b":
    case "B":
      move = moves.B;
      face = back;
      break;
  }

  if (move != undefined) {
    for (let i = 0; i < shiftAdjust; i++) {
      turn(move);
      rotate(face);
    }
    let li = document.createElement("li");
    li.textContent = /[URDLFB]/.test(e.key) ? `${e.key}'` : e.key.toUpperCase();
    previousMoves.insertBefore(li, previousMoves.children[1]);
  }
};

const turn = (move) => {
  let order = move;

  let toBeMoved = [];

  order.forEach((o) => {
    let divs = [];

    o.from.forEach((p) => divs.push(o.face.children[p]));

    toBeMoved.push(divs);
  });

  for (let i = 0; i < 4; i++) {
    let tbm = toBeMoved[i];

    let o = order[(i + 1) % 4];

    for (let j = 0; j < tbm.length; j++) {
      o.face.insertBefore(tbm[j], o.face.children[o.to[j]]);
    }
  }
};

const rotate = (face, direction) => {
  let n = [...face.children];
  face.innerHTML = "";
  let rotation = [n[6], n[3], n[0], n[7], n[4], n[1], n[8], n[5], n[2]];
  rotation.forEach((r) => {
    if (face === back) face.prepend(r);
    else face.append(r);
  });
};
