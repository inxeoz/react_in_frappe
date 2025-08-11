function loadCSS(href) {
	return new Promise((resolve, reject) => {
		console.log(`📦 [loadCSS] Preparing to load CSS: ${href}`);

		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = href;

		link.onload = () => {
			console.log(`✅ [loadCSS] CSS loaded successfully: ${href}`);
			resolve();
		};

		link.onerror = (err) => {
			console.error(`❌ [loadCSS] Failed to load CSS: ${href}`, err);
			reject(err);
		};

		document.head.appendChild(link);
		console.log(`📄 [loadCSS] <link> tag appended to document.head`);
	});
}

frappe.pages["mypage"].on_page_load = async function (wrapper) {
	console.log("🚀 [mypage] Starting page load sequence...");

	$(wrapper).html(`
		<div id="loading-ui" style="padding: 2rem; font-size: 1.2rem;">
			🚀 Building React app... please wait.
		</div>
	`);

	console.log("🛠 [mypage] Triggering React static build...");
	const res = await frappe.call("myapp.myapp.api.devserver.build_static_ui");
	const result = res.message;

	if (result.status !== "success") {
		frappe.msgprint(__("❌ Failed to build React app: " + result.message));
		console.error("Build failed:", result.message);
		return;
	}

	console.log("✅ [mypage] React build complete:", result.output);

	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "React + Vite Page",
		single_column: true,
	});

	const version = Date.now();
	console.log(`🕒 [mypage] Cache-busting version: ${version}`);

	$(wrapper).html(`
		<div id="react-app-wrapper">
			<div id="root"></div>
		</div>
	`);

	try {
		console.log("🎨 [mypage] Attempting to load CSS...");
		await loadCSS(`/assets/myapp/static_ui/main.css?v=${version}`);
	} catch (err) {
		console.error("🚫 [mypage] CSS failed to load:", err);
	}

	console.log("📜 [mypage] Attempting to load main.js...");
	import(`/assets/myapp/static_ui/main.js?v=${version}`)
		.then((mod) => {
			console.log("📦 [mypage] main.js loaded successfully");

			const el = document.getElementById("root");
			if (el && mod.mountReact) {
				console.log("🖼 [mypage] Mounting React app...");
				mod.mountReact(el);
				console.log("✅ [mypage] React app mounted!");
			} else {
				console.error(
					"❌ [mypage] mountReact not found or #root element missing",
				);
			}
		})
		.catch((err) => {
			console.error("🚫 [mypage] Failed to load main.js:", err);
		});
};
