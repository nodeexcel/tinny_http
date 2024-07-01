# Contributing

Contributions are always welcome, here's an instruction of how to contribute.

## Local setup

### Install

- Fork and then clone the repo

```sh
gh repo fork tinyhttp/tinyhttp --clone
```

- Install latest Node.js and `pnpm`:

```sh
# Install fnm
curl -fsSL https://github.com/Schniz/fnm/raw/master/.ci/install.sh | bash

# Install latest Node.js version
fnm install latest
fnm use latest

# Install pnpm
corepack enable
corepack prepare pnpm@latest --activate
```

- Install the dependencies at root and in the packages:

```sh
pnpm i && pnpm i -r
```

- Build fresh packages

```sh
pnpm build
```

### Formatting

If you use VS Code, please install Biome extension for proper linting and code formatting.

If your editor doesn't have such extension, use `pnpm check`.

## Submitting PRs

### General rules

Here's a small list of requirements for your PR:

- it should be linted and formatted properly using configurations in the root
- it should build without errors and warnings (except edge cases)
- it should have been tested
- PR must have a clear description of what it does, which part of the repo it affects
- if PR is adding a new middleware, please contact a maintainer instead. We'll create a new repo in this org for you.

### Adding new middleware

- Create a new repository from official template
- Open an issue with "new middleware" label or contact a maintainer.

### Adding new non-middleware module

- Copy package.json from nearest package to match the style
- Write a good README, following the style from other packages
- Go to `tests/modules` folder
- Write some tests
- Pull request!

### Adding new example

- Create a folder with the package name in `examples` folder
- Create `package.json` with these fields:

```json
{
  "name": "<name>",
  "private": true,
  "type": "module",
  "module": "index.js"
}
```

- create `index.js` file
- create some cool example, the simpler the better
- create `README.md` with example title and setup instructions (copy from any near folder and replace needed fields)
- Pull request!

In most other cases, additional steps aren't required. Install, write, test, lint and your code is ready to be submitted!

If everything from the list is done right, feel free to submit a PR! I will look into it asap.