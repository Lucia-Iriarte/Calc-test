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


function generarOpciones(correcto) {
    const opciones = new Set([correcto]);
    while (opciones.size < 4) {
        let delta = Math.floor(Math.random() * 10) + 1;
        let opcion = correcto + (Math.random() < 0.5 ? -delta : delta);
        opciones.add(opcion);
    }
    return Array.from(opciones).sort(() => Math.random() - 0.5);
}

function mostrarPregunta() {
    const operacion = operacionAleatoria();
    const preguntaElem = document.getElementById("pregunta");
    const opcionesElem = document.getElementById("opciones");
    const feedbackElem = document.getElementById("feedback");
    preguntaElem.textContent = `¿A cuánto evalúa (${operacion.expresion})?`;
    const opciones = generarOpciones(operacion.resultado);
    opcionesElem.innerHTML = "";
    opciones.forEach((opcion, idx) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type='radio' name='opcion' value='${opcion}' required> ${opcion}`;
        opcionesElem.appendChild(label);
        opcionesElem.appendChild(document.createElement("br"));
    });
    feedbackElem.textContent = "";
    opcionesElem.dataset.correcto = operacion.resultado;
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarPregunta();
    document.getElementById("quizForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const opcionesElem = document.getElementById("opciones");
        const correcto = Number(opcionesElem.dataset.correcto);
        const seleccionada = document.querySelector("input[name='opcion']:checked");
        const feedbackElem = document.getElementById("feedback");
        if (seleccionada) {
            if (Number(seleccionada.value) === correcto) {
                feedbackElem.textContent = "¡Correcto!";
                feedbackElem.style.color = "green";
            } else {
                feedbackElem.textContent = "Incorrecto. Intenta de nuevo.";
                feedbackElem.style.color = "red";
            }
        }
    });
});