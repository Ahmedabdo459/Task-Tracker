// Select all add buttons in the headers
const addButtons = document.querySelectorAll(".box-header li");

addButtons.forEach((btn) => {
  // Add click event to create new task
  btn.addEventListener("click", () => {
    const column = btn.closest(".box-column");

    // Create new task card
    const newBox = document.createElement("div");
    newBox.classList.add("box");
    newBox.setAttribute("draggable", "true");

    // Task template
    newBox.innerHTML = `
      <span class="tag" id="green">New</span>
      <i class="fa-solid fa-trash delete-btn"></i>
      <p>${prompt("Enter task title:") || "New task created dynamically!"}</p>
      <div class="box-footer">
        <div class="date">
          <li><i class="fa-solid fa-calendar-days"></i></li>
          <span>${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
        </div>
        <li class="comment"><i class="fa-solid fa-message"></i>0</li>
      </div>
    `;

    // Animation for adding new task
    newBox.style.opacity = "0";
    newBox.style.transform = "translateY(10px)";
    column.appendChild(newBox);

    setTimeout(() => {
      newBox.style.transition = "all 0.4s ease";
      newBox.style.opacity = "1";
      newBox.style.transform = "translateY(0)";
    }, 50);

    // Update task count
    const num = column.querySelector(".num");
    num.textContent = parseInt(num.textContent) + 1;

    // Activate delete and drag features
    attachDeleteEvent(newBox);
    attachDragEvents(newBox);
  });
});

// Function: delete a task
function attachDeleteEvent(box) {
  const deleteBtn = box.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    const column = box.closest(".box-column");
    box.remove();
    const num = column.querySelector(".num");
    num.textContent = parseInt(num.textContent) - 1;
  });
}

// Attach delete event to existing tasks
document.querySelectorAll(".box").forEach(attachDeleteEvent);

let draggedCard = null;

// Function: enable drag events
function attachDragEvents(box) {
  box.addEventListener("dragstart", () => {
    draggedCard = box;
    setTimeout(() => box.classList.add("dragging"), 0);
  });

  box.addEventListener("dragend", () => {
    box.classList.remove("dragging");
    draggedCard = null;
  });
}

// Attach drag events to all current tasks
document.querySelectorAll(".box").forEach(attachDragEvents);

// Select all columns
const columns = document.querySelectorAll(".box-column");

columns.forEach(col => {
  // Allow dropping inside columns
  col.addEventListener("dragover", e => e.preventDefault());

  // Handle drop action
  col.addEventListener("drop", e => {
    if (draggedCard) {
      col.appendChild(draggedCard);

      // Update task numbers in all columns
      columns.forEach(c => {
        const num = c.querySelector(".num");
        num.textContent = c.querySelectorAll(".box").length;
      });
    }
  });
});
