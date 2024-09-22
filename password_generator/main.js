/* Brief: Generador de contraseñas
  Detalis: La contraseña tiene que tener al menos 8 caracteres, 
        una mayuscula, una minuscula, un numero y un caracter especial.
  Date: 20/09/2024 */
let elemento = document.getElementById('cantidad');
let contrasena = document.getElementById('contrasena');
let generar = document.getElementById('generar');
let clear = document.getElementById('limpiar');
let parrafo = document.getElementById('parrafo');
const letters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';

function generate(){
    let password="";
    let cantidad = parseInt(elemento.value);
    if(cantidad < 8){
        alert("La cantidad de caracteres tiene que ser mayor que 8");
    } else{
        for(let i = 0; i < cantidad; i++){
            let random_character =  letters[Math.floor(Math.random()*letters.length)];  // Genero un caracter aleatorio
            password += random_character;
        }
    }
contrasena.value = password;

function validatePassword(pw) {  // Para validar la contraseña uso expresiones regulares

    return /[A-Z]/       .test(pw) &&
           /[a-z]/       .test(pw) &&
           /[0-9]/       .test(pw) &&
           /[!-/]/        .test(pw) ||
           /[:-@]/        .test(pw) ||
           /[\[-`]/        .test(pw) &&
            pw.length >= 8;
}

let validar = validatePassword(password); 
if(validar){  // Si la contraseña es segura o no
    parrafo.innerHTML = "Contraseña segura";
    parrafo.style.color = "green";
} else{
    parrafo.innerHTML = "Contraseña insegura";
    parrafo.style.color = "red";
}

generar.setAttribute('disabled','true'); // Deshabilito el boton de generar
clear.removeAttribute('disabled'); // Habilito el boton de limpiar
}

function limpiar(){ // Funcion para limpiar los campos
    contrasena.value = "";
    clear.setAttribute('disabled','true');
    generar.removeAttribute('disabled');
    parrafo.innerHTML = "";
}

