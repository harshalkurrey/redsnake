
document.addEventListener("DOMContentLoaded", function () {
  const snake = document.getElementById("snake");
  const segmentCount = 25; // more segments = smoother snake
  const segments = [];

  // Create segments
  for (let i = 0; i < segmentCount; i++) {
    const segment = document.createElement("div");
    segment.classList.add("snake-segment");
    if (i === 0) {
      segment.classList.add("head");

      const leftEye = document.createElement("div");
      leftEye.classList.add("eye", "left");
      const leftPupil = document.createElement("div");
      leftPupil.classList.add("pupil");
      leftEye.appendChild(leftPupil);
      segment.appendChild(leftEye);

      const rightEye = document.createElement("div");
      rightEye.classList.add("eye", "right");
      const rightPupil = document.createElement("div");
      rightPupil.classList.add("pupil");
      rightEye.appendChild(rightPupil);
      segment.appendChild(rightEye);
    }
    snake.appendChild(segment);
    segments.push({
      element: segment,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateSnake() {
    const head = segments[0];

    // Move head directly to cursor
    head.x += (mouseX - head.x) * 0.2;
    head.y += (mouseY - head.y) * 0.2;
    head.element.style.left = head.x - 30 + "px";
    head.element.style.top = head.y - 20 + "px";

    // Move each body part smoothly to the previous part
    for (let i = 1; i < segments.length; i++) {
      const prev = segments[i - 1];
      const curr = segments[i];

      const dx = prev.x - curr.x;
      const dy = prev.y - curr.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const segmentLength = 15; // tighter body, no visible gaps

      curr.x = prev.x - Math.cos(angle) * segmentLength;
      curr.y = prev.y - Math.sin(angle) * segmentLength;

      const size = 40 - i * 1.2;
      curr.element.style.width = `${Math.max(size, 10)}px`;
      curr.element.style.height = `${Math.max(size, 10)}px`;
      curr.element.style.left = curr.x - size / 2 + "px";
      curr.element.style.top = curr.y - size / 2 + "px";
    }

    requestAnimationFrame(animateSnake);
  }

  animateSnake();
});
