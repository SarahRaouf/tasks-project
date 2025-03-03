const addButton = document.getElementById('addtask');
const taskInput = document.getElementById('taskinput');
const taskList = document.getElementById('tasklist');

loadTasks();

function getTheTask (){
    const task = taskInput.value.trim();
    if(task){
        addTheTask(task);
        taskInput.value='';
        saveTasks();
    }
    else{
        alert('You must write something..');
        taskInput.value='';
    }
    
}

addButton.addEventListener('click' , getTheTask);

function addTheTask (task){
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent= 'x';
    deleteButton.className= 'deletebutton';

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
    
    

    deleteButton.addEventListener('click' , function(){
        taskList.removeChild(listItem);
        saveTasks();
    });

    listItem.addEventListener('click' , ()=>{
        listItem.classList.toggle('completed');
    });
    
}

function saveTasks (){
    let tasks =[];
    taskList.querySelectorAll('li').forEach(function(item){
        tasks.push(item.textContent.replace('x' , '').trim());
    });
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function loadTasks (){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTheTask);
}

