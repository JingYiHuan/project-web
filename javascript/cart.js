let basket = JSON.parse(localStorage.getItem("data")) || [];
let cartAmount = document.getElementById("cart-amount")

let calculation = () =>{
    cartAmount.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y,0)
    /* x => previous number , y => next number , 0 => default number */
}

calculation();

// img

let cookiesImg = document.getElementById("image");
let imgs = ["https://stpcookie.weebly.com/uploads/1/3/6/9/136952794/1962925782_orig.png","https://stpcookie.weebly.com/uploads/1/3/6/9/136952794/2_orig.png"
,"https://stpcookie.weebly.com/uploads/1/3/6/9/136952794/1963366428_orig.png","https://stpcookie.weebly.com/uploads/1/3/6/9/136952794/1_orig.png",
"https://stpcookie.weebly.com/uploads/1/3/6/9/136952794/3_orig.png"]
setInterval(function(){
    let random = Math.floor(Math.random()*5);
    cookiesImg.src = imgs[random];
},800);