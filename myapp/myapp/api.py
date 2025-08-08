# myapp/myapp/api.py
import frappe

@frappe.whitelist()
def get_mypage_html():
    # Read the HTML file from the app directory
    html_path = frappe.get_app_path('myapp', 'public', 'html', 'mypage.html')
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    return html_content


import os
import frappe


@frappe.whitelist()
def get_svelte_assets():
    assets_dir = frappe.get_app_path("myapp", "public", "svelte", "assets")
    files = os.listdir(assets_dir)
    js_file = next((f for f in files if f.endswith(".js")), None)
    css_file = next((f for f in files if f.endswith(".css")), None)

    return {
        "js": f"/assets/myapp/svelte/assets/{js_file}",
        "css": f"/assets/myapp/svelte/assets/{css_file}"
    }

# /home/inxeoz/work/devb/apps/myapp/myapp/myapp/api.py
