# SkillSwap

_A beginner friendly website where users can connect, ask questions, message, join collaborative meetings, and evene get AI assistance!._

In the fifteenth week of DevAcademy we'd learnt to use technologies across the full stack, and we were given a full week to make our final project. I worked in a group of four to create 'SkillSwap', a beginner-friedly code forum with questions, answers, profiles, messaging and video calls. We aimed to create the best user experience for our target users, prioritising simplicity and intuitive use over completeness. We weren't creating a thorough library of coding knowledge, we were creating a place to introduce new people to code.

Please note: this is a publicly visible copy of a project I completed with three other students in a private repository, not a personal project.

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

