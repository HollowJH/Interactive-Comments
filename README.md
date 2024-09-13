# Interactive Comments Section
This is a React-based implementation of the Interactive Comments Section challenge from Frontend Mentor. The project demonstrates the use of TypeScript, Vite, and React build a dynamic comment section with features such as adding, editing, replying, and deleting comments.

## Features
- View Comments: Display a list of comments and replies.
- Add Comment: Submit new comments to the section.
- Reply to Comment: Add replies to existing comments.
- Edit Comment: Edit comments you’ve created.
- Delete Comment: Remove comments you’ve created.
- Upvote/Downvote: Adjust the score of comments by upvoting or downvoting.
- Redux Toolkit: Manage global state with Redux Toolkit.
## Installation
To run this project locally, follow these steps:

1. Clone the repository:
`git clone https://github.com/yourusername/interactive-comments-section.git`

2. Navigate to the project directory:
`cd interactive-comments-section`

3. Install dependencies:
`npm install`

4. Start the development server:
`npm run dev`

The app will open in your browser at `http://localhost:5173`.

## Usage
### Main Page
- View the list of comments and their replies.
- Click on any comment to view or add replies.
### Add Comment
- Use the input form to submit a new comment.
### Edit Comment
- Click the edit button on your comments to modify them.
### Delete Comment
- Click the delete button on your comments to remove them.
### Upvote/Downvote
- Adjust the score of comments by clicking the upvote or downvote buttons.
### Redux Toolkit
- State Management: Redux Toolkit is used to manage the global state of comments and user interactions.
- Slice: A slice is created for managing comment-related state and actions.
- Store: The Redux store is configured to use the comment slice.
