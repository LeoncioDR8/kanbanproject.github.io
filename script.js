const task = {
    id: '',
    name: '',
    description: '',
    responsible: ''
}

let isEditing = false;
let isValid = false;

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.currentTarget.appendChild(document.getElementById(data));
}

function createTask(event) {
    event.preventDefault();

    validateFields(
        document.getElementById("task-name").value,
        document.getElementById("task-description").value
    );

    if (isValid) {
        if (isEditing) {
            const taskDiv = document.getElementById(task.id);
            taskDiv.childNodes[0].textContent = document.getElementById("task-name").value;
            taskDiv.childNodes[1].textContent = document.getElementById("task-description").value;
            taskDiv.childNodes[2].textContent = document.getElementById("task-responsible").value;

            const editButton = document.getElementById("btn-create-edit");
            editButton.value = "Create Task";
            editButton.classList.remove('btn-edit');
            editButton.classList.add('btn-create');
        } else {
            task.name = document.getElementById("task-name").value;
            task.description = document.getElementById("task-description").value;
            task.responsible = document.getElementById("task-responsible").value;

            registerTask();
        }
    }
}

function validateFields(name, description) {
    if (name === '' || description === '') {
        alert('Please provide a name and description for the task.');
        isValid = false;
    } else {
        isValid = true;
    }
}

function registerTask() {
    task.id = new Date().getTime();

    const pending = document.getElementById("pending");

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('id', task.id);
    taskDiv.setAttribute('draggable', true);
    taskDiv.setAttribute('ondragstart', 'drag(event)');

    const namePara = document.createElement('p');
    namePara.textContent = task.name;

    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = task.description;

    const responsiblePara = document.createElement('p');
    responsiblePara.textContent = task.responsible;

    const editButton = document.createElement('input');
    editButton.classList.add('btn-create');
    editButton.type = 'button';
    editButton.value = 'Edit';
    editButton.onclick = function () {
        isEditing = true;
        task.id = taskDiv.getAttribute('id');
        task.name = namePara.textContent;
        task.description = descriptionPara.textContent;
        task.responsible = responsiblePara.textContent;
        editTask();
    };

    const deleteButton = document.createElement('input');
    deleteButton.classList.add('btn-delete');
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    deleteButton.onclick = function () {
        taskDiv.remove();
    };

    taskDiv.appendChild(namePara);
    taskDiv.appendChild(descriptionPara);
    taskDiv.appendChild(responsiblePara);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);
    pending.appendChild(taskDiv);
}

function editTask() {
    const editButton = document.getElementById("btn-create-edit");
    editButton.value = "Edit Task";
    editButton.classList.remove('btn-create');
    editButton.classList.add('btn-edit');

    document.getElementById("task-name").value = task.name;
    document.getElementById("task-description").value = task.description;
    document.getElementById("task-responsible").value = task.responsible;
}
