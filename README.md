# Mayo — AI-Powered Data Analysis in Your Terminal

[![Website](https://img.shields.io/badge/Website-mayo.teleskop.id-blue?style=flat-square)](https://mayo.teleskop.id)
[![Developer](https://img.shields.io/badge/Developer-Teleskop.id-green?style=flat-square)](https://teleskop.id)

**Mayo CLI** is your autonomous AI research & data analysis partner. Query databases with natural language, enrich data with AI, and keep everything private — all from your terminal.

## 🚀 Quick Install

Run the following command in your terminal:

```bash
curl -fsSL https://mayo.teleskop.id/install.sh | bash
```

Or if you prefer a quick initialization:

```bash
mayo /wizard
```

## ✨ Features

- **Natural Language Queries**: Ask questions in plain English, Mayo generates and executes optimized SQL safely.
- **Universal Connectivity**: Support for PostgreSQL, MySQL, SQLite, CSV, and entire folders/directories.
- **AI Data Enhancer**: Batch-process datasets for classification, sentiment analysis, data cleaning, and enrichment.
- **Knowledge Base (RAG)**: Index PDF, Markdown, and text documents into a semantic vector store.
- **Smart Reconciliation**: AI-powered data mapping and reconciliation across different sources.
- **REST API Server**: Expose Mayo as a multi-session API with `mayo serve`.
- **Privacy First**: "Zero-Rows Cloud" policy. Data rows never leave your machine; only schema metadata is used for AI processing.
- **PII Blindfolds**: Automatic detection and masking of sensitive PII (emails, phones, credit cards).

## 🛠 Project Structure (Landing Page)

This repository contains the source code for the Mayo landing page:

- `index.html`: The main landing page.
- `docs.html`: Comprehensive documentation page.
- `styles.css`: Modern, responsive CSS with dark mode aesthetics.
- `main.js`: Interactive components and animations.
- `install.sh`: The official installation script for Mayo CLI.
- `bin/`: Contains binary components or supplementary scripts.

## 🌐 Deployment

The landing page is hosted on GitHub Pages and is accessible at [https://mayo.teleskop.id](https://mayo.teleskop.id).

To deploy changes:
1. Push your changes to the `main` branch.
2. GitHub Actions/Pages will automatically deploy the site.
3. Ensure the `CNAME` file exists with `mayo.teleskop.id`.

---

&copy; 2026 [Teleskop.id](https://teleskop.id). All rights reserved.
