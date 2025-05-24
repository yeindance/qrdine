![MVP](doc/logo.svg)

# QR Dine

Restaurant order management makes easy.

![MVP](doc/mvp.png)

### development

- install docker
- copy `.env.example` to `.env`
- run `npm run dev`
- run `npm run cli dev-setup` to setup databases
- graphql playground is available at `http://{host}:{port}/graphql`
- please read onboarding.md for more details

### note

- restart `docker compose` after making changes in .env
- lodash default import doesn't work should be imported as `* as _`
- typeorm @Column default does not set default value

&nbsp;

# Onboarding

## glossary

- **merchant**: a business that uses our platform to manage their products and orders

## Database Overview

![MVP](doc/merchant-schema.png)

- multi-tenant architecture (each merchant has its own database)

### `hub` database

- stores metadata of all merchants

## graphql and typeorm

### creating/modifying a table

- modify sql file
- create a Typeorm entity (It also defines Graphql type)
