const ToDoItemViewDescriptor = ({ todo }) => ({
  tag: "li",
  children: [
    {
      tag: "input",
      attributes: {
        type: "checkbox",
        id: todo._id
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

export default ToDoItemViewDescriptor;
