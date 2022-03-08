document.getElementById('loan.form').addEventListener('submit',calculate)


 function calculate(){
    const principal = document.getElementById('amount').value;
    console.log(principal);
    const rate = document.getElementById('interest').value;
    console.log(rate);
    const duration = document.getElementById('tenure').value;
        const Interest=parseFloat(rate)/100/12;
        const  months=parseFloat(duration)*12;
        console.log(months);

          var emi=principal *Interest * Math.pow(1+Interest,months) / (Math.pow(1+Interest,months)-1);
          console.log(emi);
          document.getElementById("emi").innerHTML=emi.toFixed();
          const totalInterest=(emi*months-principal);
          console.log(totalInterest);
          document.getElementById("interest-amount").innerHTML=totalInterest;
          const totalPayment=(emi*months);
          document.getElementById("Total").innerHTML=totalPayment;

        }  

