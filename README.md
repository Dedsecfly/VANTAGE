# VANTAGE - Financial Intelligence Terminal

![VANTAGE Logo](https://images.unsplash.com/photo-1559091043-2d09978ae115?w&auto=format&fit=crop)

## Project Overview

**VANTAGE** is a comprehensive, institutional-grade financial intelligence terminal built independently from scratch. It integrates financial statement analysis, financial modeling, investment banking, valuation, equity research, portfolio analytics, quantitative finance, financial risk management, corporate finance, and AI-assisted financial intelligence.

This is **not** a generic SaaS dashboard. This is **not** a mock financial terminal. This is **not** a simple student portfolio website.

It will eventually contain real, independently tested financial calculations and reliable data workflows across 16 financial module families.

## Quick Start

After cloning and setting up environment variables:

```bash
# Frontend
cd apps/web
npm install
npm run dev

# Backend
cd services/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Project Structure

```
VANTAGE/
├── .gitignore
├── tasks/
│   ├── plan.md         (implementation framework)
│   └── todo.md         (task tracking)
├── README.md           (this file)
├── packages/
│   └── shared/         (shared utilities, types, configuration)
├── apps/
│   └── web/           (Next.js 14 frontend + Tailwind CSS)
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   │   ├── financial/
│       │   │   ├── layout/
│       │   │   └── common/
│       │   ├── lib/
│       │   │   └── utils/
│       │   └── styles/
├── services/
│   └── api/           (FastAPI backend)
│       ├── main.py
│       ├── models/
│       ├── routes/
│       ├── calculations/
│       └── dependencies.py
├── docs/
│   ├── decisions/     (Architecture Decision Records)
│   └── specifications/
├── infrastructure/
│   ├── scripts/
│   └── configs/
└── tests/
    ├── backend/
    └── frontend/
```

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Next.js | 14.x |
| | TypeScript | 5.x |
| | Tailwind CSS | 4.0.x |
| | React | 18.x / 19.x |
| **Backend** | Python | 3.12.x |
| | FastAPI | 0.111.x |
| | Pydantic | 2.7.x |
| | Uvicorn | 0.31.x |
| **Database** | PostgreSQL | 15.x+ |
| **Quantitative** | NumPy | 1.x+ |
| | Pandas | 2.x+ |
| | SciPy | 1.12.x |
| | Decimal | Built-in |
| **AI** | Provider-independent | TBD |
| **Tools** | Git | 2.40+ |
| | npm | 10.x+ |
| | pip | 24.x+ |

## Philosophy

- **Greenfield independence**: No code, architecture, or configuration inherited from AUREON, FINOS AIR, or any previous project
- **Source-driven development**: Every framework-specific code decision backed by official documentation
- **Doubt-driven development**: Non-trivial decisions materialize fresh-context reviewers before output stands
- **Financial accuracy**: Mathematically correct, reproducible, deterministic, testable, auditable, traceable to inputs
- **Institutional aesthetic**: Deep charcoal/near-black backgrounds, platinum/silver/gold accents, professional typography, high-density financial info, sophisticated data viz, precision-aligned tables, elegant navigation, restrained animations, excellent hierarchy

## Committed Commands

```bash
# Environment setup
npm install      # Frontend dependencies
pip install -r services/api/requirements.txt  # Backend dependencies
git init         # Version control
# ... more as development progresses
```

## Status

**Current Phase**: Phase 0 — Greenfield Project Initialization & Engineering Foundation
- ✓ Repository initialized at `C:\Users\polan\OneDrive\Desktop\VANTAGE\`
- ✓ Git initialized
- ✓ Directory structure created (modular monolith)
- ✓ Phase 0 plan documented (tasks/plan.md)
- ✓ .gitignore configured
- ⬜ Frontend foundation (Step 0.3)
- ⬜ Backend foundation (Step 0.4)
- ⬜ Frontend/backend connectivity (Step 0.5)
- ⬜ Engineering quality system (Step 0.6)
- ⬜ Institutional UI shell (Step 0.7)
- ⬜ Phase 0 validation (Step 0.8)

This project is under active development. See `tasks/plan.md` for the detailed eight-stage implementation framework.