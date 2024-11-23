let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let count = 0; // if no winner

let turnO = true; // playerO ; playerX

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//input O or X
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      box.style.color = "#FF6F61";
      count++;
    } else {
      box.innerText = "X";
      turnO = true;
      box.style.color = "#009DC4";
      count++;
    }
    box.disabled = true; //make the button diable after it has been clicked
    checkWinner(); //after each click check if there's a winner [fuction call]
  });
});

//if winner is found disable all the buttons
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//for a new game/reset
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

//function: shown winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes(); //winner is found; disable the remaining boxes [function call]
};

//checkwinner
const checkWinner = () => {
  //draw case:
  if (count === 9) {
    msg.innerText = "The game has ended in a draw! ";
    msgContainer.classList.remove("hide");
  }

  //else:
  for (let pattern of winPatterns) {
    //accessing innerText of boxes's index based on each possible winning pattern index
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    //checks only is all three indexes in the box for a pattern is not empty
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);
        showWinner(pos1Val); //prints the winner [function call]
      }
    }
  }
};

//reset button function: resetting to the original position
const resetGame = () => {
  turnO = true;
  msgContainer.classList.add("hide");
  enableBoxes(); //boxes are enabled and innertext will be set to empty
};

//on clicking reset and new game buttom resetgame callback is executed
newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
