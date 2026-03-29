import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq, or } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET is not set. Using a default for development only.');
}
const getSecret = () => JWT_SECRET || 'dev-only-fallback-change-me';

export class AuthController {
  static async register(req, res) {
    const { email, password, full_name, user_type, username, company, experience, interests } = req.body;
    
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const password_hash = await bcrypt.hash(password, 10);
      const id = uuidv4();

      let assignedRole = 'user';
      if (user_type === 'admin') {
        assignedRole = 'admin';
      } else if (user_type === 'super_user') {
        assignedRole = 'super_user';
      }

      await db.insert(users).values({
        id,
        email,
        password: password_hash,
        name: full_name || '',
        username: username || email.split('@')[0],
        role: assignedRole,
        user_type: user_type || 'tester',
        company: company || null,
        experience: experience || null,
        interests: interests || null,
        status: 'pending', // default for all new registrations based on schema
      });

      const token = jwt.sign({ 
        id, 
        email,
        role: assignedRole,
        user_type: user_type || 'tester'
      }, getSecret(), { expiresIn: '24h' });
      
      res.status(201).json({
        user: { 
          id, 
          email, 
          full_name, 
          user_type,
          role: user_type === 'admin' ? 'admin' : (user_type === 'super_user' ? 'super_user' : 'user') 
        },
        token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await db.query.users.findFirst({
        where: or(eq(users.email, email), eq(users.name, email)),
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ 
        id: user.id, 
        email: user.email,
        role: user.role,
        user_type: user.user_type
      }, getSecret(), { expiresIn: '24h' });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          full_name: user.name,
          user_type: user.user_type,
          role: user.role,
        },
        token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, req.params.id),
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updatePassword(req, res) {
    const { password } = req.body;
    const user_id = req.user.id;
    
    try {
      const password_hash = await bcrypt.hash(password, 10);
      await db.update(users)
        .set({ password: password_hash, updated_at: new Date() })
        .where(eq(users.id, user_id));
        
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update password' });
    }
  }
}
