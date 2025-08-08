// frappe.pages['mypage'].on_page_load = function (wrapper) {

//   const page = frappe.ui.make_app_page({
//     parent: wrapper,
//     title: 'Svelte + Vite Page',
//     single_column: true,
//   });


//     // Clear the page body and inject your Svelte app container
//   $(wrapper).html(`


//     <!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Vite + Svelte + TS</title>
//     <script type="module" crossorigin src="/assets/myapp/svelte/main.js"></script"></script>
//     <link rel="stylesheet" crossorigin  href="/assets/myapp/svelte/main.css">
//   </head>
//   <body>
//     <div id="app"></div>
//   </body>
// </html>

//   `);

// };


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
