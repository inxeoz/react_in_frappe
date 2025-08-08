

// frappe.pages['mypage'].on_page_load = async function (wrapper) {

//   //build

// await frappe.call('myapp.myapp.api.devserver.start_vite_dev')
//   .then(r => console.log('Dev server start response:', r.message));


//   const page = frappe.ui.make_app_page({
//     parent: wrapper,
//     title: 'Svelte + Vite Page',
//     single_column: true,
//   });

//   // Create a cache-busting timestamp
//   const version = Date.now();

//   // Inject Svelte app HTML
//   $(wrapper).html(`
//     <div id="svelte-app-wrapper">
//       <link rel="stylesheet" href="/assets/myapp/svelte/main.css?v=${version}" />
//       <div id="app"></div>
//       <script type="module">
//         import('/assets/myapp/svelte/main.js?v=${version}').then(mod => {
//           const el = document.getElementById('app');
//           if (el && mod.mountSvelte) {
//             mod.mountSvelte(el);
//           } else {
//             console.error("mountSvelte not found or target element missing");
//           }
//         }).catch(err => {
//           console.error("Failed to load main.js", err);
//         });
//       </script>
//     </div>
//   `);
// };



frappe.pages['mypage'].on_page_load = async function (wrapper) {
  // Step 0: Show loading message immediately
  $(wrapper).html(`
    <div id="loading-ui" style="padding: 2rem; font-size: 1.2rem;">
      🚀 Building Svelte app... please wait.
    </div>
  `);

  // Step 1: Run the Svelte build
  const res = await frappe.call('myapp.myapp.api.devserver.build_svelte');
  const result = res.message;

  if (result.status !== 'success') {
    frappe.msgprint(__('❌ Failed to build Svelte app: ' + result.message));
    console.error('Build failed:', result.message);
    return;
  }

  console.log('✅ Svelte build complete:', result.output);

  // Step 2: Replace with app content after build
  const page = frappe.ui.make_app_page({
    parent: wrapper,
    title: 'Svelte + Vite Page',
    single_column: true,
  });

  const version = Date.now(); // for cache busting

  $(wrapper).html(`
    <div id="svelte-app-wrapper">
      <link rel="stylesheet" href="/assets/myapp/svelte/main.css?v=${version}" />
      <div id="app"></div>
    </div>
  `);

  // Step 3: Load and mount Svelte app
  import(`/assets/myapp/svelte/main.js?v=${version}`)
    .then(mod => {
      const el = document.getElementById('app');
      if (el && mod.mountSvelte) {
        mod.mountSvelte(el);
      } else {
        console.error("mountSvelte not found or #app element missing");
      }
    })
    .catch(err => {
      console.error("Failed to load main.js", err);
    });
};
