//　モデルクラスとビュークラスのデータの移動等を行う
const todo_input = document.getElementById('todo-input')
const todo_list = document.getElementById('todo-list')
let todos = []

todo_input.onchange = () => {
    // text内の文字を処理
    const text = todo_input.value
    todo_input.value = ''
    addTodo(text)
}

function addTodo(text){
    todos.push({"text": text, "done": false})
    showTodo()
}

function showTodo(){
    todo_list.innerHTML = '<div id="todo-list"></div>'
    todos.forEach(element => {
        todo_list.insertAdjacentHTML("beforeend", 
        '<div class="todo">' +
        '   <span class="is-done"></span>' +
        '   <span class="text">' + element.text + '</span>' +
        '    <span class="chancel">×</span>' +
        '</div>')
    });
}