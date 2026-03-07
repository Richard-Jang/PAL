# Project Name

A forum-like hub where students can learn, communicate, teach, and collaborate with their peers.

## Functionality

- Create profile
  - Past classes (fetched from Nebula Labs API) and the semester taken
  - Expected graduation year
  - Profile picture
  - Major and minor(s)
  - Connection with other users
- Video Chat
  - built-in whiteboard
  - export whiteboard to PDF or some other format
  - screen share
  - meeting notes taken by AI agent
  - private or public with invite
  - call has title, description, and public/private
  - teach an AI that learns from user voice
  - workflow: create new room -> input title, description, public/private (boolean), invites -> create room -> 
- Forum
  - Latex rendering support
  - Title, tags, description (optional), participants
  - Like, dislike, comment, view count
  - AI generated summary of forum post
  - mark as completed or in progress
  - last updated timestamp
  - reference a form post
  - workflow: create a post (title, description, class, tags) -> ALL users can post (text and images) (more than 10 posts in a thread will be collapsed with link to fetch rest (top 5, ... x more, bottom 5)) (users can only edit messages that they post) -> thread owner mark completed
- AI Student Chat
  - teach an AI
  - AI will ask users questions
  - save chat into MongoDB
  - workflow: student opens chat -> inputs general topic user is teaching -> AI asks broad questions that get more granular... -> AI asks if that is all -> export and end chat if complete, continue questioning otherwise

## Tech Stack

- React Vite (frontend)
  - React Icons
  - framer-motion
- Vercel (hosting hobby tier)
- MongoDB (database)
- Supabase (auth)
- VideoSDK (react video caller)

## Development

- API keys will be stored in a .env file:
  - GEMINI_API_KEY: API key for Google Gemini
- Create the following items:
  - hooks/ (directory to store hooks)
    - API call hooks where it memoizes or stores in a useCallback the relevant data so no repeated calls. Should return a function that has customizable components, error handling, and returns a promise of a specific type. Also make a template for this hook structure
    - hook for creating a Video Call and generating a subsequent summary using the sound of a video and potentially whiteboard if exists
    - hook for generating summary using the information stored in a forum object
    - hook for storing, getting, and updating objects in MongoDB
  - components/ (directory of all the UI components used separated into categories (cards, buttons, etc.))
    - whiteboard component (users can draw, save, and share)