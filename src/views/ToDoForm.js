import todosCollection from "../collections/todos";
import TodoModel from "../models/TodoModel";
import rerender from "../index";
/*
  <form>
    <input type="text" id="message" name="message" placeholder="..." />
    <button type="submit">
      Add +
    </button>
  <form>
*/

const onSubmit = e => {
  e.preventDefault();

  const form = e.currentTarget;
  window.form = form;

  // const message = document.getElementById("message").value;
  const message = form.message.value;

  if (message.length < 3) {
    alert("Message should have at least 3 characters");
    return;
  }

  const formData = {
    message
  };

  const todo = TodoModel.init(formData);
  todosCollection.insert(todo);

  console.log(todosCollection.items);

  form.message.value = "";
  rerender();
};

const ToDoFormViewDescriptor = () => ({
  tag: "form",
  eventListeners: {
    submit: onSubmit
  },
  children: [
    {
      tag: "input",
      attributes: {
        required: true,
        type: "text",
        name: "message",
        placeholder: "Add Todo"
      }
    },
    {
      tag: "button",
      attributes: {
        type: "submit"
      },
      textContent: "Add"
    }
  ]
});

export default ToDoFormViewDescriptor;
