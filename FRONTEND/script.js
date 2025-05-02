let fibonacci;

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
    
    let ratio = 300 / sequenceArray[sequenceArray.length-1]
    for (let i = 0; i < sequenceArray.length; i++) 
    {
        let square = document.createElement("canvas")
        square.id = "square" + sequenceArray[i];
        square.width=sequenceArray[i]*ratio;
        square.height=sequenceArray[i]*ratio;
        square.style.backgroundColor= "sandybrown";
        square.style.border= "1px solid black";

        container.appendChild(square);
        
    }
    
    return container
}





function FibonacciDrawer(fibonacci)
{
    let container = document.getElementById("container");
    container.innerHTML="";
    container.appendChild(GenerateSquares(fibonacci.sequenceArray));
}

document.getElementById("sendButton").addEventListener("click", () => GetFibonacci(document.getElementById('fibonacciInput').value));


