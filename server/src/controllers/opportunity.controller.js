import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { testing_opportunities, products, users } from '../db/schema.js';
import { eq, and, desc } from 'drizzle-orm';

export class OpportunityController {
  static async apply(req, res) {
    const { product_id } = req.body;
    const user_id = req.user.id;

    try {
      // Check for existing application
      const existing = await db.select()
        .from(testing_opportunities)
        .where(
          and(
            eq(testing_opportunities.user_id, user_id),
            eq(testing_opportunities.product_id, product_id)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        return res.status(400).json({ error: 'Already applied for this opportunity' });
      }

      const id = uuidv4();
      await db.insert(testing_opportunities).values({
        id,
        user_id,
        product_id,
        status: 'applied',
        applied_at: new Date().toISOString()
      });

      res.status(201).json({ id, message: 'Application submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to apply' });
    }
  }

  static async getMyApplications(req, res) {
    const user_id = req.user.id;

    try {
      const results = await db.select({
        id: testing_opportunities.id,
        product_id: testing_opportunities.product_id,
        status: testing_opportunities.status,
        applied_at: testing_opportunities.applied_at,
        selected_at: testing_opportunities.selected_at,
        completed_at: testing_opportunities.completed_at,
        product: {
          id: products.id,
          name: products.name,
          description: products.description,
          company_name: products.category, // Using category as company_name for now or category
          image_url: products.image_url
        }
      })
      .from(testing_opportunities)
      .innerJoin(products, eq(testing_opportunities.product_id, products.id))
      .where(eq(testing_opportunities.user_id, user_id))
      .orderBy(desc(testing_opportunities.applied_at));

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  }

  static async getAllApplications(req, res) {
    // For admins/superusers
    try {
      const results = await db.select({
        id: testing_opportunities.id,
        tester_id: testing_opportunities.user_id,
        product_id: testing_opportunities.product_id,
        status: testing_opportunities.status,
        created_at: testing_opportunities.applied_at,
        selected_at: testing_opportunities.selected_at,
        completed_at: testing_opportunities.completed_at,
        tester_name: users.name,
        tester_email: users.email,
        product_name: products.name
      })
      .from(testing_opportunities)
      .innerJoin(users, eq(testing_opportunities.user_id, users.id))
      .innerJoin(products, eq(testing_opportunities.product_id, products.id))
      .orderBy(desc(testing_opportunities.applied_at));
      
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch all applications' });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const updates = { 
        status,
        updated_at: new Date()
      };

      if (status === 'selected') {
        updates.selected_at = new Date();
      } else if (status === 'completed') {
        updates.completed_at = new Date();
      }

      const result = await db.update(testing_opportunities)
        .set(updates)
        .where(eq(testing_opportunities.id, req.params.id))
        .returning();

      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update opportunity status' });
    }
  }

  static async assignTester(req, res) {
    try {
      const { user_id, product_id } = req.body;
      const id = uuidv4();
      
      const result = await db.insert(testing_opportunities).values({
        id,
        user_id,
        product_id,
        status: 'selected',
        selected_at: new Date()
      }).returning();

      res.status(201).json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to assign tester' });
    }
  }
}
