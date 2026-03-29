import { db } from './index.js';
import { products, users, feedback, testing_opportunities, admin_actions } from './schema.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

const seed = async () => {
  console.log('Seeding initial data with consistent roles and extensive mock content...');

  try {
    // Generate hashes
    const hashSuper = await bcrypt.hash('SuperUser123!', 10);
    const hashAdmin = await bcrypt.hash('Admin123!', 10);
    const hashTester = await bcrypt.hash('Tester123!', 10);
    const hashDev = await bcrypt.hash('Developer123!', 10);
    const hashGeethu = await bcrypt.hash('@Geethu2024', 10);
    const hashCommon = await bcrypt.hash('python', 10);

    const testUsers = [
      {
        id: uuidv4(),
        name: 'Super User Administrator',
        username: 'superuser',
        email: 'superuser@productpulse.com',
        password: hashSuper,
        role: 'super_user',
        user_type: 'super_user',
        status: 'approved',
      },
      {
        id: uuidv4(),
        name: 'Primary Administrator',
        username: 'admin1',
        email: 'admin1@productpulse.com',
        password: hashAdmin,
        role: 'admin',
        user_type: 'admin',
        status: 'approved',
      },
      {
        id: uuidv4(),
        name: 'Secondary Administrator',
        username: 'admin2',
        email: 'admin2@productpulse.com',
        password: hashAdmin,
        role: 'admin',
        user_type: 'admin',
        status: 'approved',
      },
      {
        id: uuidv4(),
        name: 'Alice Johnson',
        username: 'tester1',
        email: 'tester1@productpulse.com',
        password: hashTester,
        role: 'user',
        user_type: 'tester',
        status: 'approved',
        experience: 'Expert',
        interests: 'Mobile apps, Web tools, Gaming',
        points: 150,
      },
      {
        id: uuidv4(),
        name: 'Bob Smith',
        username: 'tester2',
        email: 'tester2@productpulse.com',
        password: hashTester,
        role: 'user',
        user_type: 'tester',
        status: 'pending',
        experience: 'Intermediate',
        interests: 'Productivity tools, E-commerce',
        points: 0,
      },
      {
        id: uuidv4(),
        name: 'Carol Davis',
        username: 'tester3',
        email: 'tester3@productpulse.com',
        password: hashTester,
        role: 'user',
        user_type: 'tester',
        status: 'approved',
        experience: 'Beginner',
        interests: 'Social media, Entertainment',
        points: 75,
      },
      {
        id: uuidv4(),
        name: 'David Wilson',
        username: 'dev1',
        email: 'dev1@productpulse.com',
        password: hashDev,
        role: 'user',
        user_type: 'developer',
        status: 'approved',
        company: 'TechCorp Inc.',
        points: 0,
      },
      {
        id: uuidv4(),
        name: 'Emma Brown',
        username: 'dev2',
        email: 'dev2@productpulse.com',
        password: hashDev,
        role: 'user',
        user_type: 'developer',
        status: 'pending',
        company: 'StartupXYZ',
        points: 0,
      },
      {
        id: uuidv4(),
        name: 'Frank Miller',
        username: 'dev3',
        email: 'dev3@productpulse.com',
        password: hashDev,
        role: 'user',
        user_type: 'developer',
        status: 'approved',
        company: 'InnovateLabs',
        points: 0,
      },
      {
        id: uuidv4(),
        name: 'geethu',
        username: 'geethu',
        email: 'admin@productpulse.com',
        password: hashGeethu,
        role: 'super_user',
        user_type: 'admin',
        status: 'approved',
      }
    ];

    for (const user of testUsers) {
      const existing = await db.select().from(users).where(eq(users.email, user.email));
      
      if (existing.length === 0) {
        await db.insert(users).values(user);
        console.log(`Inserted user: ${user.name} (${user.email})`);
      } else {
        await db.update(users)
          .set({ 
            name: user.name, 
            username: user.username,
            password: user.password, 
            role: user.role,
            user_type: user.user_type,
            status: user.status,
            company: user.company || null,
            experience: user.experience || null,
            interests: user.interests || null,
            points: user.points || 0,
          })
          .where(eq(users.email, user.email));
        console.log(`Updated user: ${user.name} (${user.email})`);
      }
    }

    // Fetch seeded users to get their IDs
    const currentUsers = await db.select().from(users);
    const dev1 = currentUsers.find(u => u.username === 'dev1');
    const dev2 = currentUsers.find(u => u.username === 'dev2');
    const dev3 = currentUsers.find(u => u.username === 'dev3');
    const tester1 = currentUsers.find(u => u.username === 'tester1');
    const tester2 = currentUsers.find(u => u.username === 'tester2');
    const tester3 = currentUsers.find(u => u.username === 'tester3');
    const admin1 = currentUsers.find(u => u.username === 'admin1');
    const superUser = currentUsers.find(u => u.username === 'superuser');

    // Products
    const initialProducts = [
      {
        id: 'p1',
        name: 'EcoTrack Pro',
        description: 'A smart home energy monitoring system that helps you reduce your carbon footprint.',
        category: 'Smart Home',
        image_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
        user_id: dev1?.id || null,
        status: 'active',
        price: 199,
        rating: 4,
        reviews_count: 12,
      },
      {
        id: 'p2',
        name: 'MindfulNow AI',
        description: 'AI-powered meditation assistant that adapts to your stress levels in real-time.',
        category: 'Health & Wellness',
        image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
        user_id: dev1?.id || null,
        status: 'active',
        price: 49,
        rating: 5,
        reviews_count: 8,
      },
      {
        id: 'p3',
        name: 'SecureScan Lite',
        description: 'Lightweight vulnerability scanner for small-scale web applications.',
        category: 'Security',
        image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        user_id: dev2?.id || null,
        status: 'pending',
        price: 0,
        rating: 0,
        reviews_count: 0,
      },
      {
        id: 'p4',
        name: 'TaskFlow Planner',
        description: 'Collaborative project management tool for remote teams.',
        category: 'Productivity',
        image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
        user_id: dev3?.id || null,
        status: 'active',
        price: 15,
        rating: 4,
        reviews_count: 5,
      },
      {
        id: 'p5',
        name: 'Pulse Fitness',
        description: 'A comprehensive fitness tracking app with real-time biometric analysis.',
        category: 'Health',
        image_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
        user_id: dev3?.id || null,
        status: 'active',
        price: 25,
        rating: 4,
        reviews_count: 3,
      },
      {
        id: 'p6',
        name: 'CodeMentor Bot',
        description: 'AI-driven code review and pair programming assistant.',
        category: 'Developer Tools',
        image_url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
        user_id: dev3?.id || null,
        status: 'active',
        price: 29,
        rating: 4,
        reviews_count: 62,
      },
    ];

    for (const product of initialProducts) {
      const existing = await db.select().from(products).where(eq(products.id, product.id));
      if (existing.length === 0) {
        await db.insert(products).values(product);
        console.log(`Inserted product: ${product.name}`);
      } else {
        await db.update(products)
          .set({ 
            user_id: product.user_id,
            status: product.status,
            name: product.name,
            description: product.description,
            category: product.category,
            image_url: product.image_url,
            price: product.price,
          })
          .where(eq(products.id, product.id));
        console.log(`Updated product: ${product.name}`);
      }
    }

    // Feedback
    const initialFeedback = [
      {
        id: 'f1',
        product_id: 'p1',
        user_id: tester1?.id || null,
        rating: 4,
        comment: 'The energy tracking is very detailed. I love the dashboard visualization.',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'f2',
        product_id: 'p1',
        user_id: tester2?.id || null,
        rating: 5,
        comment: 'Simple to set up and very effective. Saved 15% on my bill this month!',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'f3',
        product_id: 'p2',
        user_id: tester1?.id || null,
        rating: 5,
        comment: 'Spookily accurate AI. The guided meditations are top-notch.',
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'f4',
        product_id: 'p4',
        user_id: tester1?.id || null,
        rating: 4,
        comment: 'Great for task management, but needs a dark mode.',
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      }
    ];

    for (const fb of initialFeedback) {
      const existing = await db.select().from(feedback).where(eq(feedback.id, fb.id));
      if (existing.length === 0) {
        await db.insert(feedback).values(fb);
        console.log(`Inserted feedback: ${fb.id}`);
      }
    }

    // Testing Opportunities (Assignments)
    const initialOps = [
      {
        id: 'op1',
        user_id: tester1?.id || null,
        product_id: 'p1',
        status: 'selected',
        applied_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'op2',
        user_id: tester1?.id || null,
        product_id: 'p2',
        status: 'testing',
        applied_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'op3',
        user_id: tester2?.id || null,
        product_id: 'p1',
        status: 'completed',
        applied_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        completed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'op4',
        user_id: tester1?.id || null,
        product_id: 'p4',
        status: 'applied',
        applied_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ];

    for (const op of initialOps) {
      const existing = await db.select().from(testing_opportunities).where(eq(testing_opportunities.id, op.id));
      if (existing.length === 0) {
        await db.insert(testing_opportunities).values(op);
        console.log(`Inserted opportunity: ${op.id}`);
      } else {
        await db.update(testing_opportunities).set(op).where(eq(testing_opportunities.id, op.id));
      }
    }

    // Admin Actions (Audit Log)
    const initialActions = [
      {
        id: 'a1',
        admin_id: superUser?.id || null,
        action: 'APPROVE_ADMIN',
        target_id: admin1?.id || null,
        target_type: 'USER',
        details: 'Approved primary administrator access.',
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'a2',
        admin_id: admin1?.id || null,
        action: 'APPROVE_TESTER',
        target_id: tester1?.id || null,
        target_type: 'USER',
        details: 'Verified expert tester credentials.',
        created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'a3',
        admin_id: admin1?.id || null,
        action: 'APPROVE_PRODUCT',
        target_id: 'p1',
        target_type: 'PRODUCT',
        details: 'Approved EcoTrack Pro for testing phase.',
        created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ];

    for (const action of initialActions) {
      const existing = await db.select().from(admin_actions).where(eq(admin_actions.id, action.id));
      if (existing.length === 0) {
        await db.insert(admin_actions).values(action);
        console.log(`Inserted action: ${action.id}`);
      }
    }

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

seed();
