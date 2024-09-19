const base_Url = "https://v6.exchangerate-api.com/v6/78a35e0f243fd5f556171125/pair";
const dropdowns = document.querySelectorAll(".dropdown select");
const form = document.querySelector('form');
const amount = document.querySelector('.amount input');
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");


for(const select of dropdowns){
  for ( currencyCode in countryList) {
        const newOption = document.createElement("option");
          newOption.value = currencyCode;
          newOption.innerText = currencyCode;
          if(select.name === "from" && currencyCode === "USD"){
            newOption.selected = "selected";
          }else if(select.name === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
          }
            select.append(newOption);
      }

      select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
      }
    )};

    const updateFlag = (element) => {
         currencyCode = element.value;
         countryCode = countryList[currencyCode];
         let img = element.parentElement.querySelector("img");
         let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
         img.src = newSrc;
    }

const updateRate = async () => {
  let amtVal = amount.value;
    if(amtVal < 1 || amtVal === ""){
      amtVal = 1;
      amount.value ="1";
    }

    // console.log(fromCurr.value,toCurr.value);
    const URL = `${base_Url}/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rate;
    // console.log(rate);

    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

window.addEventListener("load",() => {
  updateRate();
})

btn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    updateRate();
});


