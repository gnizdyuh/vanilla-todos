import todosCollection from "../collections/todos";
import TodoModel from "../models/TodoModel";


const ToDoItemViewDescriptor = ({ todo }) => ({
  tag: "li",
  children: [
    {
      tag: "input",
      eventListeners: {
        click: onCheck
      },
      attributes: {
        type: "checkbox",
        id: todo._id,
      }
    },
    {
      tag: "label",
      attributes: {
        for: todo._id
      },
      textContent: todo.message
    }
  ]
});

const onCheck = e => {
  const todoCheckbox = e.currentTarget;
  const todo = todosCollection.find(el => el._id === todoCheckbox.id);
  if(todoCheckbox.checked) {
    TodoModel.complete(todo);
  } else {
    TodoModel.reopen(todo);
  }

  todosCollection.update(todo.id, todo);
  console.log(todosCollection.items);

};


export default ToDoItemViewDescriptor;
