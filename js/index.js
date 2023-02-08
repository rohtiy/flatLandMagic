

main();

function main(){

    let player1 = document.getElementById("player1");
    let player2 = document.getElementById("player2");


    document.onkeydown =  (e) => handleKeyDown(e);


    setPlayerInitialPosition({ player : player1 , position : { top : 168 , left : 18}})
    setPlayerInitialPosition({ player : player2 , position : { top : 168 , left : 618}})
}

function moveElement({element , direction}){

    let position = getElementPosition(element);

    let newPosition 

    let momentStep = 10;

    switch (direction) {
        case 'up':
            newPosition = {...position, top :  position.top - momentStep }
            break;
        case 'down':
            newPosition = {...position, top :  position.top + momentStep }
            break;
        case 'left':
            newPosition = {...position, left :  position.left - momentStep }
            break;
        case 'right':
            newPosition = {...position, left :  position.left + momentStep }
            break;

        default:
            break;
    }



    if(!isPositionAllowed(newPosition)) {
        let sound = document.getElementById('touchWall');
        //sound.play();
        return;
    }

    position = { ...position, ...newPosition }

    element.style.position = 'absolute'
    element.style.top = `${position.top}px`;
    element.style.left = `${position.left}px`;

}

const handleKeyDown =  (KeyboardEvent) => {

    console.log(KeyboardEvent);

    let object = { element : null , direction : null }

    if(['w','a','s','d'].includes(KeyboardEvent.key)){
        object.element = document.getElementById("player1");
    }
    else if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(KeyboardEvent.key)){
        object.element = document.getElementById("player2");
    }

    switch (KeyboardEvent.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            object.direction = 'up'
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            object.direction = 'down'
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            object.direction = 'left'
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            object.direction = 'right'
            break;
        default:
            break;
    }
        
    moveElement(object)
}


function getElementPosition(element){
   let rect  = element.getBoundingClientRect();

   console.log({rect})

   return { left : rect.x, top : rect.y }
}

function setPlayerInitialPosition({player , position }){
    player.style.position = 'absolute';
    player.style.top = `${position.top}px`;
    player.style.left = `${position.left}px`;
}

function isPositionAllowed({top , left}){

    let positionLimits = { 
        top : { min : 18 , max : 378 },
        left : { min : 18 , max : 618 },
    }

    if(top >= positionLimits.top.min && top <= positionLimits.top.max && left <= positionLimits.left.max && left >= positionLimits.left.min ){
        return true;
    }

    return false;
}
