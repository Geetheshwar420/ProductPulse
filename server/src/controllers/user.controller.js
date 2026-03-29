import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq, desc, and, inArray } from 'drizzle-orm';

export class UserController {
  static async getAllUsers(req, res) {
    try {
      const { status, user_type, role } = req.query;
      
      const filters = [];
      if (status && status !== 'all') {
        filters.push(eq(users.status, status));
      }
      if (user_type && user_type !== 'all') {
        filters.push(eq(users.user_type, user_type));
      }
      if (role && role !== 'all') {
        filters.push(eq(users.role, role));
      }

      // Restrict regular admins: they can only see testers and developers
      if (req.user.role !== 'super_user') {
        filters.push(inArray(users.user_type, ['tester', 'developer']));
      }

      const results = await db.query.users.findMany({
        where: filters.length > 0 ? and(...filters) : undefined,
        orderBy: [desc(users.created_at)],
      });

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  static async updateUserStatus(req, res) {
    try {
      const { status } = req.body;
      const targetUserId = req.params.id;
      const requestingUserRole = req.user.role;

      // Fetch the target user to check their role
      const targetUser = await db.query.users.findFirst({
        where: eq(users.id, targetUserId),
      });

      if (!targetUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Logic: 
      // 1. Only super_user can approve/update an admin.
      // 2. admins can approve/update regular users.
      if (targetUser.role === 'admin' && requestingUserRole !== 'super_user') {
        return res.status(403).json({ error: 'Only super users can manage administrators' });
      }

      const updates = { 
        status, 
        updated_at: new Date() 
      };

      if (status === 'approved') {
        updates.approved_at = new Date();
        updates.approved_by = req.user.id;
      }

      const result = await db.update(users)
        .set(updates)
        .where(eq(users.id, targetUserId))
        .returning();

      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update user status' });
    }
  }

  static async awardPoints(req, res) {
    try {
      const { user_id, points, reason } = req.body;
      
      const user = await db.query.users.findFirst({
        where: eq(users.id, user_id),
      });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const result = await db.update(users)
        .set({ 
          points: (user.points || 0) + points,
          updated_at: new Date() 
        })
        .where(eq(users.id, user_id))
        .returning();
        
      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to award points' });
    }
  }
}
