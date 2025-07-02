# SkillShare

_A beginner friendly website where users can connect, ask questions, message, join collaborative meetings, and evene get AI assistance!._

___

## Features

 - Ask coding questions to a friendly AI as well as being able to share it blocks of code
- Chat with other users
- Browse community questions and answers
- Contribute to questions with your own answers
- Join meetings with other users
- Search for other users
- Secured authentication with Auth0

---

## Tech Stack

**Frontend:**
- React
- TypeScript

**Backend:**
- Node.js
- Express
- SQLite
- Auth0
- Google Gemini AI

---

## Installation

```bash
# Clone the repository
git clone git@github.com:ngahuru-2025/skillswap.git
cd skillswap
npm install
npm run knex migrate:latest
npm run knex seed:run
npm run dev
```

---

## Environment Variables

There is a .env.example file which you'll need to copy into your own .env file and replace with proper API keys

---

### Further Documentation

See our GitHub Wiki for more documentation: 

- [Client Side Views](https://github.com/ngahuru-2025/skillswap/wiki/Documentation#views-client-side)
- [API Routes](https://github.com/ngahuru-2025/skillswap/wiki/Documentation#api-routes)

