# 🤝 Contributing to ProductPulse

Thank you for your interest in contributing to ProductPulse! We welcome contributions from developers of all skill levels.

## 🌟 Ways to Contribute

- 🐛 **Bug Reports** - Help us identify and fix issues
- 💡 **Feature Requests** - Suggest new functionality
- 📝 **Documentation** - Improve our docs and guides
- 🔧 **Code Contributions** - Submit bug fixes and features
- 🎨 **Design** - Enhance UI/UX and visual elements
- 🧪 **Testing** - Help test new features and improvements

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Git
- Supabase account
- Basic knowledge of React and TypeScript

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/ProductPulse.git
   cd ProductPulse
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Check linting
npm run lint

# Fix auto-fixable issues
npm run lint --fix

# Type checking
npm run type-check
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user approval system
fix: resolve authentication bug
docs: update API documentation
style: improve button styling
refactor: optimize database queries
test: add user management tests
```

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run test
   npm run type-check
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Use our PR template
   - Provide clear description
   - Link related issues
   - Add screenshots for UI changes

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for utilities and components
- Add integration tests for user flows
- Include edge cases and error scenarios
- Use descriptive test names

Example:
```typescript
describe('UserApproval', () => {
  it('should approve user when admin clicks approve button', () => {
    // Test implementation
  })
})
```

## 📝 Documentation

### Code Documentation

- Use JSDoc for functions and components
- Add inline comments for complex logic
- Update README for new features
- Include examples in documentation

### API Documentation

- Document all endpoints
- Include request/response examples
- Specify authentication requirements
- Add error response codes

## 🐛 Bug Reports

When reporting bugs, please include:

- **Environment** (OS, browser, Node.js version)
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** or error messages
- **Additional context** that might help

Use our bug report template:

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Node.js: [e.g. 18.17.0]
```

## 💡 Feature Requests

For feature requests, please provide:

- **Problem statement** - What problem does this solve?
- **Proposed solution** - How should it work?
- **Alternatives considered** - Other approaches you've thought of
- **Additional context** - Screenshots, mockups, etc.

## 🎨 Design Contributions

- Follow our design system and color palette
- Ensure accessibility (WCAG 2.1 AA compliance)
- Test on multiple screen sizes
- Provide Figma files or design specs when possible

## 📞 Getting Help

- 💬 **Discord** - Join our community for real-time help
- 📧 **Email** - Reach out to contributors@productpulse.com
- 📖 **Documentation** - Check our comprehensive docs
- 🐛 **Issues** - Search existing issues for solutions

## 🏆 Recognition

Contributors will be:

- Added to our contributors list
- Mentioned in release notes
- Invited to our contributor Discord channel
- Eligible for contributor swag (coming soon!)

## 📄 License

By contributing to ProductPulse, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making ProductPulse better! 🚀**
