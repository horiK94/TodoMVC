//　モデルクラスとビュークラスのデータの移動等を行う
const todo_input = document.getElementById('todo-input')
let todos = []

todo_input.onchange = () => {
    // text内の文字を処理
    const text = todo_input.innerText
    console.log(text)
}



// function func() {
//     console.log("hgeohge"); 
// }

// document.getElementById('content').onClick((e) => {
//     console.log("On Click")
// })