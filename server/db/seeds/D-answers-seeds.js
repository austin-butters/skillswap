/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('answers').del()
  await knex('answers').insert([
    {
      user_id: 2, // Pythonista answering CodeWizard42's React question
      question_id: 1,
      body: "React's re-renders can happen for many reasons, even with unchanged state. Check if: 1) The parent component re-rendered, 2) You're using React.StrictMode (double-renders in dev), or 3) Context updates are triggering it. Use `React.memo` or `useMemo` to optimize.",
    },
    {
      user_id: 4, // SQLMaster answering Pythonista's Pandas question
      question_id: 2,
      body: '`merge` is more flexible (supports left/right/inner/outer joins), while `join` is syntactic sugar for index-based merges. For large DataFrames, `merge` with explicit `on=` clauses is faster. Always profile with `%timeit`!',
    },
    {
      user_id: 1, // CodeWizard42 answering SwiftDev's SwiftUI question
      question_id: 3,
      body: "Try reducing the complexity of your View hierarchy first. If that doesn't help, use `Canvas` + Metal for animations. Also, ensure you're not updating state during the animation loop—that's a common cause of stuttering.",
    },
    {
      user_id: 5, // SecSam answering SQLMaster's PostgreSQL question
      question_id: 4,
      body: 'BRIN indexes excel for large, ordered datasets (e.g., timestamps). For high-write tables with random inserts/deletes, stick with B-tree. Consider partitioning if your deletes are batch operations.',
    },
    {
      user_id: 3, // SwiftDev answering SecSam's JWT question
      question_id: 5,
      body: "LocalStorage is vulnerable to XSS, but HttpOnly cookies aren't accessible via JS. Trade-offs: If you need CSRF protection (cookies) vs. easier mobile integration (tokens). For most apps, cookies + short expiry + CSRF tokens are safer.",
    },
    {
      user_id: 7, // FerrisFan answering CodeNewbie's JavaScript question
      question_id: 6,
      body: "Arrow functions inherit `this` from their lexical scope (where they're defined). Regular functions bind `this` at call time. Use `function() {}` for methods and `() => {}` for callbacks where you want to preserve `this`.",
    },
    {
      user_id: 8, // CSSArtist answering FerrisFan's Rust question
      question_id: 7,
      body: "Rust's ownership model forces you to think differently. For struct references, consider: 1) Using `Rc<RefCell<T>>` for shared mutability, or 2) Restructuring your data to avoid circular references. The Rust book's chapter on lifetimes is gold!",
    },
    {
      user_id: 6, // CodeNewbie answering CSSArtist's CSS question
      question_id: 8,
      body: 'Grid is better for rigid layouts (like dashboards), while Flexbox is for fluid content. Combine both! Use Grid for the parent container and Flexbox for widget internals. Check out `grid-template-areas` for draggable layouts.',
    },
    {
      user_id: 4, // SQLMaster answering CodeWizard42's Node.js question
      question_id: 9,
      body: 'Global handlers (`unhandledRejection`) are a last resort. Instead, wrap async routes in Express middleware that catches errors and forwards them to your error logger. For critical apps, use `Promise.allSettled` to handle failures gracefully.',
    },
  ])
}
