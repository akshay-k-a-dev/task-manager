<script lang="ts">
  import type { Task } from '../stores/tasks';
  import { tasks } from '../stores/tasks';

  export let task: Task;

  let newSubTaskTitle = '';

  function handleAddSubTask() {
    if (newSubTaskTitle.trim()) {
      tasks.addSubTask(task._id, newSubTaskTitle);
      newSubTaskTitle = '';
    }
  }

  $: progress = task.subTasks.length
    ? Math.round((task.subTasks.filter(st => st.completed).length / task.subTasks.length) * 100)
    : task.completed ? 100 : 0;
</script>

<div class="task-item">
  <div class="task-header">
    <label class="checkbox">
      <input
        type="checkbox"
        checked={task.completed}
        on:change={() => tasks.toggleTask(task._id)}
      />
      <span class="title">{task.title}</span>
    </label>
    <button class="delete" on:click={() => tasks.deleteTask(task._id)}>×</button>
  </div>

  <p class="description">{task.description}</p>

  <div class="progress">
    <div class="progress-bar" style="width: {progress}%"></div>
    <span class="progress-text">{progress}%</span>
  </div>

  <div class="subtasks">
    {#each task.subTasks as subTask (subTask._id)}
      <label class="checkbox">
        <input
          type="checkbox"
          checked={subTask.completed}
          on:change={() => tasks.toggleSubTask(task._id, subTask._id)}
        />
        <span>{subTask.title}</span>
      </label>
    {/each}
  </div>

  <form on:submit|preventDefault={handleAddSubTask} class="add-subtask">
    <input
      type="text"
      bind:value={newSubTaskTitle}
      placeholder="New subtask"
      required
    />
    <button type="submit">Add Subtask</button>
  </form>
</div>

<style>
  .task-item {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
  }

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .description {
    color: #666;
    margin-bottom: 0.5rem;
  }

  .progress {
    height: 20px;
    background: #ddd;
    border-radius: 10px;
    margin: 0.5rem 0;
    position: relative;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: #4CAF50;
    transition: width 0.3s ease;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 0.8rem;
  }

  .subtasks {
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .add-subtask {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .delete {
    background: none;
    border: none;
    color: #ff4444;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
  }

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>