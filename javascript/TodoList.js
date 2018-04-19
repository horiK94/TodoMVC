//　モデルクラスとビュークラスのデータの移動等を行う
const todo_input = document.getElementById('todo-input')
const all_check = document.getElementById('all')
const todo_checkbox = document.getElementsByClassName('todo-done')
const todo_text = document.getElementsByClassName('text')
const todo_delete_button = document.getElementsByClassName('todo-delete')
const todo_list = document.getElementById('todo-list')
let todos = []

todo_input.onchange = () => {
    const text = todo_input.value
    todo_input.value = ''
    addTodo(text)
    showTodo()
}

todo_list.onchange = () => {
    refreshCheckboxData()
}

all_check.onchange = () => {
    const wasCheckedAllCheckbox = isAllChecked() && !all_check.checked
    if(wasCheckedAllCheckbox){
        setAllCheckbox(false)
    }else{
        setAllCheckbox(true)
    }
}

function removeTodo(value){
    for(let i = 0; i < todos.length; i++){
        if(i === +value){
            todos.splice(i, 1)
        }
    }
    showTodo()
}

function refreshCheckboxData(){
    for(let i = 0; i < todo_checkbox.length; i++){
        todos[i].isDone = todo_checkbox[i].checked
        if(todos[i].isDone){
            todo_text[i].classList.add('done')
        }else{
            todo_text[i].classList.remove('done')
        }
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
    refreshCheckboxData()
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
        '   <button class="todo-delete" value="' + i + '">×</button>' +
        '</div>')
        todo_delete_button[i].addEventListener('click', (e) => {
            removeTodo(e.toElement.value)
        })
    }
}



