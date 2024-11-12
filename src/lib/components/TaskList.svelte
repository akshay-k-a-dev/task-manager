<script lang="ts">
  import { onMount } from 'svelte';
  import { tasks, type Task } from '../stores/tasks';
  import TaskItem from './TaskItem.svelte';
  import { auth } from '../stores/auth';
  import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

  let newTaskTitle = '';
  let newTaskDescription = '';
  let viewMode: 'all' | 'week' | 'month' = 'all';

  $: userId = $auth?._id || '';

  onMount(() => {
    if (userId) {
      tasks.init(userId);
    }
  });

  $: filteredTasks = filterTasks($tasks, viewMode);

  function filterTasks(tasks: Task[], mode: string): Task[] {
    if (mode === 'all') return tasks;

    const now = new Date();
    const interval = mode === 'week'
      ? { start: startOfWeek(now), end: endOfWeek(now) }
      : { start: startOfMonth(now), end: endOfMonth(now) };

    return tasks.filter(task => 
      isWithinInterval(new Date(task.createdAt), interval)
    );
  }

  function handleAddTask() {
    if (newTaskTitle.trim() && userId) {
      tasks.addTask(userId, newTaskTitle, newTaskDescription);
      newTaskTitle = '';
      newTaskDescription = '';
    }
  }
</script>

<div class="task-list">
  <div class="controls">
    <select bind:value={viewMode}>
      <option value="all">All Tasks</option>
      <option value="week">This Week</option>
      <option value="month">This Month</option>
    </select>
  </div>

  <form on:submit|preventDefault={handleAddTask} class="add-task">
    <input
      type="text"
      bind:value={newTaskTitle}
      placeholder="New task title"
      required
    />
    <input
      type="text"
      bind:value={newTaskDescription}
      placeholder="Task description"
    />
    <button type="submit">Add Task</button>
  </form>

  <div class="tasks">
    {#each filteredTasks as task (task._id)}
      <TaskItem {task} />
    {/each}
  </div>
</div>

<style>
  .task-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }

  .controls {
    margin-bottom: 1rem;
  }

  .add-task {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  input, select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>