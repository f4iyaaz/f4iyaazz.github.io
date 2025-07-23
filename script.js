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

    function changeRandomStyle() {
        const colors = ['#FF6347', '#3CB371', '#1E90FF', '#FFD700', '#8A2BE2'];
        const bgColors = ['#FFFAF0', '#ADD8E6', '#F0E68C', '#98FB98', '#D8BFD8'];
        const borderColors = ['#FF6347', '#3CB371', '#1E90FF', '#FFD700', '#8A2BE2'];
        const fontSizes = ['16px', '18px', '20px', '22px', '24px'];
        const fontFamilies = ['Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New'];

        const randomAction = Math.floor(Math.random() * 4);

        if (randomAction === 0) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.getElementById("fortuneMessage").style.color = randomColor;
        } else if (randomAction === 1) {
            const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
            document.getElementById("fortuneBox").style.backgroundColor = randomBgColor;
        } else if (randomAction === 2) {
            const randomBorderColor = borderColors[Math.floor(Math.random() * borderColors.length)];
            document.getElementById("fortuneBox").style.borderColor = randomBorderColor;
        } else {
            const randomFontSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
            const randomFontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
            document.getElementById("fortuneMessage").style.fontSize = randomFontSize;
            document.getElementById("fortuneMessage").style.fontFamily = randomFontFamily;
        }
    }

    randomFortune();

    document.getElementById("changeStylesButton").addEventListener("click", changeRandomStyle);
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
