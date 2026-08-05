# PulseBoard

> 🚧 **Work in Progress**
> PulseBoard is currently under active development. The core architecture is being built and features may change over time.

## What is PulseBoard?

PulseBoard is a modern SaaS project management platform designed for small teams.

It combines **task management**, **sprint planning**, and a lightweight **CRM** into a single workspace. Instead of using multiple tools for projects, customers, and team collaboration, PulseBoard brings everything together in one dashboard.

## Screenshots

### Landing Page

![Landing Page](https://github.com/umutdiyar/pulseboard/blob/main/docs/screenshots/PulseBoard-LandingPage.png)

---

### Dashboard

![Dashboard](https://github.com/umutdiyar/pulseboard/blob/main/docs/screenshots/PulseBoard-Dashboard.png)

> Dashboard currently uses demonstration data while backend integration is under development.

## Features (Planned)

* 🔐 JWT Authentication & Refresh Tokens
* 👥 Multi-Tenant Workspace Architecture
* 🛡️ Role-Based Authorization (Owner / Admin / Member)
* 📋 Project & Task Management
* 🚀 Sprint Planning
* 👤 Team Collaboration
* 📈 Dashboard Analytics
* 🤝 Lead & Customer (Mini CRM)
* 📝 Activity Logs
* 🔍 Search & Filtering
* 📊 Workspace Statistics

## Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* React Hook Form
* Zod
* Framer Motion

### Backend

* ASP.NET Core 8 Web API
* Entity Framework Core
* PostgreSQL
* JWT Authentication
* Refresh Tokens
* FluentValidation
* Serilog

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* CI/CD Pipeline

## Project Structure

```text
apps/
 ├── marketing/     # Landing page
 └── app/           # Dashboard

server/             # ASP.NET Core API

infra/              # Docker & infrastructure
```

## Goals

PulseBoard is being built as a production-ready SaaS application to demonstrate modern full-stack development practices, including:

* Clean Architecture
* Multi-Tenant Design
* Secure Authentication
* Scalable Backend
* Modern React Development
* Containerized Development Environment

## Current Status

### Completed

* Repository setup
* Project planning
* Initial architecture

### In Progress

* Landing page
* Dashboard UI
* Authentication
* Backend API
* Database integration

### Planned

* Workspace management
* Projects
* Tasks
* Sprint boards
* CRM module
* Analytics dashboard
* Notifications

## Roadmap

* [ ] Landing Page
* [ ] Authentication
* [ ] Workspace System
* [ ] Role Management
* [ ] Projects
* [ ] Tasks
* [ ] Sprint Board
* [ ] Mini CRM
* [ ] Dashboard Analytics
* [ ] Docker Deployment
* [ ] CI/CD Pipeline
* [ ] Production Release

## Why PulseBoard?

Many small teams use separate tools for project management, customer tracking, and collaboration.

PulseBoard aims to provide a simple, fast, and modern alternative by combining these workflows into one unified platform.

---

⭐ This project is currently under development. Contributions, suggestions, and feedback are always welcome.
