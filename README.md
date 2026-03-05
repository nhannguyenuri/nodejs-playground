# NodeJS Playground

## Author

**Nhan Nguyen**

- [github/nhannguyendevjs](https://github.com/nhannguyendevjs)
- [twitter/nhannguyendevjs](https://twitter.com/nhannguyendevjs)
- [linkedin/nhannguyendevjs](https://www.linkedin.com/in/nhannguyendevjs)
- [dev.to/nhannguyendevjs](https://dev.to/nhannguyendevjs)
- [medium/nhannguyendevjs](https://medium.com/@nhannguyendevjs)

## License

Copyright © 2026, [Nhan Nguyen](https://github.com/nhannguyendevjs).

Released under the [MIT License](LICENSE).

## Docker

### MongoDB

```bash
docker run -d --network my-network --name my-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo:latest

docker exec -it my-mongo mongosh
```

Connection string:

```txt
mongodb://admin:admin@localhost:27017/
```

### PostgreSQL

```bash
docker run --name my-postgres --network my-network -p 5432:5432 -e POSTGRES_DB=mydb -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -d postgres:latest

docker run -d --name pgadmin4 -p 5050:80 --network my-network -e PGADMIN_DEFAULT_EMAIL=admin@admin.com -e PGADMIN_DEFAULT_PASSWORD=admin dpage/pgadmin4:latest

docker exec -it my-postgres psql -U admin -d mydb
```

Connection string:

```txt
postgres://admin:admin@localhost:5432/mydb?schema=public
```

### Redis

```bash
docker run -d --network my-network --name my-redis -p 6379:6379 redis:latest
```

### Keycloak

```bash
docker run -d --name keycloak --network my-network -p 8080:8080 -p 8443:8443 -p 9000:9000 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=P@ssw0rd quay.io/keycloak/keycloak start-dev
```

Keycloak Admin Console: <http://localhost:8080/admin>

Keycloak Account Console: <http://localhost:8080/realms/myrealm/account>

## Coding Naming Conventions

➖ PascalCase 👉 Classes and Methods

➖ camelCase 👉 variable and function names

➖ snake_case 👉 file names and variable identifiers

➖ kebab-case 👉 HTML attributes and CSS classes

➖ UPPERCASE 👉 CONSTANTS and ENUMERATIONS

➖ UPPER_SNAKE_CASE 👉 CONSTANTS and ENVIRONMENT_VARIABLES

## Git Branch Naming Convention

### Code Flow Branches

➖ Development (dev)

All new features and bug fixes should be brought to the development branch.

➖ QA/Test (test)

Contains all codes ready for QA testing.

➖ Staging (staging, Optional)

It contains tested features that the stakeholders wanted to be available either for a demo or a proposal before elevating into production.

➖ Master (master)

The production branch, if the repository is published, is the default branch being presented.

### Temporary Branches

#### ➖ Feature

Any code changes for a new module or use case should be done on a feature branch. This branch is created based on the current development branch. When all changes are Done, a Pull Request/Merge Request is needed to put all of these to the development branch.

Examples:

- feature/AZURE-1234
- feature/AZURE-5678

#### ➖ Bug Fix

If the code changes made from the feature branch were rejected after a release, sprint or demo, any necessary fixes after that should be done on the bugfix branch.

Examples:

- bugfix/AZURE-1234
- bugfix/AZURE-5678

#### ➖ Hot Fix

If there is a need to fix a blocker, do a temporary patch, or apply a critical framework or configuration change that should be handled immediately, it should be created as a Hotfix. It does not follow the scheduled integration of code and could be merged directly to the production branch and then into the development branch later.

Examples:

- hotfix/disable-endpoint-zero-day-exploit
- hotfix/increase-scaling-threshold

#### ➖ Experimental

Any new feature or idea that is not part of a release or a sprint. A branch for playing around.

Examples:

- experimental/dark-theme-support

#### ➖ Build

A branch specifically for creating specific build artifacts or for doing code coverage runs.

Examples:

- build/azure-metric

#### ➖ Release

A branch for tagging a specific release version.

Examples:

- release/app-1.0.0

#### ➖ Merging

A temporary branch for resolving merge conflicts, usually between the latest development and a feature or Hotfix branch. This can also be used if two branches of a feature being worked on by multiple developers need to be merged, verified, and finalized.

Examples:

- merge/dev_lombok-refactoring
- merge/combined-device-support

## MongoDB Naming Conventions

Use clear, descriptive names. Use camelCase for multi-word names. Avoid using MongoDB reserved words.

## RESTful API Design Rules

### URI Design Rules

- **Use nouns, not verbs**: URIs should represent resources (e.g., /users, /orders), not actions.
- **Use plural nouns for collections**: /users instead of /user.
- **Use hierarchical structure for relationships**: /users/{id}/orders instead of deep nesting.
- **Avoid deep nesting**: Limit to 2-3 levels (e.g., /users/{id}/orders, not /users/{id}/orders/{orderId}/items/{itemId}).
- **Use query parameters for filtering**: /orders?status=pending instead of /orders/pending.

### HTTP Methods & Status Codes

Use standard HTTP methods:

- **GET** → Retrieve data
- **POST** → Create new resources
- **PUT** → Replace entire resource
- **PATCH** → Update part of a resource
- **DELETE** → Remove a resource

Use appropriate HTTP status codes:

- **200 OK** → Successful retrieval or update
- **201 Created** → Resource successfully created
- **204 No Content** → Successful delete/update with no return body
- **400 Bad Request** → Invalid request
- **401 Unauthorized** → Authentication required
- **403 Forbidden** → No permission
- **404 Not Found** → Resource doesn’t exist
- **500 Internal Server Error** → Unexpected error

### Hypermedia & Response Structure

- Use HATEOAS (Hypermedia links for better navigation).
- Return created resources with POST (or provide Location header).
- Use consistent response formats (JSON).

### Pagination & Filtering

- Paginate large responses:
  - Use limit and offset (GET /users?limit=20&offset=40).

- Response should include metadata:

```json
{
  "total": 1000,
  "page": 3,
  "per_page": 20,
  "users": [ ... ]
}
```

- Use query parameters for filtering:

```plaintext
/orders?status=shipped&date=2024-02-05
```

### API Versioning

Version APIs to avoid breaking changes:

- **Use URL versioning**: /v1/users
- **Or use header versioning**: Accept: application/vnd.myapi.v1+json

### Security & Authentication

- Use HTTPS for all API requests.
- Require authentication for sensitive data (JWT, OAuth, API Keys).
- Use 403 Forbidden for unauthorized access attempts.

## Issues
