/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('direct_messages').del()
  await knex('direct_messages').insert([
    {
      sender_id: 9, // CodeWizard42
      receiver_id: 2, // Pythonista
      time: '2024-03-15T09:30:00Z',
      body: 'Hey! Loved your answer on my React question. Do you have a GitHub repo for that performance optimization demo you mentioned?',
    },
    {
      sender_id: 2, // Pythonista
      receiver_id: 9, // CodeWizard42
      time: '2024-03-15T10:15:00Z',
      body: "Thanks! Here's the repo: [link]. Btw, are you going to the React Conf next month? I'm giving a talk on Python/JS interop.",
    },
    {
      sender_id: 3, // SwiftDev
      receiver_id: 8, // CSSArtist
      time: '2024-03-10T14:22:00Z',
      body: 'Your CSS Grid tutorial saved my dashboard project! How do you handle dark mode toggles with CSS variables?',
    },
    {
      sender_id: 8, // CSSArtist
      receiver_id: 3, // SwiftDev
      time: '2024-03-10T15:01:00Z',
      body: 'Glad it helped! For dark mode, I use `prefers-color-scheme` with fallbacks. Check this CodePen: [link]. Need help adapting it to SwiftUI?',
    },
    {
      sender_id: 5, // SecSam
      receiver_id: 4, // SQLMaster
      time: '2024-03-05T11:45:00Z',
      body: 'Quick security Q: Should we encrypt database indexes if they contain PII? Or just the columns?',
    },
    {
      sender_id: 4, // SQLMaster
      receiver_id: 5, // SecSam
      time: '2024-03-05T12:30:00Z',
      body: 'Encrypt the columns. Indexes need to be searchable, so encryption breaks their purpose. Use deterministic encryption if you must index PII (but avoid it!).',
    },
    {
      sender_id: 6, // CodeNewbie
      receiver_id: 7, // FerrisFan
      time: '2024-03-01T18:05:00Z',
      body: "Your Rust answer clarified so much! Any beginner projects you'd recommend to practice ownership?",
    },
    {
      sender_id: 7, // FerrisFan
      receiver_id: 6, // CodeNewbie
      time: '2024-03-01T19:20:00Z',
      body: "Start with a CLI todo app—no lifetimes needed! Then try a simple HTTP server using `hyper`. Avoid linked lists; they're deceptively hard in Rust 😅.",
    },
    {
      sender_id: 1, // CodeWizard42
      receiver_id: 5, // SecSam
      time: '2024-02-28T08:12:00Z',
      body: "Can you review our auth flow? We're using JWT in cookies but getting CSRF warnings. Draft: [link].",
    },
    {
      sender_id: 5, // SecSam
      receiver_id: 1, // CodeWizard42
      time: '2024-02-28T09:33:00Z',
      body: "Swap to SameSite=Lax cookies and add a `__Host-` prefix. Also, rate-limit token refreshes. I'll send a PR with fixes!",
    },
  ])
}
