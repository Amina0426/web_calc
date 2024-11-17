let buttons=document.querySelectorAll(".button");
let barBtn=document.querySelectorAll(".bar_btn");
let numBtn=document.querySelectorAll(".num");
let screen=document.querySelector(".display");
let opBtn=document.querySelectorAll(".op");
let equal=document.querySelector(".equal");
let clearBtn=document.querySelector(".clear");
let delBtn=document.querySelector(".del");
let togglBtn=document.querySelector("#toggle");
let trigBtn=document.querySelectorAll(".trig");
let bracket=document.querySelector("#bracket");
let factBtn=document.querySelector("#fact");
let mR=document.querySelector("#MR");
let mp=document.querySelector("#MP");
let mc=document.querySelector("#MC");
let mm=document.querySelector("#MM");
let m=document.querySelector("#M");
let ms=document.querySelector("#MS");
let box1=document.querySelector(".history");
let box2=document.querySelector(".memory");



let curr='';
let prev='';
let operator=null;
let functionName='';
let memValue=0;
let isOpen=false;


const handleNum=(number)=>{
    if(functionName===''){
        if(number==='e'){
            curr = Math.E;
        }
        if(number==='pi'){
            curr=Math.PI;
        }else{
        curr+=number;
        }
       
    }else{
    curr+=number;
    }
    
    display();
};
const handleOperator=(op)=>{
    if(curr===''){
        return;
    }else if(prev!==''){
        calculate();
    }
    operator=op;
    prev=curr;
    curr='';
    display();
};
const handleTrig=(trigFunc)=>{
    if(curr===''){
        functionName=trigFunc;
        curr =`${trigFunc}(`
    }else{
        functionName=trigFunc;
        curr = `${trigFunc}(${curr}`
    }
display();
};
const handleNegative=()=>{
    if(curr ===''){
        return;
    }
    if(curr.includes('(')&&!curr.includes(')')){
        curr += '-';
    }else{
        curr = '-' + curr;
    }
    display();

};
const mAdd=()=>{
    if(curr!==''){
        memValue += parseFloat(curr);
    }else if(curr === '' && operator !== null){
        memValue+=parseFloat(prev); 
    }
};
const mDel=()=>{
    if(curr !== ''){
        memValue -= parseFloat(curr);
        display();
    }else if(curr === '' && operator !== null){
        memValue-=parseFloat(prev);  
    }
};
const mClear=()=>{
    memValue=0;
    display();
};
const mRecall=()=>{
    if(curr !== ''||curr === '0'){
        curr=memValue.toString();
        display();
    }else if(curr === ''){
        curr+=memValue.toString();
        display();
    }
};
const mStore=()=>{
    if(curr !== ''){
        memValue = parseFloat(curr);
    }

};
const history=()=>{
    box2.innerText = memValue.toString();
};

const calculate=()=>{
    let result;
    let prevNum=parseFloat(prev);
    let currNum=parseFloat(curr);

    if(functionName){
        result=trigCalc(functionName);
        return;
    }
    
    if(operator ==='!'){
        result=factorial(prevNum);
    }
  
    switch(operator){
        case '+':
            result=prevNum + currNum;
            
            break;
        case '-':
            result=prevNum-currNum;
            
            break;
        case '*':
            result=prevNum*currNum;
            
            break;
        case '/':
            if (currNum === 0) {
                result = "ERROR";  // Handle division by zero
            } else {
                result = prevNum / currNum;
            }
           
            break;
            
        case '^':
            result=Math.pow(prevNum,currNum);
           
            break;
        case '%':
            result = (prevNum * currNum) / 100;  // This calculates "prevNum is X% of currNum"
            break;
                
        default:
            break;
    }

   
    curr=result;
    operator=null;
    prev='';
    functionName='';
    display();
};


