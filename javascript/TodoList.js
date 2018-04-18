//　モデルクラスとビュークラスのデータの移動等を行う
const todo_input = document.getElementById('todo-input')
const all_check = document.getElementById('all')
const todo_checkbox = document.getElementsByClassName('todo-done')
const todo_list = document.getElementById('todo-list')
let todos = []

todo_input.onchange = () => {
    const text = todo_input.value
    todo_input.value = ''
    addTodo(text)
    showTodo()
}

todo_list.onchange = () => {
    for(let i = 0; i < todo_checkbox.length; i++){
        todos[i].isDone = todo_checkbox[i].checked
    }
    console.log(todos)
}

all_check.onchange = () => {
    console.log(all_check.checked)
    console.log(isAllChecked())
    if(isAllChecked() && !all_check.checked){
        setAllCheckbox(false)
        console.log('f')
    }else{
        setAllCheckbox(true)
        console.log('t')
    }
}

function setAllCheckbox(set){
    all_check.checked = set
    if(todo_checkbox.length === 0){
        return
    }
    for(let i = 0; i < todo_checkbox.length; i++){
        todo_checkbox[i].checked = set
        todos[i].isDone = set
    }
}

function isAllChecked() {
    return todos.every((e) => {
        return e.isDone
    })
}

function addTodo(text){
    todos.push({"text": text, "isDone": false})
}

function showTodo(){
    todo_list.innerHTML = '<div id="todo-list"></div>'
    for(let i = 0; i < todos.length; i++){
        todo_list.insertAdjacentHTML("beforeend", 
        '<div class="todo">' +
        '   <input type="checkbox" name="todo" class="todo-done element' + i + '>' +
        '   <span class="is-done"></span>' +
        '   <span class="text">' + todos[i].text + '</span>' +
        '   <span class="chancel">×</span>' +
        '</div>')
    }
}



