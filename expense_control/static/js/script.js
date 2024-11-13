/*Brief: Expense Control
 *Detalis: Expense data is entered and displayed in a list
 *Date: 20/09/2024*/


let listaNombresGastos=[];
let listaValoresGastos=[];
let listaDescripcionGastos=[];
const LIMITEGASTO = 150;

function clickBoton(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;
    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionGastos.push(descripcionGasto);
    actualizarListasGastos();

}

function actualizarListasGastos(){
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElemento = document.getElementById('totalGastos');
    let htmlLista='';
    let totalGastos=0;
    listaNombresGastos.forEach((elemento, posicion)=>{  // forEach es un metodo que recorre un array
        const valorGastos = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionGastos[posicion];
        // htmlLista="<li>" + elemento + "</li>"   
        htmlLista +=`<li>${elemento} - USD ${valorGastos.toFixed(2)} 
        ${(valorGastos>=LIMITEGASTO)?'Gasto elevado':''} 
        <div><button class="boton" onclick="modificar(${posicion});">Modificar</button>
        <button class="boton" onclick="eliminar(${posicion});">Eliminar</button></div>
        </li>`;  // Agrero los <li>, usamos condicional triple para el gasto elevado, y agregamos un boton para modificar y eliminar
        
        totalGastos+=Number(valorGastos);
    });
    listaElementos.innerHTML=htmlLista;
    totalElemento.innerHTML= totalGastos.toFixed(2);
    limpiar();
}

function limpiar() {
   document.getElementById('nombreGasto').value='';
    document.getElementById('valorGasto').value='';
    document.getElementById('descripcionGasto').value='';
}

function eliminar(posicion){
    listaNombresGastos.splice(posicion,1);
    listaValoresGastos.splice(posicion,1);
    actualizarListasGastos();
}

function modificar(posicion){
    document.getElementById('nombreGasto').value=listaNombresGastos[posicion];
    document.getElementById('valorGasto').value=listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value=listaDescripcionGastos[posicion];
    const botoFormulario = document.getElementById('botonFormulario');
    botoFormulario.innerHTML='Actualizar Gasto';  // Cambio el texto del boton
    
    botoFormulario.onclick = function(){  // Cambio la funcion del boton
        listaNombresGastos[posicion]=document.getElementById('nombreGasto').value;
        listaValoresGastos[posicion]=document.getElementById('valorGasto').value;
        listaDescripcionGastos[posicion]=document.getElementById('descripcionGasto').value;
        actualizarListasGastos();
        botoFormulario.innerHTML='Agregar Gasto';  // Vuelvo al texto original
        botoFormulario.onclick=clickBoton;  // Vuelvo a la funcion original
    }
}