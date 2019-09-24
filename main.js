const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div'),
      documentHeight = document.documentElement.clientHeight,
      carHeight = 100,
      carWidth = 50,
      lineHeight = 50;

car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 2
};

function getQuantityElements(height) {
    return Math.ceil(documentHeight / height);
}

function getRandom(max, min = 0) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomPositionX(width) {
    return getRandom(gameArea.offsetWidth - width);
}

function startGame() {
    start.classList.add('hide');

    createLines();
    createEnemies();

    setting.start = true;

    createCar();

    setting.y = car.offsetTop;
    setting.x = car.offsetLeft;

    requestAnimationFrame(playGame);
}
function playGame() {
    if (setting.start) {
        const minY = 0;
        const maxY = gameArea.offsetHeight - carHeight;
        const minX = 0;
        const maxX = gameArea.offsetWidth - carWidth;

        moveLines();
        moveEnemies();

        if (keys.ArrowUp && setting.y > minY) {
            setting.y -= setting.speed;
        }
        if (keys.ArrowDown && setting.y < maxY) {
            setting.y += setting.speed;
        }
        if (keys.ArrowLeft && setting.x > minX) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < maxX) {
            setting.x += setting.speed;
        }

        car.style.top = setting.y + 'px';
        car.style.left = setting.x + 'px';

        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}
function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

function createCar() {
    car.style.height = carHeight;
    car.style.width = carWidth;
    car.style.left = getRandomPositionX(carWidth) + 'px';
    gameArea.appendChild(car);
}

function createLines() {
    const lineHeightWithOffset = lineHeight * 2;
    for (let i = 0; i < getQuantityElements(lineHeightWithOffset); i += 1) {
        const line = document.createElement('div');
        const linePos = i * lineHeightWithOffset;

        line.classList.add('line');
        line.y = linePos;

        line.style.height = lineHeight + 'px';
        line.style.top = line.y + 'px';
        gameArea.appendChild(line);
    }
}

function moveLines() {
    const lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        line.y += setting.speed;

        if (line.y >= documentHeight) {
            line.y = -lineHeight;
        }

        line.style.top = line.y + 'px';
    });
}

function createEnemies() {
    for (let i = 0; i < getQuantityElements(carHeight * setting.traffic); i += 1) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy', `enemy-${getRandom(2, 1)}`);
        enemy.style.width = carWidth + 'px';
        enemy.style.height = carHeight + 'px';

        enemy.y = -(carHeight * setting.traffic * (i + 1));
        enemy.x = getRandomPositionX(carWidth);

        enemy.style.top = enemy.y + 'px';
        enemy.style.left   = enemy.x + 'px';

        gameArea.appendChild(enemy);
    }
}

function moveEnemies() {
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        enemy.y += setting.speed / 2;

        if (enemy.y >= documentHeight) {
            enemy.classList = '';
            enemy.classList.add('enemy', `enemy-${getRandom(2, 1)}`);
            enemy.y = -carHeight * setting.traffic;
            enemy.x = getRandomPositionX(carWidth);
        }

        enemy.style.top = enemy.y + 'px';
        enemy.style.left = enemy.x + 'px';
    });
}

start.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);