import "./styles.css";
import { render } from "./lib/render";
import MainPage from "./pages/Main";

const root = document.getElementById("app");
render(root, MainPage);
