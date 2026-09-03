const descriptionInput =
    document.getElementById("description");

const amountInput =
    document.getElementById("amount");

const typeInput =
    document.getElementById("type");

const addButton =
    document.getElementById("add-btn");

const transactionList =
    document.getElementById("transaction-list");

const balanceDisplay =
    document.getElementById("balance");

const incomeDisplay =
    document.getElementById("income");

const expensesDisplay =
    document.getElementById("expenses");


let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];


function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


function displayTransactions() {

    transactionList.innerHTML = "";


    transactions.forEach(function(transaction) {

        const li =
            document.createElement("li");

        li.classList.add("transaction-item");


        const info =
            document.createElement("div");

        info.classList.add("transaction-info");


        const description =
            document.createElement("p");

        description.classList.add(
            "transaction-description"
        );

        description.textContent =
            transaction.description;


        const amount =
            document.createElement("p");

        amount.classList.add(
            "transaction-amount"
        );

        amount.classList.add(
            transaction.type
        );


        if (transaction.type === "income") {

            amount.textContent =
                `+ ₦${transaction.amount.toLocaleString()}`;

        } else {

            amount.textContent =
                `- ₦${transaction.amount.toLocaleString()}`;

        }


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add(
            "delete-btn"
        );


        deleteButton.addEventListener(
            "click",
            function() {

                transactions =
                    transactions.filter(
                        function(item) {

                            return item.id !==
                                transaction.id;

                        }
                    );


                saveTransactions();

                displayTransactions();

                updateSummary();

            }
        );


        info.appendChild(description);

        info.appendChild(amount);


        li.appendChild(info);

        li.appendChild(deleteButton);


        transactionList.appendChild(li);

    });

}


function updateSummary() {

    let income = 0;

    let expenses = 0;


    transactions.forEach(
        function(transaction) {

            if (transaction.type === "income") {

                income += transaction.amount;

            } else {

                expenses += transaction.amount;

            }

        }
    );


    const balance =
        income - expenses;


    incomeDisplay.textContent =
        `₦${income.toLocaleString()}.00`;


    expensesDisplay.textContent =
        `₦${expenses.toLocaleString()}.00`;


    balanceDisplay.textContent =
        `₦${balance.toLocaleString()}.00`;

}


function addTransaction() {

    const description =
        descriptionInput.value.trim();


    const amount =
        Number(amountInput.value);


    const type =
        typeInput.value;


    if (description === "") {

        alert("Please enter a description.");

        return;

    }


    if (amount <= 0 || isNaN(amount)) {

        alert("Please enter a valid amount.");

        return;

    }


    const transaction = {

        id: Date.now(),

        description: description,

        amount: amount,

        type: type

    };


    transactions.push(transaction);


    saveTransactions();

    displayTransactions();

    updateSummary();


    descriptionInput.value = "";

    amountInput.value = "";

}


addButton.addEventListener(
    "click",
    addTransaction
);


displayTransactions();

updateSummary();