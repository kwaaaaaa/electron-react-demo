# Electron React Demo

A basic starter for electron, react (with redux), with deployment to github

## Getting Started

## Release workflow
- build on every commit to "master"
### if release needed
- bump version in package.json
- commit that
- create tag "git tag v0.1.0" (starting with "v" letter)
- push the tags "git push --tags"

### Test

* Install node, npm, yarn

```
yarn install
yarn start
```

### Build and deployment

```
yarn build
yarn dist
```