import tkinter as tk
from tkinter import ttk

class Calculator(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Modern Calculator")
        self.geometry("320x450")
        self.configure(bg="#2c2c2c")
        self.resizable(False, False)

        style = ttk.Style(self)
        self.tk.call("source", "azure.tcl")
        style.theme_use("azure-dark")

        self.expression = ""
        self.create_widgets()

    def create_widgets(self):
        # Display
        self.display_var = tk.StringVar()
        display = ttk.Entry(self, textvariable=self.display_var, font=("Segoe UI", 24), justify="right", state="readonly")
        display.pack(fill="x", padx=10, pady=20, ipady=10)

        # Button layout
        btns = [
            ["C", "(", ")", "/"],
            ["7", "8", "9", "*"],
            ["4", "5", "6", "-"],
            ["1", "2", "3", "+"],
            ["0", ".", "=",]
        ]
        for row in btns:
            frame = ttk.Frame(self)
            frame.pack(fill="x", padx=10, pady=5)
            for btn in row:
                b = ttk.Button(frame, text=btn, command=lambda x=btn: self.on_button_click(x), style="Accent.TButton")
                b.pack(side="left", expand=True, fill="both", padx=5, pady=2)

    def on_button_click(self, char):
        if char == "C":
            self.expression = ""
        elif char == "=":
            try:
                self.expression = str(eval(self.expression))
            except Exception:
                self.expression = "Error"
        else:
            if self.expression == "Error":
                self.expression = ""
            self.expression += str(char)
        self.display_var.set(self.expression)

if __name__ == "__main__":
    # Download Azure theme if not present: https://github.com/rdbende/Azure-ttk-theme
    # Save 'azure.tcl' in the same directory as this script
    app = Calculator()
    app.mainloop()