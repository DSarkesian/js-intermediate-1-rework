"use strict"
// Find DOM element and hold onto it, so we don't have to search for it
// every time we use it.
const calcForm = document.getElementById("calc-form");
const loanAmountInput = document.getElementById("loan-amount");
const termInYearsInput = document.getElementById("loan-years");
const yearlyRateInput = document.getElementById("loan-rate");
const resultArea = document.getElementById("calc-monthly-payment");

/** Get form values and return as `{amount, years, rate}`.
 *
 * Example output: `{"amount": 10000, "years": 10, "rate": 4.5}`.
 *
 * */

function getFormValues() {
  return {
    amount: Number(loanAmountInput.value),
    years: Number(termInYearsInput.value),
    rate: Number(yearlyRateInput.value)
  }



}


/** Calculate monthly payment and return exact amount. */

function calcMonthlyPayment(amount, years, rate) {
  const monthsInYear = 12;
  const monthlyRate = (rate / 100) / monthsInYear;
  const n = Math.floor(years * monthsInYear);
  return (
      (monthlyRate * amount) /
      (1 - Math.pow((1 + monthlyRate), -n))
  );
}


/** Get form values, calculate, convert to 2-decimal places, and update UI. */

function getFormValuesAndDisplayResults() {
  const {amount, years, rate} = getFormValues();
  const payment = calcMonthlyPayment(amount,years,rate);
  let payment1 = payment.toFixed(2)
  console.log(payment1)
  resultArea.innerText = "$" + payment1;



}


/** Set initial form values and show initial results. Called at app start. */

function setInitialValues() {
  loanAmountInput.value = 10000;
  termInYearsInput.value = 10;
  yearlyRateInput.value = 4.5;
  getFormValuesAndDisplayResults()
}


/** Start: set form defaults & display; attach form submit event listener. */

function start() {
  setInitialValues();

  calcForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    getFormValuesAndDisplayResults();
  });
}
