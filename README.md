# 💰 Money Manager Telegram Bot

A personal finance management Telegram bot built with Google Apps Script.
Inspired by Secrets of the Millionaire Mind: Mastering the Inner Game of Wealth, this bot applies the suggested account-based budgeting approach to real life—automating financial discipline and bringing clarity to daily spending habits.

📌 Live bot: https://web.telegram.org/k/#@YourMoneyHabitsBot
👥 Active users: 10+
⚙️ Technologies: Google Apps Script, Telegram Bot API, Google Sheets

📘 Overview
This bot helps users manage personal funds by allocating income into different “accounts” (e.g. Necessities, Education, Play) based on customizable percentages. The accounts and all interactions are stored and managed in Google Sheets.

Key Features:
- Add, edit, and delete financial accounts
- Assign custom percentages to each account
- Track remaining allocation dynamically
- Multi-language support with translations stored in Google Sheets
- Telegram-based interaction with inline buttons and guided steps
- Account creation success messages tailored to user input

🛠️ Technical Highlights
- Google Sheets as Database: All user data is stored and manipulated directly in Google Sheets.
- Modular Script Design: Functions are divided by responsibility—account editing, currency setup, user state management, and messaging.
- Internationalization (i18n): Success messages and UI texts are dynamically loaded from a translation sheet.
- Persistent State: Tracks user steps using a defined "endpoint" system to guide flows like account editing or setup.
- User Feedback: Dynamic message creation based on user data and interaction state (e.g., AccountCreationSuccess with remaining percent).

🧠 Inspiration
The budgeting philosophy was inspired by the book Secrets of the Millionaire Mind, where the author introduces a system of dividing income into distinct financial categories. I customized this approach to suit modern user needs and automated it for everyday use via Telegram.

This project not only reflects my interest in automation and finance but is something I personally use and continuously improve.

🔗 Try it Live
You can try the bot on Telegram:
👉 https://web.telegram.org/k/#@YourMoneyHabitsBot

📄 Sample Code Modules
- AccountManager.gs: Handles adding, editing, and deleting user accounts
- AccountMessaging.gs: Sends dynamic Telegram messages based on user actions and translations
- CurrencySetup.gs: Sets user currency preferences
- StateHandler.gs: Manages user state throughout the interaction flow

📈 Future Plans
- Add expense tracking with charts and monthly summaries
- Enable export of data to PDF/CSV
- Add optional income tracking and auto-redistribution

