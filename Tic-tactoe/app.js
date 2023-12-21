let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true; // to start the playerO
let count = 0; // to track count of steps  for check Draw



const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


//function to reset the game and count
const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
}

//eventLister
boxes.forEach((box) => {
    box.addEventListener("click",() =>{
  
   
    if(turnO){ 
        box.innerText="O"; // playerO
        turnO = false;
        count++;
    }
    else{
        box.innerText="X";  //playerX
        turnO = true;
        count++;    //increment to check step for draw
    }
    box.disabled = true;
    let isWinner =  checkWinner();
    if(!isWinner && count===9){
        draw();
    }
});
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

};
const draw = () =>{
 msg.innerText="It is a Draw";
 msgContainer.classList.remove("hide");
}

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val===pos2Val && pos2Val===pos3Val){
               
                showWinner(pos1Val);
                return true;
                
            }
            

        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);
