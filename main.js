function start() {
  calculate();
}

/**
 * 
 * @returns 
 */
const principal = () => { return document.getElementById('amount').value; }
const rate = () => { return (document.getElementById('interest').value) / 12 / 100; }
const duration = () => { return (document.getElementById('tenure').value) * 12; }

/* const Interest = () => { return parseFloat(rate()) / 100 / 12; }
console.log(Interest);
const months = () => { return months = parseFloat(duration()) * 12; } */

var emi = () => { return principal() * rate() * Math.pow(1 + rate(), duration()) / (Math.pow(1 + rate(), duration()) - 1); }
const totalInterest = () => { return (emi() * duration() - principal()).toFixed(0); }
const totalPayment = () => { return (emi() * duration()).toFixed(0); }


function calculate() {
  document.getElementById("emi").innerHTML = emi().toFixed();
  document.getElementById("interest-amount").innerHTML = totalInterest();
  document.getElementById("Total").innerHTML = totalPayment();
  calculateAmortizationSchedule(emi(), rate(), principal(),duration());
  displayAmortizationSchedule();
  //tableCreation();

}
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
      outStandingBalance:(principal-principalPaid).toFixed(),

    };
    principal-=(principalPaid);
    array.push(obj);
  }
 
  
  console.table(array);
  return array;
}
function  displayAmortizationSchedule(){
  var array=calculateAmortizationSchedule(emi(), rate(), principal(),duration());
  var mt="<table>";
  mt+="<tr>";
  mt+="<th>"+"Month"+"</th>";
  mt+="<th>"+"Opening Balance"+"</th>";
  mt+="<th>"+"EMI"+"</th>";
  mt+="<th>"+"Monthly Interest Paid"+"</th>";
  mt+="<th>"+"Monthly Principal Paid"+"</th>";
  mt+="<th>"+"Closing Balance"+"</th>";
  mt+="</tr>";
  mt+="<tr>";
  for(var i=0;i<array.length;i++){
        mt+="<tr>";
        for(j in array[i]){
            mt+="<td>"+array[i][j]+"</td>";
        }
        mt+="</tr>";
   }
   mt+="</table>";
   document.getElementById("fetch").innerHTML=mt;
  }


/* function displayAmortizationSchedule(array){
     document.getElementById("Table");
   
  
  document.getElementsByTagName("cell1").innerHTML =array[month]; 
  cell2.innerHTML=month;  
  //let table = document.createElement('table');
//let thead = document.createElement('thead');
//let tbody = document.createElement('tbody');
for(let i of array){
  table.insertRow();
  for(let cell of key)
  {
    let newCell=table.rows[table.rows.length-1].insertCell();
    newCell.textContent=value;
  }
}

table.appendChild(thead);
table.appendChild(tbody); 
document.body.appendChild(table); 
}  */
/* function tableCreation() {
  let table = document.createElement('Table');
  let row = table.insertRow();
  let ce = row.insertCell();ce.textContent = "Month";
  ce = row.insertCell();ce.textContent = "Begining Loan Balance";
  ce = row.insertCell(); ce.textContent = "EMI";
  ce = row.insertCell(); ce.textContent = "Principal";
  ce = row.insertCell(); ce.textContent = "Monthly Interest";
  ce = row.insertCell(); ce.textContent = "Outstanding Balance";
  var arr=(calculateAmortizationSchedule());
  let i=0;
  while( arr.length) {
    console.log(i);
    console.log("anshu");
      table.insertRow();
      let key = Object.values(i);
      console.log(key);
      for (let cell of key) {
          let newCell = table.rows[table.rows.length - 1].insertCell();
          newCell.textContent = cell;
      }
  }
  document.body.appendChild(table);
}
 */


