// Date Display:


    // step One : Get the current date
        let todayDate = new Date();
    // step Two : Convert the date to a string format
        let dateString = todayDate.toDateString();
    // step Three : Create a new <h2> element to hold the date
        let dateh2 = document.createElement('h2');
        dateh2.textContent = dateString;
    // step Four : Find the <h1> element
        let h1Element = document.querySelector('h1');
    // step Five : Insert the dateheading after the <h1> element
        h1Element.insertAdjacentElement('afterend', dateh2);

        //  Note:
            // The reason for converting the date to a string is that the textContent property of HTML elements can only accept strings as their values
            // And By converting the date to a string using toDateString(), you get a cleaner and more readable date format like "Mon Jul 26 2023".
            // So, the conversion to string is necessary in this code to present the date information in a human-readable format on the web page.





// Function to save tasks to the local storage
function saveTasksToLocalStorage() {
    // Create an empty array to store task texts
    let tasks = [];

    // Retrieve all elements with class 'card-text', which represent the task paragraphs
    let taskCards = document.querySelectorAll('.card-text');

    // Iterate through each task paragraph and add its text content to the 'tasks' array
    taskCards.forEach((taskCard) => tasks.push(taskCard.textContent));

    // Convert the 'tasks' array to a JSON string and store it in the local storage with the key 'tasks'
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from the local storage and display them as cards
function loadTasksFromLocalStorage() {
    // Retrieve the saved tasks from the local storage by parsing the JSON string
    // If there are no saved tasks or the local storage is empty, set 'savedTasks' to an empty array
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Get the container element that will hold the task cards
    let cardContainer = document.getElementById('cardContainer');

    // Iterate through each saved task text and create a new task card to display it
    savedTasks.forEach((taskText) => {
        let newTask = document.createElement('div');
        newTask.classList.add('card');
        newTask.innerHTML = `
            <div class="card-body">
                <p class="card-text">${taskText}</p>
                <button type="button" class="btn btn-primary btn-sm" onclick="updateTask(this)">Update</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        // Append the new task card to the container element, so it becomes visible on the page
        cardContainer.appendChild(newTask);
    });
}

// Function to add a new task
function addTask() {
    // Get the task input element by its ID 'addTask'
    let taskInput = document.getElementById('addTask');

    // Get the text entered by the user in the task input field and remove leading/trailing spaces
    let taskText = taskInput.value.trim();

    // Check if the task text is not an empty string (i.e., user entered some text)
    if (taskText !== '') {
        // Get the container element that will hold the list of tasks by its ID 'cardContainer'
        let cardContainer = document.getElementById('cardContainer');

        // Create a new <div> element to represent the task as a card
        let newTask = document.createElement('div');
        newTask.classList.add('card');

        // Set the HTML content of the new <div> element using template literals to display the task text inside a card
        newTask.innerHTML = `
            <div class="card-body">
                <p class="card-text">${taskText}</p>
                <button type="button" class="btn btn-primary btn-sm" onclick="updateTask(this)">Update</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        // Append the new task (card) to the container element, so it becomes visible on the page
        cardContainer.appendChild(newTask);

        // Clear the task input field after adding the task to reset it for the next entry
        taskInput.value = '';

        // Save the tasks to local storage after adding a new task
        saveTasksToLocalStorage();
    }
}

// Function to update a task
function updateTask(updateButton) {
    // Prompt the user to enter the updated task text
    let newTaskText = prompt('Enter the updated task text:');

    // Check if the user entered text (not null) and it is not just whitespace after trimming
    if (newTaskText !== null && newTaskText.trim() !== '') {
        // Find the <p> element with class 'card-text' inside the same task card as the 'Update' button
        let taskParagraph = updateButton.parentElement.querySelector('.card-text');

        // Update the task text on the card with the new text provided by the user
        taskParagraph.textContent = newTaskText.trim();

        // Save the tasks to local storage after updating a task
        saveTasksToLocalStorage();
    }
}

// Function to delete a task
function deleteTask(deleteButton) {
    // Find the task card to be deleted based on the parent elements of the 'Delete' button
    let taskCard = deleteButton.parentElement.parentElement;

    // Remove the task card from the container, effectively deleting the task from the UI
    taskCard.remove();

    // Save the tasks to local storage after deleting a task
    saveTasksToLocalStorage();
}

// Add event listener to the 'Add Task' button, so when the button is clicked, it calls the 'addTask' function to add a new task
let addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', addTask);

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();
