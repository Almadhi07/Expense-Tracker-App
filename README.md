# Expense-Tracker-App

The Expense Tracker is a simple, user-friendly web application that helps users track their income and expenses. Users can add transactions, view their balance, and select a currency to convert their transactions. The app fetches real-time exchange rates from an external API to convert the amounts into the selected currency. It is designed with a clean and responsive layout for both desktop and mobile use.

## Goals

Track Income and Expenses: Users can add, delete, and categorize transactions as either income or expense.

Currency Conversion: The app supports currency conversion, allowing users to view transactions in their desired currency, with exchange rates fetched from a live API.

User-Friendly Interface: The app provides an intuitive and responsive UI, built with modern HTML, CSS, and JavaScript.

## How to Remove Transactions (Subscriptions)

The Expense Tracker app provides multiple ways to remove transactions:

### Remove Individual Transactions
1. **Locate the transaction** in the transactions list
2. **Click the red ❌ button** on the right side of any transaction
3. **Confirm deletion** when prompted
4. The transaction will be permanently removed and your balance will update automatically

### Remove All Transactions
1. **Click the "Clear All" button** next to the "Transactions" heading (only visible when you have transactions)
2. **Confirm the deletion** of all transactions when prompted
3. All transactions will be permanently removed and your balance will reset to $0.00

### Features:
- **Confirmation dialogs** prevent accidental deletions
- **Real-time balance updates** after each deletion
- **Persistent storage** - deleted transactions are permanently removed from local storage
- **Visual feedback** - delete buttons are partially visible and become fully visible on hover

## Installation & Setup

**Step 1:** Clone the repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

**Step 2:** Install dependencies
```bash
npm install
```
(Make sure you have Node.js installed on your computer)

**Step 3:** Start the application
```bash
npm start
```
This will start the application on http://localhost:1776. You can open this URL in your web browser to use the app.

## Resources

Heroicons: The trash icon used in the app is from Heroicons.

ExchangeRate-API: The app fetches real-time exchange rates from ExchangeRate-API.  
