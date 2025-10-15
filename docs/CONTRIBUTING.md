# Contributing to Norkive

Thank you for considering contributing to Norkive! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes**:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes**:
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**Bug Report Template**:

```markdown
## Description
A clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: [e.g. macOS 14.0]
- Node.js: [e.g. 20.11.0]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

## Additional Context
Screenshots, error logs, etc.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**Enhancement Template**:

```markdown
## Problem
Describe the problem this enhancement would solve.

## Proposed Solution
Describe your proposed solution.

## Alternatives Considered
Other solutions you've considered.

## Additional Context
Mockups, examples, etc.
```

### Code Contributions

1. **Find an issue** or create one
2. **Comment** on the issue to claim it
3. **Fork** the repository
4. **Create branch** from `main`
5. **Make changes** following our guidelines
6. **Test** your changes
7. **Submit** pull request

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/norkive.git
cd norkive

# Add upstream remote
git remote add upstream https://github.com/ryoonwithinwisdomlights/norkive.git
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Create Branch

```bash
git checkout -b feature/my-feature
# or
git checkout -b fix/my-bug-fix
```

### 4. Make Changes

Follow the [Development Guide](./DEVELOPMENT.md) for detailed instructions.

### 5. Test Locally

```bash
# Start development server
npm run dev

# Validate MDX
npm run validate:mdx

# Lint code
npm run lint

# Format code
npm run prettier:write
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] No new warnings generated
- [ ] MDX validation passes
- [ ] Build succeeds locally
- [ ] Tested on multiple browsers (if UI change)

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Testing
Describe how you tested your changes.

## Screenshots (if applicable)
Before/after screenshots for UI changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code
- [ ] I have made corresponding documentation changes
- [ ] My changes generate no new warnings
- [ ] I have tested my changes locally
```

### Review Process

1. **Automated checks** run (ESLint, TypeScript, build)
2. **Maintainer review** (usually within 48 hours)
3. **Discussion** and requested changes
4. **Approval** and merge

### After Merge

- Delete your branch
- Pull latest from upstream
- Celebrate! 🎉

---

## Coding Standards

### TypeScript

```typescript
// ✅ Good: Type everything
interface Props {
  title: string;
  count: number;
}

function Component({ title, count }: Props) {
  // ...
}

// ❌ Bad: Using any
function Component(props: any) {
  // ...
}
```

### React Components

```typescript
// ✅ Good: Functional component with proper types
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

// ❌ Bad: Class component, no types
export class Button extends React.Component {
  render() {
    return <button>{this.props.label}</button>;
  }
}
```

### File Naming

```
✅ Good:
- MyComponent.tsx (components)
- useMyHook.ts (hooks)
- myUtil.ts (utilities)
- my-post.mdx (content)

❌ Bad:
- mycomponent.tsx
- MyHook.ts (should start with 'use')
- MyUtil.ts (utilities should be camelCase)
```

### Import Order

```typescript
// 1. React and Next.js
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { z } from 'zod';
import clsx from 'clsx';

// 3. Internal modules
import { Button } from '@/modules/common/Button';
import { useTheme } from '@/lib/hooks/useTheme';

// 4. Types
import type { Post } from '@/types/mdx.model';

// 5. Styles (if any)
import './styles.css';
```

### Naming Conventions

```typescript
// Variables: camelCase
const userName = 'John';
const isActive = true;

// Functions: camelCase
function calculateTotal() { }
const handleClick = () => { };

// Components: PascalCase
function MyComponent() { }
export const UserProfile = () => { };

// Constants: UPPER_SNAKE_CASE
const MAX_ITEMS = 100;
const API_BASE_URL = 'https://api.example.com';

// Types/Interfaces: PascalCase
interface UserData { }
type PostType = { };
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance (dependencies, configs)

### Examples

```bash
# Feature
git commit -m "feat(search): add fuzzy search functionality"

# Bug fix
git commit -m "fix(image): resolve Cloudinary URL generation"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Breaking change
git commit -m "feat(api)!: change response format

BREAKING CHANGE: API responses now use camelCase instead of snake_case"
```

### Commit Message Best Practices

**DO**:
- Use imperative mood ("add" not "added")
- Keep subject line under 50 characters
- Capitalize first letter
- No period at end
- Provide context in body if needed

**DON'T**:
- Write vague messages ("fix bug", "update")
- Combine unrelated changes
- Include WIP commits in PR

---

## Testing

### Manual Testing

Before submitting PR, test:

1. **Functionality**
   - Feature works as intended
   - No console errors
   - No visual regressions

2. **Responsiveness**
   - Test on mobile, tablet, desktop
   - Test different screen sizes

3. **Browsers**
   - Chrome
   - Firefox
   - Safari (if available)

4. **Accessibility**
   - Keyboard navigation works
   - Screen reader compatible
   - Sufficient color contrast

### MDX Validation

```bash
npm run validate:mdx
```

Ensures:
- Frontmatter schema compliance
- No syntax errors
- All required fields present

### Build Testing

```bash
# Production build
npm run build

# Check for build errors
# Check bundle size
npm run analyze
```

---

## Review Checklist

### For Reviewers

- [ ] Code follows style guidelines
- [ ] Changes are well-documented
- [ ] No unnecessary code changes
- [ ] Tests pass (if applicable)
- [ ] Build succeeds
- [ ] No new warnings/errors
- [ ] Performance impact considered
- [ ] Security implications reviewed
- [ ] Accessibility maintained/improved

### For Contributors

- [ ] Self-review completed
- [ ] Code is well-commented
- [ ] Documentation updated
- [ ] All checks pass
- [ ] Responsive on all devices
- [ ] Works in multiple browsers
- [ ] No console errors/warnings

---

## Issue and PR Labels

### Priority
- `priority: critical` - Urgent, breaks core functionality
- `priority: high` - Important, affects many users
- `priority: medium` - Moderate importance
- `priority: low` - Nice to have

### Type
- `type: bug` - Something isn't working
- `type: feature` - New functionality
- `type: enhancement` - Improve existing feature
- `type: docs` - Documentation
- `type: refactor` - Code cleanup

### Status
- `status: needs review` - Awaiting review
- `status: changes requested` - Needs changes
- `status: approved` - Approved for merge
- `status: blocked` - Blocked by other issue

### Area
- `area: ui` - User interface
- `area: performance` - Performance related
- `area: a11y` - Accessibility
- `area: dx` - Developer experience

---

## Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports, feature requests
- **Discussions**: Questions, ideas, community chat
- **Email**: ryoon.with.wisdomtrees@gmail.com

### Resources

- [Development Guide](./DEVELOPMENT.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Performance Guide](./PERFORMANCE.md)
- [Migration Story](./MIGRATION.md)

---

## Recognition

Contributors will be:
- Added to `CONTRIBUTORS.md`
- Mentioned in release notes
- Credited in documentation

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Norkive! 🚀

