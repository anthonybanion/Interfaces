// Array global para almacenar los estudiantes
let students = JSON.parse(localStorage.getItem('students')) || []; 

// Función para agregar un estudiante al array de estudiantes
function addStudent(form) {
    // Crear un objeto con los datos del formulario
    const student = {
        name: form.form__name.value,
        lastName: form.form__lastName.value,
        dni: form.form__dni.value,
        email: form.form__email.value,
        phone: form.form__phone.value,
        address: form.form__address.value
    };

    // Validar que todos los campos estén llenos
    if (Object.values(student).some(value => value === "")) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Añadir el estudiante al array
    students.push(student);

    // Convertir el array a una cadena JSON y almacenarlo en localStorage
    localStorage.setItem('students', JSON.stringify(students));

    // Opcional: Limpiar el formulario y mostrar la tabla actualizada
    form.reset();
    showStudents();
}

// Función para mostrar los estudiantes en la tabla
function showStudents() {
    const tableBody = document.getElementById('table__body');
    tableBody.innerHTML = ''; // Limpiar el tbody

    // Iterar sobre los estudiantes y crear una fila por cada uno
    students.forEach(student => {
        const row = document.createElement('tr');
        row.classList.add('table__row');

        // Crear celdas para cada propiedad del estudiante
        for (const key in student) {
            const cell = document.createElement('td');
            cell.classList.add('table__data');
            cell.textContent = student[key];
            row.appendChild(cell);
        }

        // Botones para limpiar o modificar
        const buttonCell = document.createElement('td');
        buttonCell.classList.add('table__data');
        
        // Botón para limpiar (eliminar)
        const cleanButton = document.createElement('input');
        cleanButton.classList.add('table__button');
        cleanButton.type = 'button';
        cleanButton.value = 'Clean';
        cleanButton.onclick = () => cleanStudent(student);
        
        // Botón para modificar (editar)
        const modifyButton = document.createElement('input');
        modifyButton.classList.add('table__button');
        modifyButton.type = 'button';
        modifyButton.value = 'Modify';
        modifyButton.onclick = () => modifyStudent(student);

        buttonCell.appendChild(cleanButton);
        buttonCell.appendChild(modifyButton);
        row.appendChild(buttonCell);

        // Agregar la fila al cuerpo de la tabla
        tableBody.appendChild(row);
    });
}

// Función para limpiar (eliminar) un estudiante
function cleanStudent(student) {
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1); // Eliminar el estudiante del array
        localStorage.setItem('students', JSON.stringify(students)); // Actualizar localStorage
        showStudents(); // Actualizar la tabla
    }
}

// Función para modificar (editar) un estudiante
function modifyStudent(student) {
    const index = students.indexOf(student);

    // Seleccionar la fila que corresponde al estudiante
    const tableBody = document.getElementById('table__body');
    const row = tableBody.children[index];
    
    // Limpiar la fila para reemplazar sus celdas con inputs
    row.innerHTML = '';

    // Crear inputs para cada campo del estudiante
    for (const key in student) {
        const cell = document.createElement('td');
        cell.classList.add('table__data');

        const input = document.createElement('input');
        input.type = 'text';
        input.value = student[key];
        input.classList.add('table__input');
        input.dataset.key = key;  // Usamos dataset para saber qué propiedad se está editando

        cell.appendChild(input);
        row.appendChild(cell);
    }

    // Crear celda para los botones "Guardar" y "Cancelar"
    const buttonCell = document.createElement('td');
    buttonCell.classList.add('table__data');

    // Botón "Guardar" para confirmar los cambios
    const saveButton = document.createElement('input');
    saveButton.type = 'button';
    saveButton.value = 'Save';
    saveButton.classList.add('table__button');
    saveButton.onclick = () => saveStudent(index, row);

    // Botón "Cancelar" para deshacer cambios
    const cancelButton = document.createElement('input');
    cancelButton.type = 'button';
    cancelButton.value = 'Cancel';
    cancelButton.classList.add('table__button');
    cancelButton.onclick = showStudents;  // Simplemente recarga la tabla

    buttonCell.appendChild(saveButton);
    buttonCell.appendChild(cancelButton);
    row.appendChild(buttonCell);
}

// Función para guardar los cambios realizados en un estudiante
function saveStudent(index, row) {
    // Recuperar el estudiante en el índice dado
    const student = students[index];

    // Actualizar los datos del estudiante con los valores de los inputs
    Array.from(row.querySelectorAll('input.table__input')).forEach(input => {
        const key = input.dataset.key;
        student[key] = input.value;
    });

    // Actualizar el array y `localStorage`
    localStorage.setItem('students', JSON.stringify(students));
    
    // Volver a mostrar la tabla con los nuevos valores
    showStudents();
}

showStudents();
