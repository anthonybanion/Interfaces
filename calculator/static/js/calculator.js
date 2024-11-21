let operation = "";
let result = false;

function ingresar(worth) {
    if (result) {
        operation = worth;
        result = false;
    } else {
        operation += worth;
    }
    document.getElementById("calcular_screen").innerText = operation;
}

function operar(operador) {
    operation += operador;
    document.getElementById("calcular_screen").innerText = operation;
}

function limpiar() {
    operation = "";
    document.getElementById("calcular_screen").innerText = "0";
}

function borrar() {
    operation = operation.slice(0, -1);
    document.getElementById("calcular_screen").innerText = operation || "0";
}

function calcular() {
    try {
        operation = eval(operation);
        document.getElementById("calcular_screen").innerText = operation;
        result = true;
    } catch (e) {
        document.getElementById("calcular_screen").innerText = "Error";
    }
}
 

