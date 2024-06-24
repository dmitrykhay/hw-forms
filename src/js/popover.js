export class Popover {
  showPopover(element) {
    let popover = document.querySelector(".popover");
    if (!popover) {
      popover = document.createElement("div");

      popover.classList.add("popover", "show");
      popover.innerHTML = `
      <div class="arrow"></div>
      <h3 class="popover-header">Popover title</h3>
      <div class="popover-body">And here's some amazing content. It's very engaging. Right?</div>`;

      document.body.appendChild(popover);
    } else {
      popover.classList.toggle("show");
    }

    const { left, top } = element.getBoundingClientRect();
    popover.style.bottom = `${top - element.offsetHeight - 2}px`;

    popover.style.left = `${
      left + element.offsetWidth / 2 - popover.offsetWidth / 2
    }px`;
  }
}
