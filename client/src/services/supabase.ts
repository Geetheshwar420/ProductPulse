// This file is deprecated as the project has moved to a local SQLite/Drizzle backend.
// It is kept for reference but is no longer used for data fetching.

export const supabase = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: new Error('Supabase is disabled') }),
        order: () => Promise.resolve({ data: [], error: new Error('Supabase is disabled') }),
      }),
      order: () => Promise.resolve({ data: [], error: new Error('Supabase is disabled') }),
    }),
  }),
};
