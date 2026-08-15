# BAIRE Research Commons

A working product prototype for a Bangladesh-centered global research network connecting students, researchers, clinicians, faculty, and diaspora mentors through focused four-month computational projects.

**Live prototype:** [baire-research-commons.khalidsaifullahfahim.chatgpt.site](https://baire-research-commons.khalidsaifullahfahim.chatgpt.site)

## What the prototype demonstrates

- Verified researcher and mentor profiles
- Project discovery, matching, saving, and applications
- Four-month milestones and project workspaces
- Contribution-aware reputation and progression
- BAIRE Research Continuity Library
- Workshops, guest lectures, and the Research Forum
- Governed data-access catalog
- CPU/GPU allocation and computing views
- Responsive desktop and mobile layouts

The current version uses realistic demonstration content and browser-local interactions. It does not yet include production authentication, persistent user records, payments, external messaging integrations, or clinical-data access.

## Product direction

The platform is designed around a simple cycle:

1. Researchers create verified profiles.
2. PIs propose scoped projects and recruit role-specific teams.
3. Members deliver work through milestone-based research terms.
4. Contributions and reciprocal feedback become portable evidence of experience.
5. Every project deposits a reusable Continuation Pack so the next team starts further ahead.

## Run locally

Requirements: Node.js 22.13 or later and pnpm.

```bash
pnpm install
pnpm run dev
```

Build the production version:

```bash
pnpm run build
```

## Main files

- `app/page.tsx` — portal screens, demonstration data, and interactions
- `app/globals.css` — responsive visual system
- `app/layout.tsx` — metadata and social-sharing configuration
- `public/og.png` — BAIRE social-sharing card

## Status

This repository is an early product prototype intended for stakeholder feedback and iterative development. It should not be used to collect, store, or process participant or clinical data in its current form.
