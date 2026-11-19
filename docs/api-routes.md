# API routes — V1

## Conventions

- Request and response bodies are JSON.
- Every route requires an `Authorization: Bearer <token>` header, except `/auth/*`.
- Errors always use the same format:

```json
{ "error": { "code": "USERNAME_TAKEN", "message": "This username is already taken." } }
```

| Status | Meaning                                                                             |
| ------ | ----------------------------------------------------------------------------------- |
| `400`  | Invalid input (malformed body or query, business rule violated by the input itself) |
| `401`  | Not authenticated (missing or invalid token, wrong credentials)                     |
| `403`  | Authenticated member, but not allowed to do this                                    |
| `404`  | Resource not found, or the user is not a member of the group                        |
| `409`  | Valid request that conflicts with the current state of the data                     |

## Common errors

These apply to every route concerned and are not repeated below:

- `400 VALIDATION_ERROR`: the body or query parameters are invalid.
- `401 UNAUTHENTICATED`: missing or invalid token (all routes except `/auth/*`).
- `404 GROUP_NOT_FOUND`: the group does not exist or the user is not a member (all `/groups/:groupId/...` routes). We never reveal that a group exists to a non-member.

## Routes

| #   | Method   | Path                                | Success                                    | Specific errors                                                                                       |
| --- | -------- | ----------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| 1   | `POST`   | `/auth/register`                    | `201` created user (no password)           | `409 USERNAME_TAKEN`                                                                                  |
| 2   | `POST`   | `/auth/login`                       | `200` `{ token }`                          | `401 INVALID_CREDENTIALS`                                                                             |
| 3   | `GET`    | `/me`                               | `200` current user                         | —                                                                                                     |
| 4   | `POST`   | `/groups`                           | `201` created group                        | —                                                                                                     |
| 5   | `GET`    | `/groups`                           | `200` my groups                            | —                                                                                                     |
| 6   | `GET`    | `/groups/:groupId`                  | `200` group with owner and members         | —                                                                                                     |
| 7   | `DELETE` | `/groups/:groupId`                  | `204`                                      | `403 NOT_GROUP_OWNER`                                                                                 |
| 8   | `POST`   | `/groups/:groupId/members`          | `201` created membership                   | `403 NOT_GROUP_OWNER` · `404 USER_NOT_FOUND` · `409 ALREADY_MEMBER`                                   |
| 9   | `DELETE` | `/groups/:groupId/members/:userId`  | `204`                                      | `403 NOT_GROUP_OWNER` · `404 MEMBER_NOT_FOUND` · `409 CANNOT_REMOVE_OWNER` · `409 MEMBER_HAS_MATCHES` |
| 10  | `POST`   | `/groups/:groupId/games`            | `201` created game                         | `409 GAME_NAME_TAKEN`                                                                                 |
| 11  | `GET`    | `/groups/:groupId/games`            | `200` games, sorted by name                | —                                                                                                     |
| 12  | `DELETE` | `/groups/:groupId/games/:gameId`    | `204`                                      | `403 NOT_GROUP_OWNER` · `404 GAME_NOT_FOUND` · `409 GAME_HAS_MATCHES`                                 |
| 13  | `POST`   | `/groups/:groupId/matches`          | `201` created match                        | `400 INVALID_MATCH`                                                                                   |
| 14  | `PATCH`  | `/groups/:groupId/matches/:matchId` | `200` updated match                        | `400 INVALID_MATCH` · `403 NOT_MATCH_AUTHOR_OR_OWNER` · `404 MATCH_NOT_FOUND`                         |
| 15  | `DELETE` | `/groups/:groupId/matches/:matchId` | `204`                                      | `403 NOT_MATCH_AUTHOR_OR_OWNER` · `404 MATCH_NOT_FOUND`                                               |
| 16  | `GET`    | `/groups/:groupId/matches`          | `200` paginated matches, most recent first | —                                                                                                     |
| 17  | `GET`    | `/groups/:groupId/leaderboard`      | `200` leaderboard                          | —                                                                                                     |

## Details

### Add a member (8)

Body: `{ "username": "paul" }`

### Match rules (13, 14) → `400 INVALID_MATCH`

- the game belongs to the group;
- the date is not in the future;
- at least 2 participants, all members of the group, no duplicates;
- at least 1 winner, every winner is a participant.

### Match history (16)

| Query parameter | Default | Description                |
| --------------- | ------- | -------------------------- |
| `gameId`        | —       | filter by game             |
| `page`          | `1`     | page number                |
| `pageSize`      | `20`    | matches per page (max 100) |

Response: `{ "data": [...], "page": 1, "pageSize": 20, "total": 57 }`

### Leaderboard (17)

| Query parameter | Default | Description                                              |
| --------------- | ------- | -------------------------------------------------------- |
| `sort`          | `wins`  | `wins` or `winRate`, descending; ties sorted by username |
| `gameId`        | —       | filter by game                                           |
