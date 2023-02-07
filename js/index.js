main();

function main(){

    const hello =  () => {
        console.log("Hello");
    }
    const bye = () => {
        console.log("bye");
    }

    let playArea = document.getElementById("playArea")
    playArea.addEventListener("mouseenter", hello);
    playArea.addEventListener("mouseleave", bye);
}

