# User stories — V1

## Glossary

- **User**: a person with an account.
- **Group**: a lasting circle of friends who play together (e.g. "Thursday crew").
- **Owner**: the user who created the group. Each group has exactly one owner.
- **Member**: a user who belongs to a group. The owner is also a member.
- **Game**: a board game registered in a group (e.g. "Catan"). Each group has its own games.
- **Match**: one game played on a given date by some members of a group.
- **Participant**: a member who took part in a match.
- **Winner**: a participant who won the match. A match can have several winners (tie).

## Common rules (apply to every story)

- Every action requires being logged in, except registering and logging in.
- A user can only access the groups they are a member of; any access to another group is refused.
- Stats are always computed from recorded matches, never stored.

## Authentication

### 1. Register

As a visitor, I want to create an account, so that I can be added to groups and track my results.

- I provide a username and a password; my account is created.
- The username is 3 to 20 characters long (letters, digits, `_`), otherwise it is refused.
- The username is unique: if it is already taken, it is refused.
- The password is at least 8 characters long, otherwise it is refused.
- The password is never returned in any response.

### 2. Log in

As a visitor, I want to log in, so that I can access my groups and results.

- With a valid username and password, I am logged in.
- With a wrong username or a wrong password, it is refused with the same message in both cases.

### 3. View my profile

As a user, I want to see my profile, so that I can check which account I am using.

- I see my username and my account creation date.
- I never see my password.

## Groups

### 4. Create a group

As a user, I want to create a group, so that I can track matches with my friends.

- I provide a group name (1 to 50 characters); the group is created.
- I become its owner and its first member.

### 5. List my groups

As a user, I want to list my groups, so that I can choose which one to look at.

- I only see the groups I am a member of.

### 6. View a group

As a member, I want to view a group, so that I can see who is in it.

- I see the group name, its owner and its members.

### 7. Delete a group

As an owner, I want to delete my group, so that I can remove a group that is no longer used.

- Only the owner can delete the group; any other member is refused.
- Deleting the group also deletes all its games and matches.

## Members

### 8. Add a member

As an owner, I want to add a user to my group by their username, so that they can take part in matches.

- Only the owner can add members; any other member is refused.
- If the username does not exist, it is refused.
- If the user is already a member, it is refused.

### 9. Remove a member

As an owner, I want to remove a member from my group, so that I can keep the member list up to date.

- Only the owner can remove members; any other member is refused.
- The owner cannot remove themselves.
- A member who took part in at least one match cannot be removed.

## Games

### 10. Add a game

As a member, I want to add a game to my group, so that we can record matches of that game.

- I provide a name (1 to 50 characters); the game is created in the group.
- The name is unique within the group, case-insensitive ("Catan" and "catan" are the same game), otherwise it is refused.

### 11. List games

As a member, I want to list the games of my group, so that I can pick one when recording a match.

- I see all the games of the group, sorted alphabetically.

### 12. Delete a game

As an owner, I want to delete a game, so that I can clean up the game list.

- Only the owner can delete a game; any other member is refused.
- A game that has at least one match cannot be deleted.

## Matches

### 13. Record a match

As a member, I want to record a match, so that we keep track of who won.

- I provide a game of the group, a date, the participants and the winners; a score per participant is optional.
- The date cannot be in the future.
- There are at least 2 participants, all members of the group, with no duplicates.
- There is at least 1 winner, and every winner is a participant.
- I become the author of the match.

### 14. Edit a match

As the author of a match or the group owner, I want to edit a match, so that I can fix a mistake.

- Only the author of the match or the group owner can edit it; anyone else is refused.
- The same rules as for recording a match apply.

### 15. Delete a match

As the author of a match or the group owner, I want to delete a match, so that I can remove a wrong entry.

- Only the author of the match or the group owner can delete it; anyone else is refused.

### 16. View match history

As a member, I want to see the match history of my group, so that I can remember who won what and when.

- I see the matches of the group, most recent first.
- I can filter by game.
- Results are paginated (20 matches per page by default).

## Stats

### 17. View the leaderboard

As a member, I want to see the group leaderboard, so that I know who wins the most.

- For each member: number of wins, number of matches played and win rate (%).
- I can sort by number of wins or by win rate, in descending order.
- On a tie, members are sorted alphabetically by username.
- I can filter by game.
- Members who never played appear with 0 matches and a 0% win rate.
