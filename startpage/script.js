function updateTime() {
  fetch('http://worldtimeapi.org/api/ip')
    .then(response => response.json())
    .then(data => {
      const timeElement = document.getElementById('time');
      const dateElement = document.getElementById('date');

      const utcDateTime = new Date(data.utc_datetime);
      const localDateTime = new Date(data.datetime);

      const hours = String(localDateTime.getHours()).padStart(2, '0');
      const minutes = String(localDateTime.getMinutes()).padStart(2, '0');
      const seconds = String(localDateTime.getSeconds()).padStart(2, '0');
      const date = utcDateTime.toDateString();

      const currentTime = `${hours}:${minutes}:${seconds}`;
      timeElement.textContent = currentTime;
      dateElement.textContent = date;
    })
    .catch(error => {
      console.error('Error fetching time:', error);
    });
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial update when the page loads
updateTime();

// The function to fetch and display time is not shown here.
// Please keep your existing updateTime() function for the clock to work.

const canvas = document.getElementById('ballCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = []; // Array to store balls information

function createBall() {
  const ballRadius = 12;
  const x = canvas.width - ballRadius;
  const y = ballRadius;

  const dx = -10 
  const dy = 2 

  const gravity = 0.2
  const damping = 0.8  


  const lifetime = 15700; // Lifetime in milliseconds (20 seconds)

  return { ballRadius, x, y, dx, dy, gravity, damping, lifetime };
}


function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}

function animateBalls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = balls.length - 1; i >= 0; i--) {
    const ball = balls[i];

    // Bounce off the edges horizontally
    if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
      ball.dx = -ball.dx;
    }

    // Bounce off the edges vertically
    if (ball.y + ball.dy > canvas.height - ball.ballRadius) {
      ball.y = canvas.height - ball.ballRadius; // Keep the ball within the canvas height
      ball.dy = -ball.dy * ball.damping; // Apply damping to reduce bounce height
    } else {
      ball.dy += ball.gravity; // Apply gravity to simulate falling
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    drawBall(ball);

    // Decrease the lifetime of the ball and remove it when the lifetime is over
    ball.lifetime -= 1000 / 60; // Assuming 60 FPS
    if (ball.lifetime <= 0) {
      balls.splice(i, 1);
    }
  }

  requestAnimationFrame(animateBalls);
}

function addBall() {
  const ball = createBall();
  balls.push(ball);
}

// Add new balls every 2 seconds
setInterval(addBall, 2000);

// Start the animation
animateBalls();

