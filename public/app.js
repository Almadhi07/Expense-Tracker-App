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
