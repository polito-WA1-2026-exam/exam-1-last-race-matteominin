# Exam #1: "Last Race"
## Student: s364179 MININ MATTEO

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- Base URL: `http://localhost:3001/api/v1`

- POST `/api/v1/sessions`
  - login with `username` and `password` in the request body
  - response: `{ id, username }`
  - returns `201` on successful authentication

- GET `/api/v1/sessions/current`
  - returns the authenticated user's session info
  - response: `{ id, username }`
  - requires authentication, returns `401` if not authenticated

- DELETE `/api/v1/sessions/current`
  - logs out the current session
  - response: empty body

- GET `/api/v1/map`
  - returns map data for the game
  - response: `{ lines, stations, segments }`
  - requires authentication, returns `401` if not authenticated

- POST `/api/v1/games`
  - starts a new game for the authenticated player
  - response: newly created game object
  - requires authentication, returns `401` if not authenticated
  - returns `400` if the player already has an active game

- GET `/api/v1/games/current`
  - returns the authenticated player's active game
  - response: active game object
  - requires authentication, returns `401` if not authenticated
  - returns `404` if no active game exists

- PUT `/api/v1/games/current`
  - updates the authenticated player's current game
  - request body: `{ route }`
  - response: updated game result
  - requires authentication, returns `401` if not authenticated

- GET `/api/v1/leaderboard`
  - returns the leaderboard of top players
  - response: array of `{ username, record }`

## Database Tables

- Table `users` - contains `id`, `username`, `hash`, `salt`
- Table `lines` - contains `id`, `name`
- Table `stations` - contains `id`, `name`
- Table `segments` - contains `id`, `station1_id`, `station2_id`, `line_id`
- Table `events` - contains `id`, `name`, `description`, `effect`
- Table `games` - contains `id`, `status`, `player_id`, `start_station_id`, `end_station_id`, `coins`, `route`, `date`

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)

## Use of AI Tools
Briefly describe whether you used any AI tools (e.g., ChatGPT, GitHub Copilot, Claude) while working on this project, for which purposes (e.g., clarifying concepts, debugging, generating code), and how you verified or adapted their output.
If you did not use any AI tools, simply state so.
