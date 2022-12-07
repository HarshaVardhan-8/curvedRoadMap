import levelsPositions from './levelPositions.json'  assert { type: "json" };
var levelCount = 0;
for (let i = 1; i <= 8; i++) {
  let levelContainer = document.getElementById(`level-${i}`);
  const levelPositions = levelsPositions.positions;
  levelContainer.setAttribute('style', `top:${levelPositions[i - 1].top};left:${levelPositions[i - 1].left};`);
}
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
document.getElementById("dice").addEventListener("click", displayDice);
function displayDice() {
  document.getElementById("dice-number").innerHTML = '';
  setTimeout(() => {
    document.getElementById("dice-number").innerHTML = parseInt(getRandomNumber(1, 6));
    if (document.getElementById("dice-number").innerHTML === '1') {
      document.getElementById("dice").style.background = 'cyan';
    } else if (document.getElementById("dice-number").innerHTML === '2') {
      document.getElementById("dice").style.background = 'bisque';
    } else if (document.getElementById("dice-number").innerHTML === '3') {
      document.getElementById("dice").style.background = 'burlywood';
    } else if (document.getElementById("dice-number").innerHTML === '4') {
      document.getElementById("dice").style.background = 'khaki';
    } else if (document.getElementById("dice-number").innerHTML === '5') {
      document.getElementById("dice").style.background = 'aqua';
    } else if (document.getElementById("dice-number").innerHTML === '6') {
      document.getElementById("dice").style.background = 'aquamarine';
    }
    document.getElementById("dice").removeEventListener("click", displayDice);
    levelAnimation(parseInt(document.getElementById("dice-number").innerHTML));
  }, 100);
}
async function levelAnimation(num) {
  const coOrdinates = levelsPositions.coOrdinates;
  for (let i = levelCount; i < (levelCount + num); i++) {
    if (i === 8) {
      num = num - (i - levelCount);
      levelCount = 0;
      i = 0;
    }
    await gsap.to('.avatar-img', 1, {
      motionPath: {
        curviness: 1,
        path: coOrdinates[i],
        autoRotate: true
      },
      ease: 'power2.out',
    });
  }
  levelCount = levelCount + num;
  document.getElementById("dice").addEventListener("click", displayDice);
}