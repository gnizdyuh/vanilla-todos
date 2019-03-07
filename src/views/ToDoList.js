import ToDoItemViewDescriptor from "./ToDoItem";

const ToDoListViewDescriptor = ({ items }) => ({
  tag: "ul",
  attributes: {},
  children: items.map(todo => ToDoItemViewDescriptor({ todo }))
});

export default ToDoListViewDescriptor;
