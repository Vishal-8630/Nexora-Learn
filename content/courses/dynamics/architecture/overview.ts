import { DocContent } from "@/types/docs";

export const architectureOverview: DocContent = {
  title: "Architecture Overview",
  description:
    "An introduction to enterprise Solution Architecture in the Power Platform, defining the principles of maintainability, scalability, and code organization.",
  content: `
## Introduction

Dynamics 365 and Dataverse are incredibly flexible platforms. Because it is so easy to drag and drop a new table or write a quick C# plugin, environments often devolve into a chaotic mess of overlapping solutions, duplicated code, and broken dependencies.

This is the domain of the **Solution Architect**.

## The Role of the Architect

A Solution Architect is not just a senior developer. Their job is to look at the enterprise as a whole and design a system that answers three critical questions:
1. **Scalability:** Can the system handle 10 million records without timing out or crashing SQL?
2. **Maintainability:** If a senior developer leaves, can a junior developer understand the C# codebase and the solution layering?
3. **Extensibility:** When the business introduces a new product line next year, can the system adapt without a total rewrite?

## Core Architectural Principles

In this phase, we will cover the strict structural rules that separate an amateur deployment from an enterprise deployment.

### 1. Data First (Domain Modeling)
Architecture starts at the database layer. If your tables are designed poorly, your UI and Plugins will always be broken. You must understand Normalization and the Common Data Model (CDM) before writing any code.

### 2. Strict Layering and Segmentation
Solutions must be layered logically (Base -> Core -> UI). Never build monolithic solutions that contain every component in the system. 

### 3. Code Organization
C# plugins cannot be massive monolithic files filled with thousands of lines of code. They must be modular, highly testable, and utilize **Dependency Injection** and **Shared Libraries**.

### 4. Naming Conventions
A unified schema prefix and naming standard is non-negotiable. If developers do not agree on a naming convention, database collisions will destroy the production environment.

## When Do You Need an Architect? (Decision Making)

- **Small internal apps (Canvas Apps, SharePoint lists):** Do not over-engineer. An architect is usually not required.
- **Enterprise ERP/CRM Replacements:** If the system handles financial data, customer data, or ties into external systems via API, an architect is mandatory from Day 1.

## Things to Remember

- Architecture is about **Scalability, Maintainability, and Extensibility**.
- Flexibility is dangerous; architects must enforce **strict rules**.
- Good architecture always begins at the **Data Model layer**.

## What's Next

Before writing any code, an architect must define the exact structure of the solutions that will hold the code. Let's look at **Solution Architecture**.
  `.trim(),
};
