<script lang="ts">
  import { auth } from '../stores/auth';
  
  let username = '';

  function handleSubmit() {
    if (username.trim()) {
      auth.login(username);
    }
  }
</script>

<div class="login">
  <h2>Login</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      bind:value={username}
      placeholder="Enter username"
      required
    />
    <button type="submit">Login</button>
  </form>
</div>

<style>
  .login {
    max-width: 300px;
    margin: 2rem auto;
    padding: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>