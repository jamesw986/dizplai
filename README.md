# Dizplai Coding Challenge by James Wildbure

Welcome! Thanks for taking the time to review my submission. Below is some information about the app to help you deploy, test and understand some of my decisions.

## Assumptions

- Only one poll can be active at a time. On creation of a poll, this poll becomes the active poll.
- We are not accounting for users in any way. No use of any session data to persist a voting session has occurred. On reload of the page, the poll will be re-enabled and the same user can vote again

## Server

### Design choices

#### 3 layer architecture

The API follows a simple 3-layer architecture.

In this case, our layers are:

- API layer - src/controllers
- Service layer - src/services
- Repository layer - src/repositories

Reasoning:

- Clear separation of concerns - each layer serves a specific purpose
- Testability

#### Allow /polls/active endpoint to query for multiple polls

In spite of the above assumption that only one poll can be active at once, I have opted to support querying for multiple active polls. This ensures the API does not need to be modified should the need for multiple active polls be introduced in the future.

## Client

### Testing

Tests are written using Vitest and React Testing Library. Vitest (unlike jest) recognises ESM and therefore does not require an explicit transpilation step. React Testing Library allows us to write tests that focus on the user's experience, as opposed to testing implementation details. This decoupling from implementation details ensures tests are not sensitive to refactors and improves test confidence by ensuring our components do what users need them to - we don't care about the how.

To run unit tests, simply run **npm run test** from the **client** directory.

### Design choices

#### Error handling when querying the API

The query functions used by the various hooks to query the API do not contain any explicit error handling. This is because Tanstack Query will catch any errors thrown (or promise rejections) by the query function to populate the query's returned error state. We use axios as our HTTP client which automatically throws errors on unsuccessful HTTP calls
