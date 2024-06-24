import { Popover } from "./popover";

export class Events {
  constructor() {
    this.popover = new Popover();
  }

  submitListener() {
    document?.querySelector("form")?.addEventListener("submit", (event) => {
      event.preventDefault();

      this.popover.showPopover(document.querySelector("button"));
    });
  }

  windowResizeListener() {
    window.addEventListener("resize", () => {
      this.popover.showPopover(document.querySelector("button"));
      this.popover.showPopover(document.querySelector("button"));
    });
  }
}
