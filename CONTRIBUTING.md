# Contributing to React Component Library

Thank you for considering contributing to our React component library! This document outlines the steps for setting up the development environment and guidelines for contributing code.

## Development Setup

### 1. Install Dependencies & setup

First, install the project dependencies by running:

```bash
npm run init
```

### 2. Commit Message Guidelines

We enforce commit message conventions using `commitlint`. This ensures a consistent and understandable commit history, which is helpful for team collaboration and changelog generation.

#### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) format. Examples of valid commit messages include:

- `feat: add new Button component`
- `fix: resolve issue with form validation`
- `chore: update dependencies`

A commit message consists of a type, an optional scope, and a subject:

```
<type>(<scope>): <subject>
```

#### Supported Types

- `feat`: A new feature.
- `fix`: A bug fix.
- `chore`: Minor tasks like refactoring or updating dependencies.
- `docs`: Documentation changes.
- `style`: Code style changes (e.g., formatting).
- `refactor`: Code changes that neither fix bugs nor add features.
- `test`: Adding or correcting tests.

### 3. Git Hooks

We use Husky to manage Git hooks for this project. These hooks ensure that the code is always linted and that commit messages follow the required conventions.

The Git hooks are automatically set up when you run `npm run init`. This command executes the following steps:

1. Installs project dependencies
2. Initializes Husky
3. Sets up the pre-commit hook for lint-staged
4. Sets up the commit-msg hook for commitlint

#### Pre-Commit Hook

We use `lint-staged` and `ESLint` to automatically lint and fix staged files before every commit. The pre-commit hook will run `lint-staged`, which ensures that only the staged files (files that have been `git add`-ed) are linted and fixed.

The pre-commit hook is located in `.husky/pre-commit`.
In the `package.json`, we have defined the `lint-staged`.

#### Commit Message Hook

The commit message hook is located in `.husky/commit-msg`. It ensures that commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) guidelines.

This will validate each commit message before allowing the commit to proceed.

#### Skipping Hooks

In rare cases where you need to bypass the Git hooks (not recommended for normal development), you can use the `--no-verify` flag with your Git commands. For example:

```bash
git commit -m "feat: add new feature" --no-verify
```

However, use this with caution as it bypasses the quality checks put in place by the hooks.

#### **Overall**

This configuration ensures that any staged `.js` or `.jsx` files are linted, automatically fixed, and re-added to the commit. The commit message is validated and follows the guidelines described above.

By following these guidelines and utilizing the Git hooks, we maintain a high standard of code quality and consistent commit history in our project.

### 4. Running Lint Manually

You can also manually run the linter across the entire project by running:

```bash
npm run lint
```

This will lint all `.js` and `.jsx` files in the `src/` directory and automatically fix issues where possible.

## Publishing Changes

Once your changes are linted, tested, and ready, follow the proper [Conventional Commits](https://www.conventionalcommits.org/) format when writing your commit message, and submit your pull request.

We are excited to see your contributions!

---

Thank you for contributing to the project!

### Explanation of Sections:

- **Install Dependencies**: This explains how to install the required project dependencies.
- **Install Husky**: Provides instructions to set up Husky for managing Git hooks.
- **Pre-Commit Linting**: Explains how the pre-commit hook uses `lint-staged` to lint and fix staged files.
- **Commit Message Guidelines**: Describes the commit message format and enforces conventions using `commitlint`.
- **Git Hooks**: Details the pre-commit and commit-msg hooks, including how to manually create them.
- **Running Lint Manually**: Instructions on how to manually run the linter on the project.

This file ensures that contributors are aware of the project’s Git hooks, linting requirements, and commit message conventions. Let me know if you need further adjustments!