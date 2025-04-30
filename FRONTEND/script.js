


document.getElementById("sendButton").addEventListener('click', function() 
{

    let input = document.getElementById('fibonacciInput').value;
    
    fetch('https://localhost:44342/api/Fibonacci', 
    {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Number(input))
    })
    .then(response => response.json())
    .then(data => 
    {
        fibonacci=data;
        console.log(fibonacci.sequenceArray); 
        
         
    })
    .catch(error => console.error('Hiba történt:', error));
});

