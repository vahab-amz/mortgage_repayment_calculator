let clearAll = document.getElementById('clearAll')
let mortgageAmount = document.getElementById('mortgageAmount')
let mortgageTerm = document.getElementById('mortgageTerm')
let intrestRate = document.getElementById('intrestRate')
let repayment = document.getElementById('repayment')
let intrest = document.getElementById('intrest')

let submit = document.getElementById('submit')
let monthly_payment = document.getElementById('monthly_payment')
let total_payment = document.getElementById('total_payment')

let defaultResult = document.querySelector('.defaul_result')
let final_result = document.querySelector('.final_result')

let fillOutError = document.querySelectorAll('.span_required_style')
let symbol = document.querySelectorAll('.symbol')


    submit.addEventListener('click', function(){
        let repayment_check = repayment.checked
        let intrest_check = intrest.checked
        let p = mortgageAmount.value
        let t = mortgageTerm.value
        let r = intrestRate.value / 100
        let n = 12

        let checkFillOut = [p, t, r, repayment_check]
        let inputs = [mortgageAmount, mortgageTerm, intrestRate]
        
        for(i = 0; i < checkFillOut.length; i++){
            if(checkFillOut[i]){
                fillOutError[i].innerHTML = ''
                if(i < 3){
                    inputs[i].style.borderColor = 'rgb(158, 158, 158)'
                    symbol[i].style.backgroundColor = 'hsl(202, 86%, 94%)'
                    symbol[i].style.color = 'rgb(86, 116, 156)'
                }
            }
        }
        
        if( (repayment_check || intrest_check) && p && t && r){
            let mp = (p * (r / n)) / (1 - Math.pow(1 + (r / n), -n * t) )
            
            defaultResult.style.display = 'none'
            final_result.classList.remove('display_none')
        
            if(repayment_check){
                monthly_payment.innerHTML = `£${mp.toFixed(2)}`
                total_payment.innerHTML = `£${(mp * t * n).toFixed(2)}`
            } else{
                let intrestOnly = (p / t / n).toFixed(2)
                let mpIntrestOnly = mp - intrestOnly
                monthly_payment.innerHTML = `£${mpIntrestOnly.toFixed(2)}`
                total_payment.innerHTML = `£${(mpIntrestOnly * t * n).toFixed(2)}`
            }
        } else{
            for(i = 0; i < checkFillOut.length; i++){
                if(!(checkFillOut[i])){
                    fillOutError[i].innerHTML = 'This field is required'
                    if(i < 3){
                        symbol[i].style.backgroundColor = 'red'
                        symbol[i].style.color = 'white'
                        symbol[i].style.top = '1px'
                        inputs[i].style.borderColor = 'red'
                    }
                }
            }
        }
        if(intrest_check){
            fillOutError[3].innerHTML = ''
        }
    })

clearAll.addEventListener('click', function(){
    mortgageAmount.value = '';
    mortgageTerm.value = '';
    intrestRate.value = '';
    total_payment.innerHTML = 0;
    monthly_payment.innerHTML = 0;
    repayment.checked = false
    intrest.checked = false
})