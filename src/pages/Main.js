import todosCollection from "../collections/todos";
import { getRenderableComponent } from "../lib/render";
import ToDoListViewDescriptor from "../views/ToDoList";
import ToDoFormViewDescriptor from "../views/ToDoForm";

export default () => {
  const items = todosCollection.items;
  const todoListElement = getRenderableComponent({
    tag: "div",
    children: [ToDoFormViewDescriptor(), ToDoListViewDescriptor({ items })]
  });
  return todoListElement;
};
