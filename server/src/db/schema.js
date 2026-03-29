import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').default('user'),
  user_type: text('user_type').default('tester'),
  status: text('status').default('pending'),
  avatar: text('avatar'),
  company: text('company'),
  experience: text('experience'),
  interests: text('interests'),
  points: integer('points').default(0),
  approved_by: text('approved_by'),
  approved_at: text('approved_at'),
  updated_at: text('updated_at'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  image_url: text('image_url').notNull(),
  user_id: text('user_id').references(() => users.id),
  status: text('status').default('pending'), // pending, active, completed
  price: integer('price').notNull(),
  rating: integer('rating').default(0),
  reviews_count: integer('reviews_count').default(0),
  website_url: text('website_url'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const feedback = sqliteTable('feedback', {
  id: text('id').primaryKey(),
  product_id: text('product_id').references(() => products.id),
  user_id: text('user_id').references(() => users.id),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  screenshots: text('screenshots'), // Comma-separated or JSON string
  ai_insights: text('ai_insights'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const testing_opportunities = sqliteTable('testing_opportunities', {
  id: text('id').primaryKey(),
  user_id: text('user_id').references(() => users.id),
  product_id: text('product_id').references(() => products.id),
  status: text('status').default('applied'), // applied, selected, testing, completed
  applied_at: text('applied_at').default('CURRENT_TIMESTAMP'),
  selected_at: text('selected_at'),
  completed_at: text('completed_at'),
});

export const admin_actions = sqliteTable('admin_actions', {
  id: text('id').primaryKey(),
  admin_id: text('admin_id').references(() => users.id),
  action: text('action').notNull(),
  target_id: text('target_id'),
  target_type: text('target_type'),
  details: text('details'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});
