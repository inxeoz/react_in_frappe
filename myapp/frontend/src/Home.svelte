<script lang="ts">
    let name: string = 'World';
    let count: number = 0;
    let todos: string[] = ['Learn Svelte', 'Build an app'];
    let newTodo: string = '';

    function increment(): void {
        count += 1;
    }

    function addTodo(): void {
        if (newTodo.trim()) {
            todos = [...todos, newTodo.trim()];
            newTodo = '';
        }
    }

    function removeTodo(index: number): void {
        todos = todos.filter((_, i) => i !== index);
    }
</script>

<main>
    <h1>Welcome to Svelte, {name}!</h1>

    <section class="counter">
        <h2>Counter Demo</h2>
        <p>Count: {count}</p>
        <button on:click={increment}>Increment</button>
    </section>

    <section class="greeting">
        <h2>Greeting Demo</h2>
        <label for="name">Enter your name:</label>
        <input id="name" bind:value={name} placeholder="Your name" />
    </section>

    <section class="todos">
        <h2>Todo List Demo</h2>
        <div class="todo-input">
            <input
                    bind:value={newTodo}
                    on:keydown={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Add a new todo"
            />
            <button on:click={addTodo}>Add</button>
        </div>

        {#if todos.length > 0}
            <ul>
                {#each todos as todo, index}
                    <li>
                        {todo}
                        <button on:click={() => removeTodo(index)}>Remove</button>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>No todos yet!</p>
        {/if}
    </section>
</main>

<style>
    main {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        font-family: Arial, sans-serif;
    }

    section {
        margin: 2rem 0;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    h1 {
        color: #333;
        text-align: center;
    }

    h2 {
        color: #666;
        margin-top: 0;
    }

    button {
        background: #007acc;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background: #005999;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 0.5rem;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        margin: 0.25rem 0;
        background: #f5f5f5;
        border-radius: 4px;
    }

    .todo-input {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .counter p {
        font-size: 1.5rem;
        font-weight: bold;
        color: #007acc;
    }
</style>
