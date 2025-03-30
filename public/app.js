/*
const API_KEY = "4e8cfca5712faa34dd6eb3ef";
const BASE_CURRENCY = "USD";

async function getExchangeRate(targetCurrency) {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`);
        const data = await response.json();

        if (data.result === "success") {
            return data.conversion_rates[targetCurrency];
        } else {
            console.error("Error fetching exchange rate:", data);
            return 1;
        }
    } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        return 1;
    }
}

const transactions = [
   {
    id: 1,
    name: 'salary',
    amount: 5000,
    date: new Date(),
    type: 'income'
    },

    {
    id: 2,
    name: 'haircut',
    amount: 40,
    date: new Date(),
    type: 'expense'
    },

    {
    id: 3,
    name: 'concert ticket',
    amount: 250,
    date: new Date(),
    type: 'expense'
    },    
];

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");

async function renderList(targetCurrency = "USD") {
    list.innerHTML = "";

    if (transactions.length === 0) {
        status.textContent = "No transactions.";
        return;
    }

    const exchangeRate = await getExchangeRate(targetCurrency);

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: targetCurrency,
        signDisplay: "always"
    });


transactions.forEach(({ id, name, amount, date, type }) => {
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    const li = document.createElement("li");
    li.innerHTML = `
        <div class="name">
            <h4>${name}</h4>
            <p>${new Date(date).toLocaleDateString()}</p>
        </div>
        <div class="amount ${type}">
            <span>${formatter.format(convertedAmount)} ${targetCurrency}</span>
        </div>
        <div class="action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" onclick="deleteTransaction(${id})">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </div>
    `;
    list.appendChild(li);
});
}

function deleteTransaction(id) {
    const index = transactions.findIndex(trx => trx.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        renderList();
    }
}

function addTransaction(e) {
    e.preventDefault();
    const formData = new FormData(form);

    transactions.push({
        id: transactions.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: form.querySelector("#type").checked ? "income" : "expense"
    });

    form.reset();
    renderList();
}

async function updateBalances(targetCurrency) {
    const exchangeRate = await getExchangeRate(targetCurrency);
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: targetCurrency,
        signDisplay: "always"
    });

    let incomeTotal = 0, expenseTotal = 0;
    transactions.forEach(({ amount, type }) => {
        const convertedAmount = amount * exchangeRate;
        if (type === "income") {
            incomeTotal += convertedAmount;
        } else {
            expenseTotal += convertedAmount;
        }
    });

    document.getElementById("income").textContent = formatter.format(incomeTotal);
    document.getElementById("expense").textContent = formatter.format(expenseTotal);
    document.getElementById("balance").textContent = formatter.format(incomeTotal - expenseTotal);
}

document.getElementById("currency").addEventListener("change", (e) => {
    const targetCurrency = e.target.value;
    updateBalances(targetCurrency);
    renderList(targetCurrency);
});


function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
}

transactions.push(...loadTransactions());
renderList();
updateBalances("USD");

function deleteTransaction(id) {
    const index = transactions.findIndex(trx => trx.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        saveTransactions();
        renderList();
    }
}

function addTransaction(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const newTransaction = {
        id: transactions.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: form.querySelector("#type").checked ? "income" : "expense"

    };

    transactions.push(newTransaction);
    saveTransactions();
    form.reset();
    renderList();
}

updateBalances("USD");

form.addEventListener("submit", addTransaction);

renderList();

*/

const API_KEY = "4e8cfca5712faa34dd6eb3ef";
const BASE_CURRENCY = "USD";

async function getExchangeRate(targetCurrency) {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`);
        const data = await response.json();

        return data.result === "success" ? data.conversion_rates[targetCurrency] : 1;
    } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        return 1;
    }
}

const transactions = loadTransactions();

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");
const currencySelector = document.getElementById("currency");

async function renderList(targetCurrency = "USD") {
    list.innerHTML = "";

    if (transactions.length === 0) {
        status.textContent = "No transactions.";
        return;
    }

    const exchangeRate = await getExchangeRate(targetCurrency);
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: targetCurrency,
        signDisplay: "always"
    });

    transactions.forEach(({ id, name, amount, date, type }) => {
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="name">
                <h4>${name}</h4>
                <p>${new Date(date).toLocaleDateString()}</p>
            </div>
            <div class="amount ${type}">
                <span>${formatter.format(convertedAmount)} ${targetCurrency}</span>
            </div>
            <div class="action" onclick="deleteTransaction(${id})">
                ❌
            </div>
        `;
        list.appendChild(li);
    });
}

function deleteTransaction(id) {
    const index = transactions.findIndex(trx => trx.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        saveTransactions();
        renderList(currencySelector.value);
        updateBalances(currencySelector.value);
    }
}

function addTransaction(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const amount = parseFloat(formData.get("amount"));
    const date = formData.get("date");
    const typeElement = form.querySelector("#type");
    const type = typeElement && typeElement.checked ? "income" : "expense";

    if (!name || isNaN(amount) || !date) {
        alert("Please fill in all fields correctly.");
        return;
    }

    transactions.push({
        id: transactions.length + 1,
        name,
        amount,
        date: new Date(date),
        type
    });

    saveTransactions();
    form.reset();
    renderList(currencySelector.value);
    updateBalances(currencySelector.value);
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
}

async function updateBalances(targetCurrency) {
    const exchangeRate = await getExchangeRate(targetCurrency);
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: targetCurrency,
        signDisplay: "always"
    });

    let incomeTotal = 0, expenseTotal = 0;
    transactions.forEach(({ amount, type }) => {
        const convertedAmount = amount * exchangeRate;
        if (type === "income") incomeTotal += convertedAmount;
        else expenseTotal += convertedAmount;
    });

    document.getElementById("income").textContent = formatter.format(incomeTotal);
    document.getElementById("expense").textContent = formatter.format(expenseTotal);
    document.getElementById("balance").textContent = formatter.format(incomeTotal - expenseTotal);
}

currencySelector.addEventListener("change", (e) => {
    updateBalances(e.target.value);
    renderList(e.target.value);
});

form.addEventListener("submit", addTransaction);

renderList("USD");
updateBalances("USD");
