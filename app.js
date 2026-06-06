let transactionArray = []
const keyArray = "transaction-array"

const init = () => {
    getTransactions()
    let totalOnLoad = 0
    render()

    const addButton = document.getElementById('button-add')
    addButton.addEventListener('click', addTransaction)
}

const storeTransaction = () => {
    localStorage.setItem(keyArray, JSON.stringify(transactionArray))
}

const getTransactions = () => {
    const data = localStorage.getItem(keyArray)
    transactionArray = JSON.parse(data) || []
}

function render() { 
    console.log("render() - Entering function")
    console.log("Current Transaction array : ", transactionArray)
    const listContainer = document.getElementById('transaction-list')
    listContainer.innerHTML = ""

    let totalAmount = 0
    for(const item of transactionArray) {
        totalAmount += item.amount
        console.log(item.description)
        const listElement = document.createElement("li")
        listElement.innerHTML = `${item.description} at ${item.amount} on ${item.date}`
        listElement.id = item.id
        
        let listButtonElement = document.createElement("button")
        listButtonElement.onclick = () => deleteTransaction(item.id)
        listButtonElement.innerHTML = "Delete"

        listElement.appendChild(listButtonElement)

        if(item.amount >= 0 ) { 
            listElement.style.color = "green"
        } else {
            listElement.style.color = "red"
        }
        listContainer.append(listElement)
    }   
    const totalElement = document.getElementById('transaction-total')
    totalElement.innerHTML = `Total Transaction: ${totalAmount}$`

    console.log(listContainer)
}

const deleteTransaction = (id) => {
    console.log("deleteTransaction(id) - Entry")
    if (transactionArray.isEmpty === true || transactionArray.length === 0) {
        console.log("Invalid deleteTransaction")
        return;
    }

    const newArray = transactionArray.filter((item) => {
        console.log(item.id, id)
        return item.id !== id})
    console.log("New Array is : ", newArray)
    transactionArray = newArray

    // render()

    // Alternative : Update the DOM and target the element
    let elementToDelete = document.getElementById(id)
    elementToDelete.remove()

    let totalAmount = 0

    for(const item of transactionArray) {
        totalAmount += item.amount
    }
    const totalElement = document.getElementById('transaction-total')
    totalElement.innerHTML = `Total Transaction: ${totalAmount}$`

    storeTransaction()
}

const addTransaction = () => {
    const description = document.getElementById('desc-input').value;
    const amount = parseFloat(document.getElementById('amount-input').value);
    const date = document.getElementById('date-input').value;
    
    
    const newTransaction = {
        description,
        amount,
        date,
        id: Date.now()
    }

    if (!isValid(newTransaction)) {
        console.log("addTransaction() - New Transaction Invalid")
        return;
    }

    transactionArray.push(newTransaction)

    const listContainer = document.getElementById('transaction-list')

    let total = 0
    let listElement = document.createElement("li")
    listElement.innerHTML = `${newTransaction.description} at ${newTransaction.amount} on ${newTransaction.date}`
    listElement.id = newTransaction.id

    let listButtonElement = document.createElement("button")
    listButtonElement.onclick = () => deleteTransaction(newTransaction.id)
    listButtonElement.innerHTML = "Delete"

    listElement.appendChild(listButtonElement)

    if(newTransaction.amount >= 0 ) { 
        listElement.style.color = "green"
    } else {
        listElement.style.color = "red"
    }
    listContainer.append(listElement)
    
    for(const item of transactionArray) {
        total += item.amount
    }

    console.log(`New Transaction : ${description} of ${amount} $ at ${date}`);
    console.log("Array : ", transactionArray)

    // Calculate the total transaction value
    const totalContainer = document.getElementById('transaction-total')
    totalContainer.innerHTML = `Total Transaction: ${total}$`

    // Reset the input fields
    document.getElementById('desc-input').value = ""
    document.getElementById('amount-input').value = ""
    document.getElementById('date-input').value = ""

    storeTransaction()
}

const isValid = (transaction) => {
    if(isNaN(transaction.amount) || transaction.description === "" || transaction.date === "") {
        return false 
    } else {
        return true
    }
}

document.addEventListener('DOMContentLoaded', init);