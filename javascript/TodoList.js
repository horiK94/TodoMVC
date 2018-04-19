//　モデルクラスとビュークラスのデータの移動等を行う
const todo_input = document.getElementById('todo-input')
const all_check = document.getElementById('all')
const todo_checkbox = document.getElementsByClassName('todo-done')
const todo_text = document.getElementsByClassName('text')
const todo_delete_button = document.getElementsByClassName('todo-delete')
const todo_list = document.getElementById('todo-list')
const left_item = document.getElementById('left-item')
const todo_type = document.getElementById('todo-type')
let todos = []

todo_input.onchange = () => {
    const text = todo_input.value
    todo_input.value = ''
    addTodo(text)
    showTodo()
}

todo_list.onchange = () => {
    console.log('hogehoge')
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

todo_type.onchange = () => {
    const type = todo_type.showType.value
    switch (type) {
        case 'All':
            showTodo()
            break;
        case 'Active':
            showTodo(true, false)
            break;
        case 'Completed':
            showTodo(false, true)
            break;
        default:
            throw '予期しないtypeが指定されました'
            break;
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

function showTodo(doesIncludeActiveTodo = true, doesIncludeCompletedTodo = true){
    todo_list.innerHTML = '<div id="todo-list"></div>'
    let count = 0       //この実装はクソい
    let activeCount = 0     //この実装はクソい
    for(let i = 0; i < todos.length; i++){
        if(!todos[i].isDone){
            activeCount++
        }
        if(doesIncludeActiveTodo === false && todos[i].isDone === false){
            continue
        }
        if(doesIncludeCompletedTodo === false && todos[i].isDone === true){
            continue
        }

        todo_list.insertAdjacentHTML("beforeend", 
        '<div class="todo">' +
        '   <input type="checkbox" name="todo" class="todo-done element' + i + '>' +
        '   <span class="is-done"></span>' +
        '   <span class="text">' + todos[i].text + '</span>' +
        '   <button class="todo-delete" value="' + i + '">×</button>' +
        '</div>')
        todo_delete_button[count].addEventListener('click', (e) => {
            removeTodo(e.toElement.value)
        })
        count++
    }
    left_item.innerHTML = activeCount + 'items left'
}



