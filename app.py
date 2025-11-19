import json
import os
from flask import Flask, render_template, request
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Load projects data
def load_projects():
    with open('projects_new.json', 'r') as f:
        return json.load(f)

# Load visitor logs
def load_visitor_logs():
    try:
        with open('visitor_logs.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# Save visitor log
def save_visitor_log(ip, timestamp):
    logs = load_visitor_logs()
    logs.append({'ip': ip, 'timestamp': timestamp})
    with open('visitor_logs.json', 'w') as f:
        json.dump(logs, f, indent=4)

# Route for home page
@app.route("/")
def home():
    projects = load_projects()
    visitor_ip = request.remote_addr
    timestamp = datetime.now().isoformat()
    save_visitor_log(visitor_ip, timestamp)
    
    # Categorize projects
    categorized_projects = {
        'Projects': [p for p in projects if p.get('category') == 'Projects'],
        'Presentations': [p for p in projects if p.get('category') == 'Presentations'],
        'Labs': [p for p in projects if p.get('category') == 'Labs']
    }
    
    return render_template("index.html", projects=projects, categorized_projects=categorized_projects, visitor_ip=visitor_ip)

# Route for About page (optional)
@app.route("/about")
def about():
    return render_template("index.html", section="about")

# Route for Projects page (optional)
@app.route("/projects")
def projects():
    return render_template("index.html", section="projects")

# Route for Contact page (optional)
@app.route("/contact")
def contact():
    return render_template("index.html", section="contact")

# Route to handle contact form submission
@app.route("/contact", methods=["POST"])
def submit_contact():
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject")
    message = request.form.get("message")

    # Here you can add logic to save to database, send email, etc.
    # For now, just print to console
    print(f"New contact message from {name} ({email}): {subject}")
    print(f"Message: {message}")

    # You could redirect to a thank you page or back to contact
    return render_template("index.html", section="contact", message_sent=True)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
