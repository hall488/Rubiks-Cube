import "./style.css";
import Pan from "./pan";

const pan = Pan();

const colors = [".red", ".blue", ".green", ".yellow", ".orange", ".white"];

colors.forEach((c) => {
  let divs = document.querySelectorAll(c);

  divs.forEach((d) => {
    d.addEventListener("click", () => {
      console.log(d.classList);
    });
  });
});
