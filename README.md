# Dizplai Coding Challenge by James Wildbure

Welcome! Thanks for taking the time to review my submission. Below is some information about the app to help you deploy, test and understand some of my decisions.

## Getting Started

The preferred way to run the application is via containers. To deploy the application you will need Docker installed. All you have to do is install Docker Desktop, no further setup should be required.

Please refer to the following links for install instructions:

- Windows: https://docs.docker.com/desktop/setup/install/windows-install/
- Mac: https://docs.docker.com/desktop/setup/install/mac-install/

Once installed, to deploy the application simply run **docker compose up** from the root directory.

Once deployed, the application will be available at http://localhost:3000

To test the API (for example via Postman), the API is served on http://localhost:5000

If you wish to inspect the database, you can exec into the database container with the following:

```bash
docker exec -it mongo-container bash

# Once inside open the mongo shell
mongosh

# Once inside the mongo shell, switch to the dizplai database
use dizplai
```

To run the app in developer mode, please ensure all dependencies have been installed via **npm i** in each package, then run the following command in both the client and server directories: **npm run dev**
The exposed ports are the same.

## Assumptions

- Only one poll can be active at a time. On creation of a poll, this poll becomes the active poll.
- We are not accounting for users in any way. No use of any session data to persist a voting session has occurred. On reload of the page, the poll will be re-enabled and the same user can vote again

## Server

### Testing

A sample of unit tests have been created per the spec, colocated alongside their corresponding file. To run these tests simply run **npm run test** from the server directory

### Design choices

#### 3 layer architecture

The API follows a simple 3-layer architecture.

In this case, our layers are:

- API layer - src/controllers
- Service layer - src/services
- Data access layer - src/repositories

Reasoning:

- Clear separation of concerns - each layer serves a specific purpose
- Testability
- Readability

#### Allow /polls/active endpoint to query for multiple polls

In spite of the above assumption that only one poll can be active at once, I have opted to support querying for multiple active polls. This ensures the API does not need to be modified should the need for multiple active polls be introduced in the future.

#### Foregoing transactions when performing multiple database operations

In the voteOnPoll method of the pollService, I initially wrapped the two database operations in a transaction session. This is to ensure atomicity - we either want both operations to succeed, or none of them, otherwise our database could have stale or out of sync data. In order to use transactions, however, MongoDB requires the deployment of a replica set. For the sake of this exercise I chose not to do this.

## Client

### Testing

Tests are written using Vitest and React Testing Library. Vitest (unlike jest) recognises ESM and therefore does not require an explicit transpilation step. React Testing Library allows us to write tests that focus on the user's experience, as opposed to testing implementation details. This decoupling from implementation details ensures tests are not sensitive to refactors and improves test confidence by ensuring our components do what users need them to - we don't care about the how.

To run unit tests, simply run **npm run test** from the **client** directory.

Only a subset of tests have been written, per the task's requirements. These test files are colocated alongside their corresponding component files.

### Design choices

#### Error handling when querying the API

The query functions used by the various hooks to query the API do not contain any explicit error handling. This is because Tanstack Query will catch any errors thrown (or promise rejections) by the query function to populate the query's returned error state. We use axios as our HTTP client which automatically throws errors on unsuccessful HTTP calls

## End to End Testing

A sample end-to-end test has been written. To run it please navigate to the e2e directory and run **npx playwright test** (or **npx playwright test --ui** for headed mode). The application needs to be deployed in developer mode.
