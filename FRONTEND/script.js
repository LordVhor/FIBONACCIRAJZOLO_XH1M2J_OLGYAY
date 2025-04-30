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
        })
        .catch(error => console.error('Error:', error));
}




document.getElementById("sendButton").addEventListener("click", () => GetFibonacci(document.getElementById('fibonacciInput').value));


