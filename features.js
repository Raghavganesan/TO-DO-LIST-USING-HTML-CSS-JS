 const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const clearAllBtn = document.getElementById('clearAll');

    // Load tasks from localStorage
    window.onload = function() {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.forEach(task => renderTask(task.text, task.completed));
    };

    // Add task
    addBtn.addEventListener('click', () => {
      const text = taskInput.value.trim();
      if (text === "") return;
      renderTask(text, false);
      saveTasks();
      taskInput.value = "";
    });

    // Render task
    function renderTask(text, completed) {
      const li = document.createElement('li');
      li.textContent = text;
      if (completed) li.classList.add('completed');

      // Buttons
      const completeBtn = document.createElement('button');
      completeBtn.textContent = "✔";
      completeBtn.className = "btn completeBtn";
      completeBtn.onclick = () => {
        li.classList.toggle('completed');
        saveTasks();
      };

      const editBtn = document.createElement('button');
      editBtn.textContent = "✎";
      editBtn.className = "btn editBtn";
      editBtn.onclick = () => {
        const newText = prompt("Edit task:", li.firstChild.textContent);
        if (newText !== null && newText.trim() !== "") {
          li.firstChild.textContent = newText.trim();
          saveTasks();
        }
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "🗑";
      deleteBtn.className = "btn deleteBtn";
      deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
      };

      li.appendChild(completeBtn);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    }

    // Save tasks
    function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
          text: li.firstChild.textContent,
          completed: li.classList.contains('completed')
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Clear all
    clearAllBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to delete all tasks?")) {
        taskList.innerHTML = "";
        localStorage.removeItem('tasks');
      }
    });
  </script>