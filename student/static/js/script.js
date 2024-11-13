// Array global para almacenar los estudiantes
let students = JSON.parse(localStorage.getItem('students')) || []; // Usamos directamente `students` desde localStorage al inicio.

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
    // Esta es solo una estructura básica, puedes personalizarla según tus necesidades
    // Por ejemplo, puedes usar un formulario modal para editar los datos del estudiante
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const form = document.createElement('form');
    form.classList.add('modal__form');

    // Create input fields for each property of the student
    for (const key in student) {
        const label = document.createElement('label');
        label.textContent = key;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = student[key];
        input.name = key;
        label.appendChild(input);
        form.appendChild(label);
    }

    // Create submit button
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Save';
    form.appendChild(submitButton);

    // Add form to modal
    modal.appendChild(form);

    // Add modal to the document body
    document.body.appendChild(modal);

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Update student object with form values
        for (const key in student) {
            student[key] = form.elements[key].value;
        }

        // Update localStorage and show updated table
        localStorage.setItem('students', JSON.stringify(students));
        showStudents();

        // Remove modal from the document body
        document.body.removeChild(modal);
    });



    // const name = prompt("Edit Name:", student.name);
    // if (name !== null) {
    //     student.name = name;
    // }

    // const lastName = prompt("Edit Last Name:", student.lastName);
    // if (lastName !== null) {
    //     student.lastName = lastName;
    // }

    // Deberías seguir para las otras propiedades, como `dni`, `email`, `phone`, `address`, etc.

    // Actualizar el array y `localStorage`
    localStorage.setItem('students', JSON.stringify(students));
    showStudents(); // Actualizar la tabla con los nuevos valores
}

// Inicializar la tabla con los estudiantes guardados en `localStorage`
showStudents();
