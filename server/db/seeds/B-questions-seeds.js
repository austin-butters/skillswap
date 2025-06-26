/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('questions').del()
  await knex('questions').insert([
    {
      user_id: 1, // CodeWizard42
      title: "Why does React re-render even when state hasn't changed?",
      body: 'I noticed my React component re-renders twice even when the state remains identical. Is this expected behavior, or am I missing a memoization technique?',
    },
    {
      user_id: 2, // Pythonista
      title: 'Pandas DataFrame merge vs. join - when to use which?',
      body: "Both `merge` and `join` seem to combine DataFrames, but the docs aren't clear on performance implications. Any best practices?",
    },
    {
      user_id: 3, // SwiftDev
      title: 'SwiftUI: How to animate a View transition without lag?',
      body: 'My custom transition stutters on older iPhones. Should I use `withAnimation` or Metal optimizations for smoother results?',
    },
    {
      user_id: 4, // SQLMaster
      title: 'PostgreSQL: Optimal index for a high-write table?',
      body: 'I have a table with 10M+ rows and heavy INSERT/DELETE traffic. Would a BRIN index be better than B-tree here?',
    },
    {
      user_id: 5, // SecSam
      title: 'Are JWT tokens secure if stored in localStorage?',
      body: "I've heard mixed opinions—some say localStorage is vulnerable to XSS, others argue it's fine with short expiration. What's the modern consensus?",
    },
    {
      user_id: 6, // CodeNewbie
      title: "JavaScript 'this' keyword confusion in arrow functions",
      body: 'Why does `this` point to `window` in my arrow function, but works as expected in a regular function? Example code included.',
    },
    {
      user_id: 7, // FerrisFan
      title: 'Rust borrowing rules breaking my OOP mindset',
      body: "Coming from Java, I'm struggling with ownership. How do I design a struct that references another struct without lifetime nightmares?",
    },
    {
      user_id: 8, // CSSArtist
      title: 'CSS Grid vs. Flexbox for complex dashboards',
      body: "I'm building a dashboard with draggable/resizable widgets. Is Grid's explicit placement better than Flexbox's fluidity here?",
    },
    {
      user_id: 1, // CodeWizard42 (same user, second question)
      title: 'Node.js: Best way to handle uncaught promise rejections?',
      body: "My production app crashes due to unhandled rejections. Should I use `process.on('unhandledRejection')` or wrap all async calls in try/catch?",
    },
  ])
}
