install:
	@echo "Installing dependencies..."
	npm install
	@echo "Setting up Husky..."
	npx husky init
	@echo "Setting up pre-commit hook for lint-staged..."
	echo "npx lint-staged" > .husky/pre-commit
	chmod +x .husky/pre-commit
	@echo "Setting up commit-msg hook for commitlint..."
	echo "npx --no -- commitlint --edit \$$1" > .husky/commit-msg
	chmod +x .husky/commit-msg
	@echo "Installation complete!"