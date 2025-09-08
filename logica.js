function operacionAleatoria() {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;

    const operaciones = ["+", "-", "*", "/"];
    const op = operaciones[Math.floor(Math.random() * operaciones.length)];

    let resultado;

    switch (op) {
        case "+":
            resultado = a + b;
            break;
        case "-":
            resultado = a - b;
            break;
        case "*":
            resultado = a * b;
            break;
        case "/":
            if (b === 0) return operacionAleatoria();
            resultado = a / b;
            break;
    }

    let expresion = `${a} ${op} ${b}`;
    return { expresion: expresion, resultado: resultado};
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('GET response:', data);
    })
    .catch(error => console.error('Error fetching data:', error));

const operacion = operacionAleatoria();
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question: `A cuanto evalua (${operacion.expresion}`, answer: operacion.resultado, correct: false})
})
    .then(response => response.json())
    .then(data => {
        console.log('POST response:', data);
    })
    .catch(error => console.error('Error posting data:', error));

function mostrarExpresion(){
    const pregunta = document.getElementById("pregunta");
    pregunta.textContent = `${package.jso}`
}