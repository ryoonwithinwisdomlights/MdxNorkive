# Norkive Documentation

Welcome to the Norkive documentation! This directory contains comprehensive guides for developers and contributors.

## 📚 Documentation Index

### Getting Started

- **[Development Guide](./DEVELOPMENT.md)** - Complete guide for setting up and developing locally
  - Prerequisites and installation
  - Project structure
  - Daily development workflow
  - Adding content and components
  - Troubleshooting

### Technical Deep Dives

- **[Architecture](./ARCHITECTURE.md)** - System design and technical decisions
  - Data flow and transformation pipeline
  - Core components (Fumadocs + Content Collections)
  - Caching strategy (3-tier architecture)
  - Bundle optimization
  - Design decisions with trade-offs

- **[Migration Story](./MIGRATION.md)** - Evolution from react-notion-x to MDX
  - Phase 1: react-notion-x (deprecated)
  - Phase 2: Notion API SSR/ISR experiments
  - Phase 3: Hybrid approach attempt
  - Phase 4: MDX static generation (final)
  - Lessons learned and insights

- **[Performance](./PERFORMANCE.md)** - Optimization strategies and benchmarks
  - Core Web Vitals (96/100 Lighthouse)
  - Bundle optimization (61% reduction)
  - Image optimization (70% size reduction)
  - Build performance (75% faster)
  - Monitoring and metrics

### Contributing

- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to this project
  - Code of conduct
  - Bug reporting and feature requests
  - Pull request process
  - Coding standards
  - Commit guidelines

---

## Quick Navigation

### For New Developers

1. Start with [Development Guide](./DEVELOPMENT.md)
2. Read [Architecture](./ARCHITECTURE.md) to understand the system
3. Check [Contributing Guide](./CONTRIBUTING.md) before making changes

### For Performance Enthusiasts

- [Performance Guide](./PERFORMANCE.md) - Detailed optimization techniques
- [Architecture](./ARCHITECTURE.md) - Bundle optimization and caching

### For Those Curious About History

- [Migration Story](./MIGRATION.md) - Technical evolution and lessons learned

---

## Additional Resources

### External Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Content Collections](https://www.content-collections.dev/)
- [Fumadocs](https://fumadocs.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Project Links

- [GitHub Repository](https://github.com/ryoonwithinwisdomlights/norkive)
- [Live Demo](https://mdx-norkive.vercel.app/)
- [Issue Tracker](https://github.com/ryoonwithinwisdomlights/norkive/issues)

---

## Documentation Conventions

### Code Examples

All code examples use TypeScript and follow these conventions:

```typescript
// ✅ Good example - what to do
const goodExample = "This shows best practice";

// ❌ Bad example - what to avoid
const badExample = "This shows what not to do";
```

### File Paths

```bash
# Absolute paths from project root
/Users/.../norkive/app/page.tsx

# Relative paths (preferred in documentation)
app/page.tsx
modules/common/Button.tsx
```

### Command Line

```bash
# Comments explain what command does
npm run dev  # Starts development server
```

---

## Contributing to Documentation

Documentation improvements are always welcome! If you find:
- Typos or grammatical errors
- Outdated information
- Missing explanations
- Confusing sections

Please open an issue or submit a pull request.

### Documentation Style Guide

1. **Be Clear**: Use simple, direct language
2. **Be Complete**: Include all necessary context
3. **Be Practical**: Provide real-world examples
4. **Be Current**: Keep documentation updated with code changes

---

## Document Versioning

| Document | Last Updated | Version |
|----------|--------------|---------|
| Architecture | 2025-01-15 | 1.0 |
| Migration | 2025-01-15 | 1.0 |
| Performance | 2025-01-15 | 1.0 |
| Development | 2025-01-15 | 1.0 |
| Contributing | 2025-01-15 | 1.0 |

---

## Questions?

If you can't find what you're looking for:

1. Check the [FAQ](../README.md#faq) in main README
2. Search [GitHub Issues](https://github.com/ryoonwithinwisdomlights/norkive/issues)
3. Ask in [GitHub Discussions](https://github.com/ryoonwithinwisdomlights/norkive/discussions)
4. Email: ryoon.with.wisdomtrees@gmail.com

---

Happy coding! 🚀

