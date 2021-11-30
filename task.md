# Message board prototype with React and NodeJS

As a full-stack developer you are assigned a task to build a prototype message board for
in-house use.

The message board consists of multiple named channels. Channels contain messages written
by users. Users can select a channel from a list of channels, view messages in the selected
channel, and submit new messages to the selected channel. Board is implemented as a single
page web application in React and a simple backend in NodeJS.

**Returning assignment**

Once you are satisfied with the implementation, commit the changes to the supplied GitHub
repository. This task should take a few hours, but you may return your submission any time in
the given time limit (see email). Please return it immediately when you are ready.

**General instructions**

** Follow the specifications below carefully**
- Use TypeScript
- For frontend, to save time, consider using create react app or similar.
- For the backend use express or similar, avoid “scaffolding” (code generation etc).

**Thing that are relevant**

- Provide working code
    - It's better to have less features implemented but what is implemented should be
       working as per specifications
- Add a README
    **- Please write clearly what is missing from implementation wrt. spec**
- Clean submission
    - Less is better, aim for less codebut with solid professionalpatterns
    - Avoid too many dependencies
    - Remove unrelated/dead code
    - Don't include node_modules in submission

**Things that are not relevant**

- This does not need to be production grade
- Logging
- Tests
- UI polish


# Prototype specifications

No authentication required. No user identity management required.

## React Client


- Client visuals
  - Render a full page application with three panels
  - Navigation panel shows a list of channels
  - Message list panel shows a list of message bodies for one channel
  - Editor panel shows a text area input
    - Editor panel is hidden if there is no channel selected
    - Editor has a submit button
    - Submit button is disabled if there is no text in message body

- Interactions
  - Clicking a channel in navigation panel selects that channel
  - Entering text in editor and clicking submit adds message to the currently selected
  channel
  - Submitting editor clears input
  - Switching channels clears input

- State
  - Channel list
    - Channel list is loaded once on loading the application
  - Channel selection
    - Initially no channel is selected
  - Selected channel and messages
    - There is no upfront loading of messages
    - Messages already in local state are showed immediately
    - Messages are loaded from remote on channel selection and updated to screen
    - Messages are also stored to local state after loading the from remote
- Messages
  - Editing is not required, only creation
  - Upon submitting a message to a channel that message is available for other users
  - Submitting user sees message in message list after submitting
    - Render created message in the list immediately before refreshing frombackend
- No error handling required


## NodeJS backend

- Channel and message storage can be an in-memory database(global variable etc).
- On server start, storage is populated with a fixed set of empty channels
- GET endpoint for querying channels
  - GET `http://<backend>/channels`
- GET endpoint for querying channel’s messages
  - GET `http://<backend>/messages/<channel>`
- POST endpoint for submitting new messages to a channel
  - POST `http://<backend>/<channel>`
  - Body
    - Message text
