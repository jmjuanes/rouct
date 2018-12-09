PHONY: build build-dev build-prod

# Node binaries path
NODE_BIN=./node_modules/.bin

# Build for development
build-dev:
	${NODE_BIN}/rollup -c rollup.config.js --environment NODE_ENV:development

# Build for production
build-prod:
	${NODE_BIN}/rollup -c rollup.config.js --environment NODE_ENV:production

# Build
build:
	make build-dev
	make build-prod

