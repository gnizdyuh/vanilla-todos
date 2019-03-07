import Collection from "../models/Collection";
import TodoModel from "../models/TodoModel";

const todosCollection = new Collection("todos");

todosCollection.insert(TodoModel.init({ message: "First To do" }));
todosCollection.insert(TodoModel.init({ message: "Second To do" }));
todosCollection.insert(TodoModel.init({ message: "Third To do" }));

export default todosCollection;
