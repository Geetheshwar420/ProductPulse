import { db } from '../db/index.js';
import { products, feedback, users, admin_actions } from '../db/schema.js';
import { eq, desc, sql, and } from 'drizzle-orm';

export class ProductController {
  static async getAllProducts(req, res) {
    try {
      const filters = [];
      // Only admins see pending products
      if (req.user.role !== 'admin' && req.user.role !== 'super_user') {
        filters.push(eq(products.status, 'active'));
      }
      
      const results = await db.query.products.findMany({
        where: filters.length > 0 ? and(...filters) : undefined,
        orderBy: [desc(products.created_at)],
      });
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  static async getProductById(req, res) {
    try {
      const result = await db.query.products.findFirst({
        where: eq(products.id, req.params.id),
      });

      if (!result) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  static async getMyProducts(req, res) {
    try {
      const results = await db.query.products.findMany({
        where: eq(products.user_id, req.user.id),
        orderBy: [desc(products.created_at)],
      });
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch your products' });
    }
  }

  static async createProduct(req, res) {
    try {
      const { name, description, company_name, image_url, guidelines, category, estimated_testing_time } = req.body;
      const result = await db.insert(products).values({
        name,
        description,
        company_name,
        image_url,
        guidelines,
        category,
        estimated_testing_time,
        user_id: req.user.id,
        status: 'pending',
      }).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  static async updateProductStatus(req, res) {
    try {
      const { status } = req.body;
      const result = await db.update(products)
        .set({ status, updated_at: new Date() })
        .where(eq(products.id, req.params.id))
        .returning();
      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update product status' });
    }
  }

  static async getDashboardStats(req, res) {
    try {
      const allProducts = await db.select().from(products);
      const allUsers = await db.select().from(users);
      const allFeedback = await db.select().from(feedback);

      const stats = {
        totalProducts: allProducts.length,
        activeProducts: allProducts.filter(p => p.status === 'active').length,
        pendingProducts: allProducts.filter(p => p.status === 'pending').length,
        totalUsers: allUsers.length,
        pendingUsers: allUsers.filter(u => u.status === 'pending').length,
        approvedUsers: allUsers.filter(u => u.status === 'approved').length,
        totalFeedback: allFeedback.length,
        // Role specific counts
        admins: allUsers.filter(u => u.role === 'admin' || u.user_type === 'admin').length,
        testers: allUsers.filter(u => u.user_type === 'tester').length,
        developers: allUsers.filter(u => u.user_type === 'developer').length,
        recentAdminActions: (await db.select().from(admin_actions)).length, // Simplified for now, or use actual logic
      };

      res.json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
  }

  static async getProductFeedback(req, res) {
    const { id } = req.params;
    try {
      const results = await db.select({
        id: feedback.id,
        user_id: feedback.user_id,
        product_id: feedback.product_id,
        rating: feedback.rating,
        comment: feedback.comment,
        screenshots: feedback.screenshots,
        video_url: feedback.video_url,
        ai_insights: feedback.ai_insights,
        sentiment: feedback.sentiment,
        created_at: feedback.created_at,
        updated_at: feedback.updated_at,
        users: {
          full_name: users.name
        }
      })
      .from(feedback)
      .leftJoin(users, eq(feedback.user_id, users.id))
      .where(eq(feedback.product_id, id))
      .orderBy(desc(feedback.created_at));

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch feedback' });
    }
  }
}
