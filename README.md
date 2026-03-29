Create Folders

mkdir src
mkdir src/calculator
mkdir tests
mkdir public
mkdir .github
mkdir .github/workflows

Create Files

New-Item src/calculator/calculator.js -ItemType File
New-Item tests/calculator.test.js -ItemType File
New-Item public/index.html -ItemType File
New-Item public/style.css -ItemType File
New-Item public/app.js -ItemType File
New-Item README.md -ItemType File
New-Item .gitignore -ItemType File

# 🧮 Calculator Project

A simple calculator application built with JavaScript, including unit tests and a basic web interface.

---

## 📁 Project Structure

.
├── src/
│ └── calculator/
│ └── calculator.js # Core calculator logic
├── tests/
│ └── calculator.test.js # Unit tests
├── public/
│ ├── index.html # Main HTML file
│ ├── style.css # Styling
│ └── app.js # Frontend logic
├── .github/
│ └── workflows/ # CI/CD workflows
├── README.md # Project documentation
└── .gitignore # Ignored files

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-name>