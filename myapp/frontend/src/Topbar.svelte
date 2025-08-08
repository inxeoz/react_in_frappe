<script lang="ts">
    let appName = "App Ticket";
    let status = "active";
</script>

<nav class="topbar">
    <!-- Left Section -->
    <div class="left-section">
        <!-- App Name with status -->
        <div class="app-info">
            <span class="app-name">{appName}</span>
            <span class="status-indicator"></span>
        </div>
        <!-- Navigation Tabs -->
        <div class="nav-tabs">
            <button class="nav-btn">Main Table</button>
            <button class="nav-btn">Kanban</button>
            <button class="nav-btn active">Form</button>
            <button class="nav-btn disabled">Gantt</button>
            <button class="nav-btn">+</button>
        </div>
    </div>

    <!-- Right Section -->
    <div class="right-section">
        <span class="settings-text">Settings(00hero)</span>
        <!-- Settings gear icon -->
        <svg
                class="settings-icon"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
        >
            <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6l4 2"
            />
        </svg>
    </div>
</nav>

<style>
    .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #134e4a;
        color: white;
        padding: 0.5rem 1rem;
        height: auto;
    }

    .left-section {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
    }

    .app-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .app-name {
        font-size: 1.125rem;
        font-weight: 600;
    }

    .status-indicator {
        width: 10px;
        height: 10px;
        background-color: #10b981;
        border-radius: 50%;
    }

    .nav-tabs {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .nav-btn {
        background-color: #374151;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        border: none;
        cursor: pointer;
    }

    .nav-btn:hover {
        background-color: #4b5563;
    }

    .nav-btn.active {
        background-color: #3b82f6;
    }

    .nav-btn.disabled {
        background-color: #fca5a5;
        color: #7f1d1d;
    }

    .right-section {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .settings-text {
        font-size: 0.875rem;
    }

    .settings-icon {
        width: 1rem;
        height: 1rem;
    }
</style>
