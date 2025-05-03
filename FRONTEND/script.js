let fibonacci;
let maxSize = 500;
function GetFibonacci(iteration)
{
    fetch('https://localhost:44342/api/Fibonacci', 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Number(iteration))
        })
        .then(response => response.json())
        .then(data => 
        {
            fibonacci=data;
            console.log(fibonacci.sequenceArray); 
            FibonacciDrawer(fibonacci);
        })
        .catch(error => console.error('Error:', error));
}

function GenerateSquares(sequenceArray)
{
    let container = document.createElement("div");
    
    let ratio = maxSize / sequenceArray[sequenceArray.length-1]
    for (let i = 0; i < sequenceArray.length; i++) 
    {
        let square = document.createElement("canvas");
        square.id = "square" + i;
        square.width=sequenceArray[i]*ratio;
        square.height=sequenceArray[i]*ratio;
        square.style.backgroundColor= "sandybrown";
        square.style.border= "1px solid black";

        container.appendChild(square);
        
    }
    
    return container
}

function PositionGenerator(sequenceArray)
{
    let positions = [];
    let dir = 0;
    const unit = maxSize/sequenceArray[sequenceArray.length-1];
    let x = 0;
    let y = 0;
    for (let i = sequenceArray.length-1; i >= 1 ; i--) 
    {
        positions.push([x,y]);
        console.log(x + " ; " + y)
        let size = sequenceArray[i] * unit;
        let nextsize = sequenceArray[i-1] * unit;
        switch (dir % 4) 
        {
            case 0: 
                x += size;
                break;
            case 1: 
                y += size;
                x += size - nextsize
                break;
            case 2: 
                x -= nextsize;
                y += size - nextsize
                break;
            case 3: 
                y -= nextsize;
                break;
        }
        dir += 1;
    };
    return positions;
}

function ArangeSquares(fibonacci, container)
{
    container.style.position = "relative";
    positions = PositionGenerator(fibonacci.sequenceArray);
    let j = 0;
    for (let i = fibonacci.sequenceArray.length-1; i >= 1 ; i--) 
    {
        let square = document.getElementById("square"+i);
        square.style.position = "absolute";
        square.style.left = positions[j][0] + 'px';
        square.style.top = positions[j][1] + 'px';

        j +=1 ;
    };
}

function FillWithNumbers(fibonacci, container)
{
    let ratio = maxSize / fibonacci.sequenceArray[fibonacci.sequenceArray.length - 1];

    for (let i = 0; i < fibonacci.sequenceArray.length; i++) 
    {
        let square = container.querySelector("#square" + i);
        if (!square) continue;

        let size = fibonacci.sequenceArray[i] * ratio;

        if (size >= 20) 
        {
            let ctx = square.getContext("2d");
            ctx.font = `${Math.floor(size / 6)}px Arial`;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(fibonacci.sequenceArray[i], size / 2, size / 2);
        }
    }
}

function DrawFibonacciSpiral(fibonacci,container)
{
    let j = 0;
    let ratio = maxSize / fibonacci.sequenceArray[fibonacci.sequenceArray.length - 1];

    
    for (let i = fibonacci.sequenceArray.length; i >= 1 ; i--) 
    {
        let square = container.querySelector("#square" + i);
        if (!square) continue;

        let size = fibonacci.sequenceArray[i] * ratio;

        var ctx = square.getContext("2d");
        ctx.beginPath();
        switch (j % 4) 
        {
            case 0:                
                ctx.arc(size,size,size,0,2*Math.PI);
                break;
            case 1:
                ctx.arc(0,size,size,0,2*Math.PI);
                break;
            case 2:
                ctx.arc(0,0,size,0,2*Math.PI);
                break;
            case 3: 
                ctx.arc(size,0,size,0,2*Math.PI);               
                break;
        }
        ctx.stroke();
        j += 1;
        
        

        
    }
}



function FibonacciDrawer(fibonacci)
{
    let container = document.getElementById("container");
    container.innerHTML="";
    container.appendChild(GenerateSquares(fibonacci.sequenceArray));
    ArangeSquares(fibonacci,container);
    FillWithNumbers(fibonacci,container);
    DrawFibonacciSpiral(fibonacci,container);
}

document.getElementById("sendButton").addEventListener("click", () => GetFibonacci(document.getElementById('fibonacciInput').value));


