<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from './lib/stores/auth';
  import { tasks } from './lib/stores/tasks';
  import Login from './lib/components/Login.svelte';
  import TaskList from './lib/components/TaskList.svelte';

  onMount(() => {
    auth.init();
    tasks.init();
  });
</script>

<main>
  <header>
    <h1>Task Manager</h1>
    {#if $auth}
      <div class="user-info">
        <span>Welcome, {$auth.username}!</span>
        <button on:click={() => auth.logout()}>Logout</button>
      </div>
    {/if}
  </header>

  {#if $auth}
    <TaskList />
  {:else}
    <Login />
  {/if}
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h1 {
    margin: 0;
    color: #333;
  }

  :global(button) {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  :global(button:hover) {
    background: #45a049;
  }
</style>