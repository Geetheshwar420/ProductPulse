import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { feedback, users, products } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export class FeedbackController {
  static async submitFeedback(req, res) {
    const { product_id, rating, comment, video_url, ai_insights } = req.body;
    const user_id = req.user.id;
    
    // Map uploaded files to URLs
    const screenshots = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    try {
      const id = uuidv4();
      await db.insert(feedback).values({
        id,
        user_id,
        product_id,
        rating: parseInt(rating),
        comment,
        screenshots: JSON.stringify(screenshots),
        ai_insights: ai_insights || null,
      });

      res.status(201).json({ id, message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit feedback' });
    }
  }

  static async getProductFeedback(req, res) {
    try {
      const results = await db.select({
        id: feedback.id,
        user_id: feedback.user_id,
        product_id: feedback.product_id,
        rating: feedback.rating,
        comment: feedback.comment,
        screenshots: feedback.screenshots,
        ai_insights: feedback.ai_insights,
        created_at: feedback.created_at,
        user_name: users.name,
        user_avatar: users.avatar
      })
      .from(feedback)
      .innerJoin(users, eq(feedback.user_id, users.id))
      .where(eq(feedback.product_id, req.params.productId))
      .orderBy(desc(feedback.created_at));

      const formattedResults = results.map(f => ({
        ...f,
        screenshots: JSON.parse(f.screenshots || '[]')
      }));
      
      res.json(formattedResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch feedback' });
    }
  }

  static async getRecentFeedback(req, res) {
    try {
      const { limit = 5 } = req.query;
      const results = await db.select({
        id: feedback.id,
        user_name: users.name,
        rating: feedback.rating,
        comment: feedback.comment,
        created_at: feedback.created_at,
      })
      .from(feedback)
      .innerJoin(users, eq(feedback.user_id, users.id))
      .orderBy(desc(feedback.created_at))
      .limit(parseInt(limit));

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch recent feedback' });
    }
  }

  static async getDeveloperFeedback(req, res) {
    const user_id = req.user.id;
    try {
      const results = await db.select({
        id: feedback.id,
        user_id: feedback.user_id,
        product_id: feedback.product_id,
        product_name: products.name,
        rating: feedback.rating,
        comment: feedback.comment,
        screenshots: feedback.screenshots,
        ai_insights: feedback.ai_insights,
        created_at: feedback.created_at,
        user_name: users.name
      })
      .from(feedback)
      .innerJoin(products, eq(feedback.product_id, products.id))
      .innerJoin(users, eq(feedback.user_id, users.id))
      .where(eq(products.user_id, user_id))
      .orderBy(desc(feedback.created_at));

      const formattedResults = results.map(f => ({
        ...f,
        screenshots: JSON.parse(f.screenshots || '[]')
      }));
      
      res.json(formattedResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch developer feedback' });
    }
  }
}
