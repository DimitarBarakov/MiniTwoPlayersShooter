let gameStart = document.getElementsByClassName('game-start')[0]
let gameArea = document.getElementsByClassName('game-area')[0]
let gameOver = document.getElementsByClassName('game-over')[0]
let gameScore = document.getElementsByClassName('game-score')[0]
let points = gameScore.querySelector(".points")

gameStart.addEventListener('click', onGameStart)

document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', onKeyUp)
let keys = {};
let player = {
    x:150,
    y:100,
    height: 0,
    width: 0,
    lastTimeFiredFireball: 0
}
let player2 = {
    x:750,
    y:100,
    height: 0,
    width: 0,
    lastTimeFiredFireball: 0
}
let game = {
    speed: 2,
    movingMultiplayer: 4,
    fireBallMultiplier: 5,
    fireInterval: 1000,
    bugSpawnInterval: 1000
}
let scene = {
    score: 0,
    lastBugSpawn: 0,
    isActiveGame: true
}
function onGameStart(){
    gameStart.classList.add('hide')

    let wizard = document.createElement('div')
    wizard.classList.add('wizard')
    wizard.classList.add('wizard1')
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameArea.appendChild(wizard);
    player.width = wizard.offsetWidth;
    player.height = wizard.offsetHeight

    let wizard2 = document.createElement('div')
    wizard2.classList.add('wizard')
    wizard2.classList.add('wizard2')
    wizard2.style.top = player2.y + 'px';
    wizard2.style.left = player2.x + 'px';
    gameArea.appendChild(wizard2);
    player2.width = wizard2.offsetWidth;
    player2.height = wizard2.offsetHeight

    window.requestAnimationFrame(gameAction)
}
function onKeyDown(e){
    keys[e.code] = true;
    console.log(keys)
}
function onKeyUp(e){
    keys[e.code] = false;
    console.log(keys)
}
var animation = window.requestAnimationFrame(gameAction)
function gameAction(timestamp){
    const  wizard = document.querySelector('.wizard1')
    const  wizard2 = document.querySelector('.wizard2')

    let isInAir = (player.y + wizard.offsetHeight) <= gameArea.offsetHeight
    if (isInAir){
        player.y += game.speed;
    }
    if (keys.ArrowUp && player.y > 0){
        player.y -= game.speed*game.movingMultiplayer;
    }
    if (keys.ArrowDown && player.y + wizard.offsetHeight < gameArea.offsetHeight){
        player.y += game.speed*game.movingMultiplayer;
    }
    if (keys.ArrowLeft && player.x > 0){
        player.x -= game.speed*game.movingMultiplayer;
    }
    if (keys.ArrowRight && player.x + wizard.offsetWidth < gameArea.offsetWidth){
        player.x += game.speed*game.movingMultiplayer;
    }
    if (keys.Space && timestamp - player.lastTimeFiredFireball > game.fireInterval){
        player.lastTimeFiredFireball = timestamp;
        wizard.classList.add('wizard-fire-1')
        addFireBall(player,wizard);

    }else{
        wizard.classList.remove('wizard-fire-1')
    }


    let isInAir2 = (player2.y + wizard2.offsetHeight) <= gameArea.offsetHeight
    if (isInAir2){
        player2.y += game.speed;
    }
    if (keys.KeyW && player2.y > 0){
        player2.y -= game.speed*game.movingMultiplayer;
    }
    if (keys.KeyS && player2.y + wizard2.offsetHeight < gameArea.offsetHeight){
        player2.y += game.speed*game.movingMultiplayer;
    }
    if (keys.KeyA && player2.x > 0){
        player2.x -= game.speed*game.movingMultiplayer;
    }
    if (keys.KeyD && player2.x + wizard2.offsetWidth < gameArea.offsetWidth){
        player2.x += game.speed*game.movingMultiplayer;
    }
    if (keys.KeyF && timestamp - player2.lastTimeFiredFireball > game.fireInterval){
        player2.lastTimeFiredFireball = timestamp;
        wizard2.classList.add('wizard-fire-2')
        addFireBall(player2,wizard2);

    }else{
        wizard2.classList.remove('wizard-fire-2')
    }

    // if (timestamp - scene.lastBugSpawn > game.bugSpawnInterval + 5000 * Math.random()){
    //     let bug = document.createElement('div')
    //     bug.classList.add('bug')
    //     bug.x = gameArea.offsetWidth - 60;
    //     bug.style.left = bug.x + 'px';
    //     bug.y = Math.random() * (gameArea.offsetHeight - 60);
    //     bug.style.top = bug.y + 'px'
    //     gameArea.appendChild(bug)
    //     scene.lastBugSpawn = timestamp;
    // }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    wizard2.style.top = player2.y + 'px';
    wizard2.style.left = player2.x + 'px';



    let fireballs1  = document.querySelectorAll('.fire-ball1')
    fireballs1.forEach(fireball=>{
        fireball.x += game.speed * game.fireBallMultiplier;
        fireball.style.left = fireball.x + 'px';

        if (fireball.x + fireball.offsetWidth > gameArea.offsetWidth){
            fireball.parentElement.removeChild(fireball)
        }
    })


    let fireballs2  = document.querySelectorAll('.fire-ball2')
    fireballs2.forEach(fireball=>{
        fireball.x -= game.speed * game.fireBallMultiplier;
        fireball.style.left = fireball.x + 'px';

        if (fireball.x + fireball.offsetWidth > gameArea.offsetWidth){
            fireball.parentElement.removeChild(fireball)
        }
    })
    
    // let bugs = document.querySelectorAll('.bug')
    // bugs.forEach(bug=>{
    //     bug.x -= game.speed * 3
    //     bug.style.left = bug.x + 'px'

    //     if (bug.x + bug.offsetWidth < 0){
    //         bug.parentElement.removeChild(bug)
    //     }
    // })

    // bugs.forEach(bug=>{
    //     if (isCollision(wizard,bug)){
    //         gameOverAction();
    //     }
    //     fireballs.forEach(fireball=>{
    //         if (isCollision(fireball,bug)){
    //             bug.parentElement.removeChild(bug)
    //             fireball.parentElement.removeChild(fireball)
    //         }
    //     })
    // })
    scene.score ++;
    points.textContent = scene.score;

    if (!scene.isActiveGame){
        window.requestAnimationFrame(gameAction)
    }
    window.requestAnimationFrame(gameAction)
}

function addFireBall(player,wizard){
    console.log(player.classList)
    let fireBall = document.createElement('div');
    fireBall.classList.add('fire-ball')
    if(wizard.classList.contains('wizard1')){
        fireBall.classList.add('fire-ball1')
        fireBall.x = player.x + player.width
    }
    else{
        fireBall.classList.add('fire-ball2')
        fireBall.x = player.x - player.width
    }
    fireBall.style.top = player.y + player.height / 3 - 5  + 'px';
    
    fireBall.style.left = fireBall.x + 'px';
    gameArea.appendChild(fireBall)
}
function isCollision(firstElement, secondElement){
    let firstRect = firstElement.getBoundingClientRect()
    let secondRect = secondElement.getBoundingClientRect()

    return !(firstRect.top > secondRect.bottom||
    firstRect.bottom < secondRect.top||
    firstRect.left > secondRect.right||
    firstRect.right < secondRect.left)
}
function gameOverAction(){
    scene.isActiveGame = false;
    gameOver.classList.remove('hide')
}