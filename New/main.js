/**
 * To initialize the function Calculate
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
var emi = () => { return principal() * rate() * Math.pow(1 + rate(), duration()) / (Math.pow(1 + rate(), duration()) - 1); }
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

/**
 * To Display values of EMI, TotalInterest, Total Payment
 * Calls calculateAmortizationSchedule() and displayAmortizationSchedule to calculate and display the Tablular values
 */
function calculate() {
  document.getElementById("emi").innerHTML = emi().toFixed();
  document.getElementById("interest-amount").innerHTML = totalInterest();
  document.getElementById("Total").innerHTML = totalPayment();
  calculateAmortizationSchedule(emi(), rate(), principal(),duration());
  displayAmortizationSchedule();

}

/**
 * Function to calculate AmortizationSchedule over the Loan Tenure
 * @param {*} emi 
 * @param {*} rate 
 * @param {*} principal 
 * @param {*} tenure 
 * @returns An array with above params
 */
function calculateAmortizationSchedule(emi, rate, principal,tenure) {
  let array=[];
  emi=emi;
  for(let m=1;m<=tenure;m++){
    let Interest=principal*rate;
    let principalPaid=emi-Interest;
     closingBalance=principal-principalPaid;
    if( closingBalance<=0){closingBalance=0;}
      let obj={
      month:m,
      openingBalance: Number(principal).toFixed(),
      emi:emi.toFixed(),
      Interest:Interest.toFixed(),
      principalPaid:(principalPaid).toFixed(),
      outStandingBalance:(principal-principalPaid).toFixed()

    };
    principal-=(principalPaid);
    array.push(obj);
  }
  
  console.table(array);
  return array;
}
//commit

/**
 * To Display Amortization Schedule
  */
function  displayAmortizationSchedule(){
  var array=calculateAmortizationSchedule(emi(), rate(), principal(),duration());
  var ele="<table>";
  ele+="<tr>";
  ele+="<th>"+"Month"+"</th>";
  ele+="<th>"+"Opening Balance"+"</th>";
  ele+="<th>"+"EMI"+"</th>";
  ele+="<th>"+"Monthly Interest Paid"+"</th>";
  ele+="<th>"+"Monthly Principal Paid"+"</th>";
  ele+="<th>"+"Closing Balance"+"</th>";
  ele+="</tr>";
  ele+="<tr>";
  for(var i=0;i<array.length;i++){
        ele+="<tr>";
        for(j in array[i]){
            ele+="<td>"+array[i][j]+"</td>";
        }
       ele+="</tr>";
   }
   ele+="</table>";
   document.getElementById("fetch").innerHTML=ele;
  }



