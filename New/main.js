/**
 * @Description 
 * Home Loan EMI calculator is a basic calculator that helps you to calculate the EMI, monthly interest and monthly reducing balance.
 * On the basis of principal amount, loan tenure and interest rate.
 * 
 * 
 */


/**
 * Initializes the function start() 
 *  calls function Calculate() function
 * @return {void}
 */
function start() {
  calculate();
}


/**
 * Stores the UI amount
 * @returns principal Amount
 */
const principal = () => { return document.getElementById('amount').value; }


/**
 * Gets the UI Interest %P.A and converts to monthly Interest
 * @returns Interest per Month
 */
const rate = () => { return (document.getElementById('interest').value) / 12 / 100; }


/**
 * Gets the Duration of loan in years
 * @returns  Duration in Months
 */
const duration = () => { return (document.getElementById('tenure').value) * 12; }


/**
 * Caluculates EMi using Formula P x R x (1+R)^N / [(1+R)^N-1]
 * @returns  Monthly Emi
 */
const emi = () => { return principal() * rate() * Math.pow(1 + rate(), duration()) / (Math.pow(1 + rate(), duration()) - 1); }


/**
 * Calculates Total Amount of Interest Payable over the Loan Term
 * @returns  Payable TotalInterest
 */
const totalInterest = () => { return (emi() * duration() - principal()).toFixed(0); }


/**
 * Calculates Total Amount to be paid over the Loan Term
 * @returns  Total Payments made over the loan Term
 */
const totalPayment = () => { return (emi() * duration()).toFixed(0); }


/**Intializes the function Calculate()
 * To Display values of EMI, TotalInterest, Total Payment
 * Calls calculateAmortizationSchedule() and displayAmortizationSchedule to calculate and display the Tablular values
 * @return {void}
 */
function calculate() {
  document.getElementById("emi").innerHTML = emi().toFixed();
  document.getElementById("interest-amount").innerHTML = totalInterest();
  document.getElementById("Total").innerHTML = totalPayment();
  calculateAmortizationSchedule(emi(), rate(), principal(),duration());
  displayAmortizationSchedule();

}


/**
 * Function to calculate AmortizationSchedule over the Loan Tenure.
 * @param {*} emi 
 * @param {*} rate 
 * @param {*} principal 
 * @param {*} tenure 
 * Creates an Object Obj and push the properties to array.
 * @returns An array with params Opening Balance, Emi, Interest, PrincipalPaid  and OutStanding Balance
 */


function calculateAmortizationSchedule(emi, rate, principal,tenure) {
  let array=[];
   emi=emi;
  for(let m=1;m<=tenure;m++){
    const Interest=principal*rate;
    const  principalPaid=emi-Interest;
     closingBalance=principal-principalPaid;
      if( closingBalance<=0){closingBalance=0;}
      const obj={
      month:m,
      openingBalance: Number(principal).toFixed(),
      emi:emi.toFixed(),
      Interest:Interest.toFixed(),
      principalPaid:(principalPaid).toFixed(),
      outStandingBalance:(closingBalance).toFixed()
    };

    principal-=(principalPaid);
    array.push(obj);
  }

  console.table(array);
  return array;
}


/**
 * To Display Amortization Schedule
 * Calls calculateAmortizationSchedule to get the array 
 * Creates a table to display the array in UI.
 * @returns {void}
  */
function  displayAmortizationSchedule(){
 array=calculateAmortizationSchedule(emi(), rate(), principal(),duration());
  let ele="<table>";
  ele+="<tr>";
  ele+="<th>"+"Month"+"</th>";
  ele+="<th>"+"Opening Balance"+"</th>";
  ele+="<th>"+"EMI"+"</th>";
  ele+="<th>"+"Monthly Interest Paid"+"</th>";
  ele+="<th>"+"Monthly Principal Paid"+"</th>";
  ele+="<th>"+"Closing Balance"+"</th>";
  ele+="</tr>";
  ele+="<tr>";
  for(let i=0;i<array.length;i++){
        ele+="<tr>";
        for(j in array[i]){
            ele+="<td>"+array[i][j]+"</td>";
        }
       ele+="</tr>";
   }
   ele+="</table>";
   document.getElementById("fetch").innerHTML=ele;
  }



