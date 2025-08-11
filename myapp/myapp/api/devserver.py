# # myapp/myapp/api/devserver.py

# import subprocess
# import frappe
# import os

# @frappe.whitelist()
# def start_vite_dev():
#     try:
#         # Dynamically build absolute path to frontend
#         app_path = frappe.get_app_path('myapp')  # /full/path/to/myapp/myapp
#         frontend_path = os.path.join(app_path, 'frontend')

#         #frappe.msgprint(f"{frontend_path}")

#         # Start Vite dev server
#         subprocess.Popen(["npm", "run", "build"], cwd=frontend_path)

#         return {"status": "started"}
#     except Exception as e:
#         return {"status": "error", "message": str(e)}


# myapp/myapp/api/devserver.py

import subprocess
import frappe
import os

@frappe.whitelist()
def build_static_ui():
    try:
        app_path = frappe.get_app_path('myapp')
        frontend_path = os.path.join(app_path, 'frontend')

        # Run build and wait until it completes
        result = subprocess.run(["npm", "run", "build"], cwd=frontend_path, capture_output=True, text=True)

        if result.returncode == 0:
            return {"status": "success", "output": result.stdout}
        else:
            return {"status": "error", "message": result.stderr}
    except Exception as e:
        return {"status": "error", "message": str(e)}
