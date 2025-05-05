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
            AfterResposnse(fibonacci)
        })
        .catch(error => console.error('Error:', error));
}

function GenerateSquares(sequenceArray)
{
    let container = document.createElement("div");
    
    
    let ratio = maxSize / sequenceArray[sequenceArray.length-1];
    for (let i = 0; i < sequenceArray.length; i++) 
    {
        let square = document.createElement("canvas");
        square.id = "square" + i;
        square.width=sequenceArray[i]*ratio;
        square.height=sequenceArray[i]*ratio;
        let lightness = 20 + (i / sequenceArray.length) * 50;
        square.style.backgroundColor = `hsl(40, 97%, ${lightness}%)`;

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
            ctx.font = `lighter ${Math.floor(size / 6)}px Arial`;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(fibonacci.sequenceArray[i], size / 2, size / 2);
        }
    }
}

function DrawFibonacciSpiral(fibonacci, container)
{
    
    let j = fibonacci.sequenceArray.length + 2;
    let ratio = maxSize / fibonacci.sequenceArray[fibonacci.sequenceArray.length - 1];

    let i = 1;

    function DrawNextPartOfSpiral()
    {
        if (i >= fibonacci.sequenceArray.length) return;

        let square = container.querySelector("#square" + i);
        if (!square) 
        {
            i++;
            DrawNextPartOfSpiral();
            return;
        }

        let size = fibonacci.sequenceArray[i] * ratio;
        let ctx = square.getContext("2d");

        let startAngle;
        let endAngle;
        let varAngle;

        let cx, cy;

        switch (j % 4)
        {
            case 0: 
                cx = size;
                cy = size;
                startAngle = 1.5 * Math.PI;
                endAngle = 1 * Math.PI;
                varAngle = 1.5 * Math.PI;
                break;
            case 1:
                cx = 0;
                cy = size;
                startAngle = 2 * Math.PI;
                endAngle = 1.5 * Math.PI;
                varAngle = 2 * Math.PI;
                break;
            case 2:
                cx = 0;
                cy = 0;
                startAngle = 0.5 * Math.PI;
                endAngle = 0 * Math.PI;
                varAngle = 0.5 * Math.PI;
                break;
            case 3:
                cx = size;
                cy = 0;
                startAngle = 1 * Math.PI;
                endAngle = 0.5 * Math.PI;
                varAngle = 1 * Math.PI;
                break;
        }

        const step = fibonacci.logTime/80;

        function Animation()
        {
            ctx.clearRect(0, 0, square.width, square.height);

            
            ctx.strokeStyle = "#4282c2";
            ctx.lineWidth = 5;

            ctx.beginPath();
            ctx.arc(cx, cy, size, startAngle, varAngle, true);
            FillWithNumbers(fibonacci,container);
            ctx.stroke();

            if (varAngle > endAngle)
            {
                varAngle -= step;
                requestAnimationFrame(Animation);
            }
            else
            {
                i++;
                j--;
                DrawNextPartOfSpiral();
            }
        }

        Animation();
        
    }

    DrawNextPartOfSpiral();
}

function WriteNumbers(sequenceArray)
{
    let numbers = document.getElementById("numbers");
    numbers.style.width=2*maxSize + "px";
    numbers.innerHTML= `The numbers for the ${sequenceArray.length}th iterations are as follows:`;
    let sequence = document.createElement("p");
    for (let i = 0; i < sequenceArray.length-1; i++) 
    {
        sequence.innerHTML+= sequenceArray[i] +", " ;
        
    }
    sequence.innerHTML += sequenceArray[sequenceArray.length-1];
    sequence.classList.add("list");
    numbers.appendChild(sequence);

    let spiralDrawerButton = document.getElementById("spiralDrawerButton");
    spiralDrawerButton.disabled=true;
}




function FibonacciSquaresDrawer(fibonacci,container)
{
    container.innerHTML="";

    container.appendChild(GenerateSquares(fibonacci.sequenceArray));
    ArangeSquares(fibonacci,container);
    FillWithNumbers(fibonacci,container);

    let spiralDrawerButton = document.getElementById("spiralDrawerButton");
    spiralDrawerButton.disabled=false;
}


function AfterResposnse(fibonacci)
{
    let container = document.getElementById("container");
    container.innerHTML="";


    let lastValue = fibonacci.sequenceArray[fibonacci.sequenceArray.length-1];
    let previousValue = fibonacci.sequenceArray[fibonacci.sequenceArray.length-2];
    let ratio = maxSize / lastValue;

    container.style.width = (lastValue + previousValue) * ratio + "px";
    container.style.height = lastValue*ratio + "px";

    WriteNumbers(fibonacci.sequenceArray);
    
    

    let squareGeneratorButton = document.getElementById("squareGeneratorButton");
    squareGeneratorButton.disabled = false;

    
}
function Run()
{
    document.getElementById("sendButton").addEventListener("click", () => GetFibonacci(document.getElementById('fibonacciInput').value));
    document.getElementById("squareGeneratorButton").addEventListener("click", () => FibonacciSquaresDrawer(fibonacci,container));
    document.getElementById("spiralDrawerButton").addEventListener("click", () => DrawFibonacciSpiral(fibonacci,container));
}

Run();


