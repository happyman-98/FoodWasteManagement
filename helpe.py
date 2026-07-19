import os

# Change this to the folder you want to scan
root_folder = r"C:\Users\acer\Desktop\current_project\pythonProjects\devpost\FoodWasteManagement\frontend\src"

# Output file
output_file = "frontend_src.txt"

with open(output_file, "w", encoding="utf-8") as f:
    for current_path, folders, files in os.walk(root_folder):
        # Calculate indentation based on folder depth
        level = current_path.replace(root_folder, "").count(os.sep)
        indent = "    " * level

        # Write current folder
        folder_name = os.path.basename(current_path)
        if folder_name == "":
            folder_name = current_path
        f.write(f"{indent}[Folder] {folder_name}\n")

        # Write files
        sub_indent = "    " * (level + 1)
        for file in files:
            f.write(f"{sub_indent}[File] {file}\n")

print(f"Folder structure saved to '{output_file}'")