const factorial=(n)=>{
    if(n===0||n===1){
        return 1;
    }
    let factN_1=factorial(n - 1);
    let factN=n*factN_1;
    return factN;
    display();
};
const clear=()=>{
    curr='';
    prev='';
    operator=null;
    display();
};
const display = () => {
    console.log(`curr is ${curr} and prev is ${prev}`);
    console.log(curr);
    if (curr !== '') {
        if(prev!==''&& operator!==null){
            screen.innerText=prev+' '+ operator + ' '+curr;
        }else{
        screen.innerText = curr;
        }
    } else if (prev !== '' && operator !== null) {
        screen.innerText = prev + ' ' + operator;
    } else if (prev !== '') {
        screen.innerText = prev;
    } else {
        screen.innerText = '0';
    }
   
};
const handleDel=()=>{
    /*The error i waas getting was bcoz i had initialised del as an operator, coz of which when i entered del
    for case 1: 856 then del, 1st 856 was assigned to prev then the digits were deleted. i mean del was deleted
    being considered as an op.
    for case 2: 856+ everything was good and is good. coz when you enter 2 op after one another, the last one
    is considered.
    for case 3: 856+968 then del, its like u entered 2 operators so 1st the 1st 2 numbers undergo operation,
     and then the result takes up the other operator.that's it. look i am sharper than chatgpt.*/
    if (curr !=='' && curr!=='0') {  
        
        curr = curr.slice(0, -1);  //remove last digit
        if (curr === '') {  
            curr = '0';
        }
    }else if (operator !== null && prev!==''&&(curr===''||curr==='0')){
        operator = null; 
    }else if(operator===null&&prev!==''){
        prev = prev.toString().slice(0, -1);  
        if (prev === '') {
            prev = '0';  
        }
    }

    display();
};
const trigCalc=(functionName)=>{
    let result; 

    const numMatch = curr.match(/([a-zA-Z]+)\((.*?)$/);
    console.log(numMatch);

    if(numMatch){
    const currNum=parseFloat(numMatch[2]);
    console.log(`the input is ${currNum}`);

    if(isNaN(currNum)){
        return "ERROR";
    }

    if (functionName === 'sin') {
        result = Math.sin(currNum * Math.PI / 180);  
    } else if (functionName === 'cos') {
        result = Math.cos(currNum * Math.PI / 180); 
    } else if (functionName === 'tan') {
        result = Math.tan(currNum * Math.PI / 180);  
    }else if (functionName === 'asin') {
        result = Math.asin(currNum) * 180 / Math.PI;
    } else if (functionName === 'acos') {
        result = Math.acos(currNum) * 180 / Math.PI;  
    } else if (functionName === 'atan') {
        result = Math.atan(currNum) * 180 / Math.PI;  
    }else if (functionName=== 'sqrt'){
        if (currNum < 0) {
            result = "ERROR";  // Handle negative square root
        } else {
            result = Math.sqrt(currNum);
        }
    }else if (functionName === '1/x'){
        if (currNum === 0) {
            result = "ERROR";  // Handle division by zero
        } else {
            result = 1 / currNum;  
        }
    }else if (functionName === 'log'){
        if(currNum <= 0){
            result="ERROR";
        } else {
        result=Math.log10(currNum);
        }
    }else if (functionName === 'ln'){
        if(currNum <= 0){
            result="ERROR";
        } else {
        result=Math.log(currNum);
        }
    }else if(functionName === 'cbrt'){
        result=Math.cbrt(currNum);
    }

    
       
console.log(result);
    curr=result;
    console.log(curr);
    display();
}else{
    return "ERROR";
}
 
};
const handleBracket=()=>{
    if(curr==''||!curr.includes('(')){
        curr+='(';
    }else if(curr.includes('(')){
        curr+=')';

    }
    display();
};
const parenthesis=()=>{

};








buttons.forEach((btn)=>{
    btn.addEventListener("mouseover",()=>{
    btn.classList.add("onhover");
    });
    btn.addEventListener("mouseleave",()=>{
        btn.classList.remove("onhover");
    });
})

barBtn.forEach((btn)=>{
    btn.addEventListener("mouseover",()=>{
    btn.classList.add("onhover");
    });
    btn.addEventListener("mouseleave",()=>{
        btn.classList.remove("onhover");
    });
})

screen.addEventListener("mouseover",()=>{
    screen.style.cursor="text";
});

numBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        handleNum(btn.innerText);
       
       
    });
})
opBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        handleOperator(btn.innerText);
    });
})
trigBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        handleTrig(btn.innerText);
    });
})
equal.addEventListener("click",()=>{
    calculate();
    // display();
});
clearBtn.addEventListener("click",clear);
delBtn.addEventListener("click",()=>{
    handleDel();
    
});
togglBtn.addEventListener("click",()=>{
    handleNegative();
});

bracket.addEventListener("click",handleBracket);
mR.addEventListener("click",()=>{
    mRecall();
    console.log(`memory recalled: ${memValue}`);
    console.log(`curr is ${curr}`)
});
mp.addEventListener("click",()=>{
    mAdd();
    console.log(`memory added: ${memValue}`);
    history();
});
mm.addEventListener("click",()=>{
    mDel();
    console.log(`memory subtracted: ${memValue}`);
    history();
});
mc.addEventListener("click",()=>{
    mClear();
    console.log(`memory cleared: ${memValue}`);
    history();
});
m.addEventListener("click",()=>{
    if(!isOpen){
    box1.classList.add("mem");
    isOpen=true;
    }else{
        box1.classList.remove("mem");
        isOpen=false;
    }
});






