const Pan = () => {
  const defaultPerspective = "0px";
  let mouseX = 0;
  let mouseY = 0;
  let lastXDeg = 180;
  let lastYDeg = 180;
  const speed = 0.1;

  const cube = document.querySelector(".cube");

  let renderInterval;

  document.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.shiftKey) renderInterval = setInterval(rotateCube, 66);
  });

  document.addEventListener("keyup", (e) => {
    if (!e.shiftKey) clearInterval(renderInterval);
  });

  document.addEventListener("mousemove", updateMousePosition);
  function updateMousePosition(e) {
    mouseX = -e.clientX / getWidth();
    mouseY = e.clientY / getHeight();
  }

  function rotateCube() {
    lastXDeg = lastXDeg + (getAngle(mouseX) - lastXDeg) * speed;
    lastYDeg = lastYDeg + (getAngle(mouseY) - lastYDeg) * speed;
    let newStyle = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    cube.style.transform = newStyle;
  }

  function getAngle(x) {
    return 180 - 360 * x;
  }

  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth,
    );
  }

  function getHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight,
    );
  }
};

export default Pan;
