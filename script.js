let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks(){
localStorage.setItem("tasks",
JSON.stringify(tasks));
}

function addTask(){

const text =
document.getElementById("taskInput").value;

const date =
document.getElementById("taskDate").value;

const priority =
document.getElementById("priority").value;

if(text===""){
alert("Enter Task");
return;
}

tasks.push({
id:Date.now(),
text,
date,
priority,
completed:false
});

saveTasks();
renderTasks();

document.getElementById("taskInput").value="";
}

function renderTasks(){

const list =
document.getElementById("taskList");

list.innerHTML="";

let filtered = tasks;

if(currentFilter==="completed"){
filtered = tasks.filter(t=>t.completed);
}

if(currentFilter==="pending"){
filtered = tasks.filter(t=>!t.completed);
}

const search =
document.getElementById("search").value
.toLowerCase();

filtered = filtered.filter(task =>
task.text.toLowerCase().includes(search)
);

filtered.forEach(task=>{

const li =
document.createElement("li");

li.className =
`${task.priority.toLowerCase()}
${task.completed ? "completed" : ""}`;

li.innerHTML=`
<div>
<h3>${task.text}</h3>
<p>${task.date || "No Date"}</p>
<p>Priority: ${task.priority}</p>
</div>

<div class="actions">

<button class="complete"
onclick="toggleTask(${task.id})">
✓
</button>

<button class="edit"
onclick="editTask(${task.id})">
✎
</button>

<button class="delete"
onclick="deleteTask(${task.id})">
🗑
</button>

</div>
`;

list.appendChild(li);

});

updateStats();
}

function toggleTask(id){

tasks = tasks.map(task =>
task.id===id
? {...task,completed:!task.completed}
: task
);

saveTasks();
renderTasks();
}

function deleteTask(id){

tasks =
tasks.filter(task =>
task.id!==id);

saveTasks();
renderTasks();
}

function editTask(id){

const task =
tasks.find(t=>t.id===id);

const newText =
prompt("Edit Task",task.text);

if(newText){

task.text = newText;

saveTasks();
renderTasks();
}

}

function filterTasks(type){

currentFilter = type;
renderTasks();
}

function updateStats(){

const total = tasks.length;

const completed =
tasks.filter(t=>t.completed).length;

const pending =
total - completed;

document.getElementById("total")
.innerText = total;

document.getElementById("completed")
.innerText = completed;

document.getElementById("pending")
.innerText = pending;

const percentage =
total===0
? 0
: (completed/total)*100;

document.getElementById("progressBar")
.style.width =
percentage + "%";
}

document.getElementById("search")
.addEventListener("input",
renderTasks);

document.getElementById("themeBtn")
.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

renderTasks();