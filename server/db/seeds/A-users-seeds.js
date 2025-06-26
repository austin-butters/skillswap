/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      auth0_uid: 'Auth0|123456789',
      email: 'code_wizard42@example.com',
      name: 'CodeWizard42',
      bio: 'Full-stack developer specializing in React and Node.js. Love solving complex problems and sharing knowledge!',
    },
    {
      auth0_uid: 'Auth0|987654321',
      email: 'alex.pythonista@example.com',
      name: 'Pythonista',
      bio: 'Data scientist by day, Python enthusiast by night. Pandas, NumPy, and ML frameworks are my playground.',
    },
    {
      auth0_uid: 'Auth0|555667788',
      email: 'julia.swiftdev@example.com',
      name: 'SwiftDev',
      bio: 'iOS developer creating beautiful apps. SwiftUI advocate. Happy to help with mobile development questions!',
    },
    {
      auth0_uid: 'Auth0|112233445',
      email: 'db_guru@example.com',
      name: 'SQLMaster',
      bio: 'Database architect with 10+ years experience. SQL, NoSQL, optimization - ask me anything about data storage!',
    },
    {
      auth0_uid: 'Auth0|998877665',
      email: 'security_sam@example.com',
      name: 'SecSam',
      bio: "Cybersecurity specialist. Let's make the web safer together. Ask me about auth, encryption, and best practices.",
    },
    {
      auth0_uid: 'Auth0|443322110',
      email: 'newbie_coder@example.com',
      name: 'CodeNewbie',
      bio: 'Just starting my coding journey. Learning JavaScript and excited to be part of this community!',
    },
    {
      auth0_uid: 'Auth0|135792468',
      email: 'rustacean@example.com',
      name: 'FerrisFan',
      bio: 'Rust enthusiast helping others learn this amazing language. Systems programming FTW!',
    },
    {
      auth0_uid: 'Auth0|246813579',
      email: 'web_designer@example.com',
      name: 'CSSArtist',
      bio: 'Frontend developer with a passion for design. CSS, animations, and making the web beautiful.',
    },
  ])
}
