document.addEventListener('DOMContentLoaded', () => {
    const fortunes = [
        "You will find great success today.",
        "Good things are coming your way.",
        "The future looks bright for you.",
        "A new opportunity will present itself.",
        "You will meet someone interesting soon.",
        "Patience is key to your success.",
        "An exciting adventure is in your future.",
        "Expect a pleasant surprise today.",
        "You will overcome any challenge.",
        "Great happiness will come to you soon."
    ];

    function randomFortune() {
        const fortuneMessage = document.getElementById("fortuneMessage");
        if (fortuneMessage) {
            const randomIndex = Math.floor(Math.random() * fortunes.length);
            fortuneMessage.textContent = fortunes[randomIndex];
        }
    }

    function changeStyle(styleSet) {
        const fortuneMessage = document.getElementById("fortuneMessage");
        const fortuneBox = document.getElementById("fortuneBox");

        if (styleSet === 'style1') {
            fortuneMessage.style.color = '#FF6347';
            fortuneBox.style.backgroundColor = '#FFFAF0';
            fortuneBox.style.borderColor = '#FF6347';
            fortuneMessage.style.fontSize = '20px';
            fortuneMessage.style.fontFamily = 'Arial';
        } else if (styleSet === 'style2') {
            fortuneMessage.style.color = '#3CB371';
            fortuneBox.style.backgroundColor = '#ADD8E6';
            fortuneBox.style.borderColor = '#3CB371';
            fortuneMessage.style.fontSize = '22px';
            fortuneMessage.style.fontFamily = 'Verdana';
        } else if (styleSet === 'style3') {
            fortuneMessage.style.color = '#1E90FF';
            fortuneBox.style.backgroundColor = '#F0E68C';
            fortuneBox.style.borderColor = '#1E90FF';
            fortuneMessage.style.fontSize = '24px';
            fortuneMessage.style.fontFamily = 'Georgia';
        } else if (styleSet === 'style4') {
            fortuneMessage.style.color = '#FFD700';
            fortuneBox.style.backgroundColor = '#98FB98';
            fortuneBox.style.borderColor = '#FFD700';
            fortuneMessage.style.fontSize = '18px';
            fortuneMessage.style.fontFamily = 'Times New Roman';
        }
    }

    randomFortune();

    // Add event listeners for each button with different style sets
    document.getElementById("changeStyleButton1").addEventListener("click", () => changeStyle('style1'));
    document.getElementById("changeStyleButton2").addEventListener("click", () => changeStyle('style2'));
    document.getElementById("changeStyleButton3").addEventListener("click", () => changeStyle('style3'));
    document.getElementById("changeStyleButton4").addEventListener("click", () => changeStyle('style4'));
});


// stopwatch script

let timer;
let time = 0;

function updateDisplay() {
    document.getElementById('timeDisplay').textContent = time;
    console.log('Updated time:', time); // Debugging log
}

function startTimer() {
    if (timer) return; 

    timer = setInterval(() => {
        time += 3;
        if (time >= 30) { 
            clearInterval(timer);
            timer = null;
            console.log('Timer stopped at 30 seconds.');
        }
        updateDisplay();
    }, 300); 
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    console.log('Timer stopped manually.');
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    time = 0;
    updateDisplay();
    console.log('Timer reset.');
}



// todo script

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox" onclick="toggleComplete(this)">
            ${taskText}
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(taskItem);
        saveTasks();
    }
    taskInput.value = ''; 
}

function toggleComplete(checkbox) {
    const taskItem = checkbox.parentElement;
    if (checkbox.checked) {
        taskItem.style.textDecoration = 'line-through';
    } else {
        taskItem.style.textDecoration = 'none';
    }
    saveTasks();
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((taskItem) => {
        const task = {
            text: taskItem.textContent.replace('Delete', '').trim(),
            completed: taskItem.querySelector('input').checked
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(this)">
            ${task.text}
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// load tasks from localStorage
window.onload = loadTasks;
