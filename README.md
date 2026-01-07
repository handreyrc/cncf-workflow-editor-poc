<!--
   Licensed to the Apache Software Foundation (ASF) under one
   or more contributor license agreements.  See the NOTICE file
   distributed with this work for additional information
   regarding copyright ownership.  The ASF licenses this file
   to you under the Apache License, Version 2.0 (the
   "License"); you may not use this file except in compliance
   with the License.  You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing,
   software distributed under the License is distributed on an
   "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
   KIND, either express or implied.  See the License for the
   specific language governing permissions and limitations
   under the License.
-->

# CNCF Workflow Editor

---

## Contribute

- _Work in progress 🔨_

## Build from source

#### Step 0: Install the necessary tools

> **💡 RECOMMENDED**
>
> **Nix development environment**: A _devbox_ configuration is provided to automatically setup all the tools below. Read more in [here](./repo/NIX_DEV_ENV.md).

To build and test all packages on this repository, you're going to need:

- Node.js `22` _(To install, follow these instructions: https://nodejs.org/en/download/package-manager/)_
- pnpm `9.3.0` _(To install, follow these instructions: https://pnpm.io/installation#using-npm)_
- Maven `3.9.6`
- Java `17`
- Go `1.24.10` _(To install, follow these instructions: https://go.dev/doc/install)_
- Python `3.12` _(To install, follow these instructions: https://www.python.org/downloads/)_
- Helm `3.13.3` _(To install, follow these instructions: https://helm.sh/docs/intro/install/)_
- Make
- xmllint _(To install, follow these instructions: https://www.baeldung.com/linux/xmllint)_
- bash `5.x` _(On Linux or Nix you should be fine. On macOS, follow these instructions to use zsh: https://support.apple.com/102360)_

#### Step 1: Bootstrap

Installs the necessary 3rd party dependencies and links packages of this repository together.

- `pnpm bootstrap` --> Will bootstrap all packages
- `pnpm bootstrap [pnpm-filter]` --> Will bootstrap packages filtered by [`pnpm`-filter](https://pnpm.io/filtering)
- > E.g.,
  >
  > `pnpm bootstrap -F cncf-workflow-editor...` bootstraps the `cncf-workflow-editor` package and its dependencies.

#### Step 2: Build

- Dev

  - `pnpm -r build:dev`
    - Will build all packages for development. Skipping linters, tests, minifiers etc.
  - `pnpm [pnpm-filter] build:dev`
    - Will build packages filtered by [`pnpm`-filter](https://pnpm.io/filtering)
  - > E.g.,
    >
    > `pnpm -F cncf-workflow-editor... build:dev` builds the `cncf-workflow-editor` package and its dependencies.

- Prod

  - `pnpm -r build:prod`
    - Will build all packages for production. Optimizers will run, binaries will be produced for multiple architectures etc.
  - `pnpm [pnpm-filter] build:prod`
    - Will build packages filtered by [`pnpm`-filter](https://pnpm.io/filtering)
  - > E.g.,
    >
    > `pnpm -F cncf-workflow-editor... build:prod` builds the `cncf-workflow-editor` package and its dependencies.

- Local changes
  - `pnpm run on-affected [cmd]` (_alias for `pnpm -F '...[HEAD]'`_); or
  - `pnpm run on-affected-only [cmd]` (_alias for `pnpm -F '...^[HEAD]'`_); or
  - `pnpm run on-changed [cmd]` (_alias for `pnpm -F '[HEAD]'`_); or
  - `pnpm run on-changed-deps-only [cmd]` (_alias for `pnpm -F '[HEAD]^...'`_);
  - > E.g.,
    >
    > If you have local changes (staged or unstaged) done to the `cncf-workflow-editor` package:
    >
    > - `pnpm run on-affected build:dev`
    >   - builds the `cncf-workflow-editor` package and all packages that depend on it.
    > - `pnpm run on-affected-only build:dev`
    >   - doesn't build the `cncf-workflow-editor` package, but builds all packages that depend on it.
    > - `pnpm run on-changed build:dev`
    >   - builds the `cncf-workflow-editor` package and nothing else.
    > - `pnpm run on-changed-deps-only build:dev`
    >   - doesn't build the `cncf-workflow-editor` package, but builds all packages that it depends on.

#### Step 3: Run

To run and test components embedded in Storybook App check if `package.json` of the package contains a script to build and run the app.

> **ℹ️ NOTE**
>
> Specific package scripts are avalable only from within the package, `../packages/cncf-workflow-editor`.

- Run Storybook app
  - `pnpm run start:linux:darwin` build Storybook app and start a local web server

---
