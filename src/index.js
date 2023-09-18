import "./style.css";
import Pan from "./pan";

const pan = Pan();

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
};

document.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "u":
      turn(moves.U);
      break;
    case "r":
      turn(moves.R);
      break;
  }
});

// colors.forEach((c) => {
//   let divs = document.querySelectorAll(c);

//   divs.forEach(() => {

//   });
// });

const turn = (move) => {
  let order = move;

  let toBeMoved = [];

  order.forEach((o) => {
    let divs = [];

    o.from.forEach((p) => divs.push(o.face.children[p]));

    toBeMoved.push(divs);
  });

  console.log(toBeMoved);

  for (let i = 0; i < 4; i++) {
    let tbm = toBeMoved[i];

    let o = order[(i + 1) % 4];

    for (let j = 0; j < tbm.length; j++) {
      console.log(tbm[j], o.from[j], o.face.children[o.to[j]]);

      o.face.insertBefore(tbm[j], o.face.children[o.to[j]]);
    }
  }

  switch (move) {
    case moves.R:
      rotate(right);
      break;
    case moves.U:
      rotate(top);
      break;
  }
};

const rotate = (face, direction) => {
  let n = [...face.children];
  face.innerHTML = "";
  let rotation = [n[6], n[3], n[0], n[7], n[4], n[1], n[8], n[5], n[2]];
  rotation.forEach((r) => {
    face.append(r);
  });
};
