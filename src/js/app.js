import { Events } from "./events";

function app() {
  const events = new Events();
  events.submitListener();
  events.windowResizeListener();
}

app();
