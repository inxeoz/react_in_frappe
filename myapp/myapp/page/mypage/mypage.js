

frappe.pages['mypage'].on_page_load = function (wrapper) {
  const page = frappe.ui.make_app_page({
    parent: wrapper,
    title: 'Svelte + Vite Page',
    single_column: true,
  });

  // Create a cache-busting timestamp
  const version = Date.now();

  // Inject Svelte app HTML
  $(wrapper).html(`
    <div id="svelte-app-wrapper">
      <link rel="stylesheet" href="/assets/myapp/svelte/main.css?v=${version}" />
      <div id="app"></div>
      <script type="module">
        import('/assets/myapp/svelte/main.js?v=${version}').then(mod => {
          const el = document.getElementById('app');
          if (el && mod.mountSvelte) {
            mod.mountSvelte(el);
          } else {
            console.error("mountSvelte not found or target element missing");
          }
        }).catch(err => {
          console.error("Failed to load main.js", err);
        });
      </script>
    </div>
  `);
};
