<p align="center">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="center" width="30%">
</p>
<p align="center"><h1 align="center">TASK-MANAGER</h1></p>
<p align="center">
	<em><code>Advanced Task Manager and To-Do List Application</code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/akshay-k-a-dev/task-manager?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/akshay-k-a-dev/task-manager?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/akshay-k-a-dev/task-manager?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/akshay-k-a-dev/task-manager?style=default&color=0080ff" alt="repo-language-count">
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
  - [Project Index](#project-index)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
- [Project Roadmap](#project-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Note](#note)

---

## Overview

This Task Manager is an advanced to-do list application built with **Svelte**, **Vite**, **TypeScript**, **JavaScript**, **SQLite**, and **Express**. The app provides an intuitive and minimalistic interface to help users manage tasks and sub-tasks efficiently.

---

## Features

- **Add, Remove, and Delete Tasks:** Manage your to-do list with ease.
- **Sub-Task Support:** Break down complex tasks into manageable sub-tasks.
- **User Authentication:** Log in to save and access your task data.
- **Minimalistic UI:** A clean, distraction-free interface for focused productivity.

---

## Project Structure

```sh
└── task-manager/
    ├── LICENSE
    ├── README.md
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.svelte
    │   ├── app.css
    │   ├── assets
    │   ├── lib
    │   ├── main.ts
    │   ├── server
    │   └── vite-env.d.ts
    ├── svelte.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

### Project Index

<details open>
	<summary><b><code>TASK-MANAGER/</code></b></summary>
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<table>
				<tr><td><b><a href='src/main.ts'>main.ts</a></b></td><td>Entry point for the app</td></tr>
				<tr><td><b><a href='src/app.css'>app.css</a></b></td><td>Global styles</td></tr>
				<tr><td><b><a href='src/App.svelte'>App.svelte</a></b></td><td>Main app component</td></tr>
				<tr><td><b><a href='src/server/index.js'>server/index.js</a></b></td><td>Express server setup</td></tr>
				<tr><td><b><a href='src/server/database.sqlite'>database.sqlite</a></b></td><td>SQLite database file</td></tr>
				<tr><td><b><a href='src/lib/components/Login.svelte'>Login.svelte</a></b></td><td>Login component</td></tr>
				<tr><td><b><a href='src/lib/components/TaskItem.svelte'>TaskItem.svelte</a></b></td><td>Individual task component</td></tr>
				<tr><td><b><a href='src/lib/stores/tasks.ts'>tasks.ts</a></b></td><td>Task data store</td></tr>
			</table>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

Ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** npm

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/akshay-k-a-dev/task-manager/
cd task-manager
npm install
```

### Usage

Run the application:

```sh
npm start
```

### Testing

To run the test suite:

```sh
npm test
```

---

## Project Roadmap

- [X] Implement basic task management.
- [ ] Add advanced filtering options.
- [ ] Integrate notifications for due tasks.
- [ ] Improve UI responsiveness for mobile devices.
- [ ] Add multi-user support with data sync across devices.

---

## Contributing

Contributions are welcome! Follow these steps:

1. **Fork the Repository**: Start by forking the project to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine.
   ```sh
   git clone https://github.com/your-username/task-manager/
   ```
3. **Create a New Branch**: Create a branch for your feature or bug fix.
   ```sh
   git checkout -b new-feature-branch
   ```
4. **Make Your Changes**: Implement your changes and test them locally.
5. **Commit and Push**: Commit with a clear message and push your changes.
   ```sh
   git commit -m 'Added feature X'
   git push origin new-feature-branch
   ```
6. **Submit a Pull Request**: Submit a PR against the original project repository.

For more details, see the [Contributing Guidelines](https://github.com/akshay-k-a-dev/task-manager/CONTRIBUTING.md).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

Special thanks to contributors and open-source libraries used in this project.

---

## Note
This code is optimised to run locally, several issues raised while hosting 

