import React, {useEffect, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'

const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {

    const inputRef = useRef()

    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? {title, id, completed} : todo
        )
        setTodos(newTodo)
        setEditTodo("")
    }

    useEffect(() => {
        if(editTodo) {
            setInput(editTodo.title)
            inputRef.current.focus()
        } else{
            setInput("")
            inputRef.current.focus()
        }
    }, [setInput, editTodo])

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onFormSubmit = (e) => { 
        e.preventDefault();
        if(!editTodo){
            setTodos([...todos, {id: uuidv4(), title: input, completed: false}]);
            setInput("")
            inputRef.current.focus()
        } else {
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    }
    return (
        <form onSubmit={onFormSubmit}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter a Todo..."
                className="task-input"
                value={input}
                required
                onChange={onInputChange}
            />
            <button className="button-add">
                {editTodo ? "Ok" : "Add"}
            </button>
        </form>
    )
}

export default Form
