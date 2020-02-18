// Create UUID
const createUUID = () => {
    let dt = new Date().getTime()
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    })
    return uuid;
}

// Fetch exiting todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    return todosJSON ? JSON.parse(todosJSON) : []
}

// Save todos in localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle Checkbox
const toggleCheckbox = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if(todo)
        todo.completed = !todo.completed
} 

// Render Application todos based on filters
const renderTodos =(filters, todos) => {

    let filteredTodos = ''
    if (filters.hideCompleted) {
        filteredTodos = todos.filter((todos) => !todos.completed && todos.text.toLowerCase().includes(filters.SearchText.toLowerCase()))
    }
    else {
        filteredTodos = todos.filter((todos) => todos.text.toLowerCase().includes(filters.SearchText.toLowerCase()))
    }

    const getThingsToDo = function (todo) {
        return filteredTodos.filter((todo) => !todo.completed)
    }
    
    document.querySelector('#contain-todos').innerHTML = ''
    document.querySelector('#contain-todos').appendChild(generateSummaryDOM(getThingsToDo()))

    filteredTodos.forEach((todos) => {
        document.querySelector('#contain-todos').appendChild(generateDOM(todos))
    })
}

// Get the DOM elements for an inidividual note
const generateDOM = (todo) => {
    // Create DOM elements
    const todoElement = document.createElement('div')
    const checkbox = document.createElement('input')    
    const pTodos = document.createElement('span')
    const deleteTodo = document.createElement('button')


    // Todo Checkbox
    checkbox.setAttribute('type', 'checkbox')
    todoElement.appendChild(checkbox)
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', () => {
        toggleCheckbox(todo.id)
        saveTodos(todos)
        renderTodos(filters, todos)
    })

    // Todo Text
    pTodos.textContent = todo.text
    todoElement.appendChild(pTodos)

    //Setup the remove button
    deleteTodo.textContent = 'Supprimer cet élément'
    todoElement.appendChild(deleteTodo)
    deleteTodo.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(filters, todos)
    })

    // Toggle checkbox


    return todoElement
}
// Get the DOM summary for list summary
const generateSummaryDOM = (getThingsToDo) => {
    const pTodosLeft = document.createElement('h2')
    pTodosLeft.textContent = `Il vous reste ${getThingsToDo.length} choses à faire.`
    return pTodosLeft
} 