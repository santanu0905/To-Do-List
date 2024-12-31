const body=document.querySelector('body');
const addBtn=document.querySelector('.defaddBtn');
const inputTasksBody=document.querySelector('.inputtasks');
const themeBtn=document.querySelector('.thmbtn');
const resetBtn=document.querySelector('.resetbtn');
const lightIcon=document.querySelector('.fa-sun');
const darkIcon=document.querySelector('.fa-moon');
const taskForm=document.querySelector('.taskform');
const navBar=document.querySelector('.navContainer');
const heading=document.querySelector('h2');
let modeValue=themeBtn.value;



function intializeDefaultTodos(){
    if(localStorage.getItem('todos')==='[]'){
        localStorage.clear();
    }
    if(!localStorage.getItem('todos')){
        const defTodos=[
            {text:'Pay Bills',completed:false},
            {text:'Clean the living room.',completed:false},
            {text:'Attend the team meeting at 10:00 AM',completed:false},
            {text:'Get a haircut.',completed:false},
            {text:'Water the plants.',completed:false},
        ]

        localStorage.setItem('todos',JSON.stringify(defTodos));
    }
}

function loadTodos(){
    const todos=JSON.parse(localStorage.getItem('todos'))||[];
    todos.forEach(todo => renderTodo(todo));
}

function renderTodo(todo){
    let divEl=document.createElement('div');
    divEl.setAttribute('class','todo-items');

    divEl.innerHTML=`<input type="text" class="${themeBtn.value==='dark'?'darkthmInput':'inputbox'}" placeholder="Enter your Task" value='${todo.text}' style='${todo.completed?"text-decoration:line-through;":"text-decoration:none;"}'>
                        <input type="checkbox" class="checkbox" ${todo.completed?'checked':''}>
                        <button class="delBox ${themeBtn.value==='dark'?'darkthmDelBtn':''}"aria-label="Delete task">
                            <i class="fa-regular fa-trash-can delIcon"></i>
                        </button>`

    const checkBox=divEl.querySelector('.checkbox');
    const inputBox=divEl.querySelector('input[type="text"');
    const delBtn=divEl.querySelector('.delBox');

    checkBox.addEventListener('change',()=>{
        if(inputBox.value!==''){
            todo.completed=checkBox.checked;
            inputBox.style.textDecoration=checkBox.checked?'line-through':'none';
            saveTodos();
        }
    });

    inputBox.addEventListener('input',()=>{
        if(inputBox.value!==''){
            todo.text=inputBox.value;
            saveTodos();
        }
    });

    delBtn.addEventListener('click',()=>{
        divEl.remove();
        deleteTodo(todo);
    });

    inputTasksBody.appendChild(divEl);
}

//Delete the requested TaskData
function deleteTodo(todoToDel){
    const todos=JSON.parse(localStorage.getItem('todos'));
    const updatedTodos=todos.filter(todo=>todo.text!==todoToDel.text);
    localStorage.setItem('todos',JSON.stringify(updatedTodos));
}

//Saving the Task data
function saveTodos(){
    const todos=[];
    document.querySelectorAll('.todo-items').forEach(item=>{
        const text=item.querySelector('input[type="text"').value;
        const completed=item.querySelector('.checkbox').checked;

        todos.push({text,completed});
    });
    localStorage.setItem('todos',JSON.stringify(todos));
}

//Handle adding new button
addBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    const newTodo={text:'',completed:false};;
    renderTodo(newTodo);
});

//Handel theme change
themeBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    mode=themeBtn.value;
    if(mode=='light'){
        themeBtn.value='dark';
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        lightIcon.style.display='block';
        darkIcon.style.display='none';
        themeBtn.title='Switched to Light-mode';
    }else{
        themeBtn.value='light';
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        lightIcon.style.display='none';
        darkIcon.style.display='block';
        themeBtn.title='Switched to Dark-mode';
    }
    changeThmBtn(themeBtn.value);
});
const changeThmBtn=(mode)=>{
    const inputtasksAll=document.querySelectorAll('.inputbox ,.darkthmInput');
    const delBtnAll=document.querySelectorAll('.delBox');
    //change inputtask
    inputtasksAll.forEach(el=>{
        if(mode==='dark'){
            el.classList.add('darkthmInput');
            el.classList.remove('inputbox');
        }else{
            el.classList.add('inputbox');
            el.classList.remove('darkthmInput');
        }
    });
    if(mode==='dark'){
        //change taskform
        taskForm.classList.add('darkthmTaskForm')
        //change NavBar
        navBar.classList.add('darkthmNavBar');
        heading.style.color='#E9FFF9';
        themeBtn.classList.add('darkthmBtn');
        resetBtn.classList.add('darkthmDelBtn');
        //change Indivisual DelBtn
        delBtnAll.forEach(el=>{
            el.classList.add('darkthmDelBtn')
        })
        //change button
        addBtn.classList.add('darkthmAddBtn');
        addBtn.classList.remove('addbtn');
    }else{
        //change taskform
        taskForm.classList.remove('darkthmTaskForm')
        //change NavBar
        navBar.classList.remove('darkthmNavBar');
        heading.style.color='#476A6F';
        themeBtn.classList.remove('darkthmBtn');
        resetBtn.classList.remove('darkthmDelBtn');
        //change Indivisual DelBtn
        delBtnAll.forEach(el=>{
            el.classList.remove('darkthmDelBtn')
        })
        //change button
        addBtn.classList.add('addbtn');
        addBtn.classList.remove('darkthmAddBtn');
    }
};

//Reset/Delete all Data from localStorage
resetBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    const divEl=document.querySelectorAll('.todo-items');
    divEl.forEach(div=>div.remove())
    localStorage.clear();
    alert('Past Tasks are Cleared..')
    setTimeout(()=>{
        intializeDefaultTodos();
        loadTodos();
    },100);
});

document.addEventListener('DOMContentLoaded',()=>{
    intializeDefaultTodos();
    loadTodos();
})