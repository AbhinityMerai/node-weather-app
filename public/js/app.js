console.log('javascript');


const form = document.querySelector('form');
const loc = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2')



form.addEventListener('submit', (e)=>{
    e.preventDefault();
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+loc.value).then((res)=>{
   res.json().then((data)=>{
       if(data.error){
           msgOne.textContent = data.error;
       }else{
         msgOne.textContent = data.location;
         msgTwo.textContent = data.forecast;
       }
   })
})
})