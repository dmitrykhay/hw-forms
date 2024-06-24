/**
 * @jest-environment jsdom
 */

import { Events } from "../events";

test("Popover appear on screen", () => {
  document.body.innerHTML = `
    <div class="popup">
      <h1>Popover demonstration</h1>
      <form>
        <button type="submit">Click to toggle popover</button>
      </form>
    </div>`;

  const events = new Events();
  events.submitListener();
  events.windowResizeListener();

  document.querySelector("form").submit();
  expect(document.querySelector(".popover").classList.contains("show")).toBe(
    true,
  );
});

test("Popover disapeare on screen", () => {
  document.body.innerHTML = `
    <div class="popup">
      <h1>Popover demonstration</h1>
      <form>
        <button type="submit">Click to toggle popover</button>
      </form>
    </div>`;

  const events = new Events();
  events.submitListener();
  events.windowResizeListener();

  document.querySelector("form").submit();
  document.querySelector("form").submit();
  expect(document.querySelector(".popover").classList.contains("show")).toBe(
    false,
  );
});
