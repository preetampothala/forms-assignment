"use strict";

//creating a json object to hold the transaction details
const transactionsArray = [
  {
    amount: 378,
    detail: "grocery",
    color: "#000000",
  },
];

// selecting the elements from the DOM
const labelBalance = document.querySelector(".balance-value");
const containerTransactions = document.querySelector("#transactions");
const button = document.querySelector(".btn");
const amountInputEle = document.querySelector("#amount");
const tranTypeEle = document.querySelector(".transactions-type");
const messageInpurEle = document.querySelector("#message");
const colorPickerEle = document.querySelector("#color-input");
const radioDeposit = document.querySelector("#deposit");
const radioWithdrawl = document.querySelector("#withdraw");
const radioEle = document.getElementsByName("radio");
const errorMsgElem = document.querySelector(".error-msg");

//event listeners for radio buttons will change the texcontent of the button
for (let i = 0; i < radioEle.length; i++) {
  radioEle[i].addEventListener("change", function () {
    button.textContent = this.value;
  });
}

//function to display the transactions
const displayTransactions = function () {
  containerTransactions.innerHTML = "";
  transactionsArray.forEach(function (transaction, index) {
    const htmls = `<div class="transactions-row">
        <div class="transactions-type ${
          transaction["color"] != "#000000"
            ? `"style="background-color:${transaction["color"]}`
            : `transactions-type-${
                transaction["amount"] > 0 ? `deposit` : `withdrawal`
              }`
        }">
        ${index + 1} ${transaction["amount"] > 0 ? `deposit` : `withdrawal`}
        </div>
        <div class="transactions-msg">${transaction["detail"]}</div>
        <div class="transactions-value">$${transaction["amount"]}</div>
        </div>`;
    containerTransactions.insertAdjacentHTML("afterbegin", htmls);
  });
};

displayTransactions();

//button event listener on click to modify the transactions array with the new transaction details
button.addEventListener("click", function (e) {
  e.preventDefault();
  const detail = messageInpurEle.value;
  const amount = Number(amountInputEle.value);
  const color = colorPickerEle.value;

  //getting the rasio button value
  let radioEleValue = document.querySelector(
    'input[name="radio"]:checked'
  ).value;
  if (radioEleValue == "deposit") {
    dothis(amount, color, detail);
  } else if (radioEleValue == "withdraw") {
    dothis(-amount, color, detail);
  }

  //form validation
  if (!detail || !amount || !radioEleValue) {
    console.log(detail, amount, color);
    errorMsgElem.textContent = "Please fill all fields";
    errorMsgElem.classList.remove("hidden");
  } else {
    errorMsgElem.classList.add("hidden");
  }
  //resetting the form
  messageInpurEle.value = "";
  amountInputEle.value = "";
  colorPickerEle.value = "#000000";
});

function dothis(amount, color, detail) {
  if (Math.abs(amount) > 0 && detail !== "" && color !== "") {
    let transaction = {};
    transaction["amount"] = amount;
    transaction["detail"] = detail;
    transaction["color"] = color;
    transactionsArray.push(transaction);
    displayTransactions();
    console.log(transactionsArray);
    console.log(transaction);
  }
  balance();
}

//function to calculate the balance
let balance = function () {
  let sum = 0;
  transactionsArray.forEach(function (transaction) {
    sum += transaction["amount"];
  });
  labelBalance.textContent = `$${sum}`;
};
balance();
