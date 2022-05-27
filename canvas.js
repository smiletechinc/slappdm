var hand = new Image();   // Create new img element
hand.src = './handFinal.png';

var will = new Image();
will.src = './shahbaz_sharif_1.jpeg';


function continueBox(){

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    widthSize = canvas.width / 10;
    textSize = widthSize 

    ctx.font = textSize + "px Arial";
    ctx.fillText("How hard", canvas.width/4, canvas.height/4, widthSize *10);
    ctx.fillText("can you slap", (canvas.width/6) + 5, (canvas.height/3), widthSize *10);
    
    ctx.drawImage(will,canvas.width / 4, canvas.height/2.9, widthSize*4, widthSize*4);

    ctx.fillText("Touch To Start", (canvas.width/6) + 5, (canvas.height/1.8), widthSize *10);
    

    canvas.addEventListener("touchstart", drawGame);
}

function drawGame(){

    

    console.log("Hello from Sam");

    // Canvas and context
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    var sound = new Audio();
    sound.src = "./slap.mp3";

    console.log("Sound is playing");
    
    // Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    initialHandX = canvas.width / 10;
    initialHandY = canvas.height / 10 * 4;

    initialWillX = canvas.width / 10 * 8;
    initialWillY = canvas.height / 10 * 4;

    initialTextX = canvas.width / 10 * 4;
    initialTextY = canvas.height / 10 * 2;

    widthSize = canvas.width / 10;
    heightSize = widthSize; 
    textSize = widthSize *2;

    //  Drawing hand and will to its initial locations
    ctx.drawImage(hand,initialHandX,initialHandY, widthSize, heightSize);
    ctx.drawImage(will,initialWillX,initialWillY, widthSize, heightSize);
    ctx.font = widthSize + "px Arial";
    ctx.fillText("0 km/h", initialTextX, initialTextY, widthSize *4);

    will.src = './shahbaz_sharif_2.jpeg'; 

    // Variables
    let dragging = false;
    
    // For distance calculation
    let x1 = initialHandX;
    let y1 = initialHandY; 

    let x2 = 0;
    let y2 = 0;

    let distance = 0;

    // For speed calculation
    var startDate;
    var endDate;
    let speed;
    
    // console.log("Current Time: ", time);
    
    // For removing the hand while moving
    removePositionx = initialHandX;
    removePositiony =initialHandY;

    function calculateSpeed(){
        var a = x1 - x2;
        var b = y1 - y2;

        endDate = new Date();

        console.log("X1: ", x1, "X2: ", x2);

        console.log("A: ", a, "B: ", b);

        var c = Math.sqrt( a*a + b*b );

        console.log("Distance: ", c);

        console.log("TIME DIFF: ", (endDate.getTime() - startDate.getTime()) / 1000);

        speed = c / ((endDate.getTime() - startDate.getTime()) / 1000);

        console.log("Speed: ", speed);

    }

    function startPosition(e){

        hand.src = './hand2Final.png';

        startDate = new Date();

        const rect = canvas.getBoundingClientRect()
        const sx1 = e.x - rect.left
        const sy1 = e.y - rect.top
        console.log("x1: " + sx1 + " y1: " + sy1)

        x1 = sx1;
        y1 = sy1;
    
        if(x1 > initialHandX && x1 < initialHandX + heightSize && y1 > initialHandY && y1 < initialHandY + heightSize){
            dragging = true;
        }
        

    }

    function finishedPosition(e){

        hand.src = './handFinal.png'

        dragging = false;

        calculateSpeed();

        
    }

    function eraseText(){

        var handData = ctx.createImageData(textSize*2, textSize);
        for (var i = handData.data.length; --i >= 0; ){
            handData.data[i] = 0;
        }
        ctx.putImageData(handData, initialTextX, initialTextY - heightSize);

        var willData = ctx.createImageData(heightSize, heightSize);
        for (var i = willData.data.length; --i >= 0; ){
            willData.data[i] = 0;
        }
        ctx.putImageData(willData, initialWillX, initialWillY);

        console.log("I am here coffee");
        
    }

    const drawText = async () => {

        console.log("I am here Tea");

        ctx.font = widthSize + "px Arial";

        ctx.fillStyle = "#87CEEB"
        
        if((speed / 300).toFixed(0) > 30){
            ctx.fillStyle = "#87DC3D"
        }
        ctx.fillText((speed / 300).toFixed(0)+" km/h", initialTextX, initialTextY, widthSize*4);

        ctx.drawImage(will, initialWillX, initialWillY, heightSize, heightSize);

        window.stop();
        await new Promise(r => setTimeout(r, 2000));
        location.reload();
        
    }

    function playSound(){
        sound.muted = true;
        sound.play();
        sound.muted = false;
        sound.play();
    }

    function draw(e) {
        if(!dragging) return;

        var handData = ctx.createImageData(heightSize, heightSize);
        for (var i = handData.data.length; --i >= 0; ){
            handData.data[i] = 0;
        }
        ctx.putImageData(handData, removePositionx, removePositiony);

        const rect = canvas.getBoundingClientRect()
        const dx1 = e.clientX - rect.left
        const dy1 = e.clientY - rect.top
        console.log("x3: " + dx1 + " y3: " + dy1);

        ctx.drawImage(hand, dx1-(heightSize/2), dy1-(heightSize / 2), heightSize, heightSize);
        removePositionx = dx1-(heightSize/2);
        removePositiony = dy1-(heightSize/2);

        x2 = removePositionx;
        y2 = removePositiony;
        
        if(removePositionx > initialWillX - heightSize && removePositiony > initialHandY - heightSize && removePositiony < initialHandY + heightSize){

            dragging = false;

            eraseText();
            playSound();
            calculateSpeed();
            drawText();
        }
        
    }

    function startPositionForMobile(e){

        hand.src = './hand2Final.png'

        startDate = new Date();

        dragging = true;
 
        const rect = canvas.getBoundingClientRect()
        const sx1 = e.touches[0].clientX - rect.left
        const sy1 = e.touches[0].clientY - rect.top
        console.log("x1: " + sx1 + " y1: " + sy1)

        x1 = sx1;
        y1 = sy1;
    }

    function finishedPositionForMobile(e){
        hand.src = './handFinal.png'

        dragging = false;
    }


    function drawForMobile(e){
        if(!dragging) return;

        // console.log("Touching: ", e.touches[0].clientX, e.touches[0].clientY);

        var handData = ctx.createImageData(heightSize, heightSize);
        // console.log("Hand: ", handData);
        for (var i = handData.data.length; --i >= 0; ){
            handData.data[i] = 0;
        }
        ctx.putImageData(handData, removePositionx, removePositiony);

        const rect = canvas.getBoundingClientRect()
        const dx1 = e.touches[0].clientX - rect.left
        const dy1 = e.touches[0].clientY - rect.top
        console.log("x3: " + dx1 + " y3: " + dy1);

        ctx.drawImage(hand, dx1-(heightSize/2), dy1-(heightSize/2), heightSize, heightSize);
        removePositionx = dx1 - (heightSize/2);
        removePositiony = dy1 - (heightSize/2);

        x2 = removePositionx;
        y2 = removePositiony;

        if(removePositionx > initialWillX - heightSize && removePositiony > initialHandY - heightSize && removePositiony < initialHandY + heightSize){

            dragging = false;

            eraseText();
            sound.play();
            calculateSpeed();
            drawText();
        }        

    }


    function changeShape(){
        canvas.style.cursor = 'pointer';
    }


    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", startPositionForMobile);
    canvas.addEventListener("touchend", finishedPositionForMobile);
    canvas.addEventListener("touchmove", drawForMobile);

    canvas.addEventListener("mouseenter", changeShape);


}

window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

if(window.mobileAndTabletCheck()){
    console.log("mobile");
    window.addEventListener("load", continueBox);
}else{
    console.log("desktop");
    window.addEventListener("load", drawGame);
}



