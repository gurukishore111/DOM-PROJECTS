const submitBtn = document
  .getElementById("loan-form")
  .addEventListener("submit", (e) => {
    //   Hide results
    document.getElementById("results").style.display = "none";
    document.getElementById("loading").style.display = "block";
    setTimeout(() => {
      calculateResults();
    }, 2000);
    e.preventDefault();
  });

function calculateResults() {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatePayment = parseFloat(years.value) * 12;
  const x = Math.pow(1 + calculateInterest, calculatePayment);
  const monthly = (principal * x * calculateInterest) / (x - 1);
  console.log(monthly);
  if (isFinite(monthly)) {
    monthlyPayment.value = "Monthy Payments : " + monthly.toFixed(2);
    totalPayment.value =
      "Total Payment : " + (monthly * calculatePayment).toFixed(2);
    totalInterest.value =
      "Total Amount : " + (monthly * calculatePayment - principal).toFixed(2);
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check given number");
  }
}

function showError(error) {
  const errorDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 3000);
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";
}

function clearError() {
  document.querySelector(".alert").remove();
}
