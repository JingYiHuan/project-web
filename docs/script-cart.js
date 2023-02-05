let basket = JSON.parse(localStorage.getItem("data")) || [];
let cartAmount = document.getElementById("cart-amount");
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");


let calculation = () =>{
    cartAmount.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y,0)
    /* x => previous number , y => next number , 0 => default number */
}

calculation();

let generateCartItem = () =>{
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket
        .map((x)=>{
            let {id, item}=x;
            let search = shopItemData.find((y)=> y.id===id) || [];
            return `
            <div class="cart-item">
            <img width="500" src=${search.img} alt="">
            <div class="detail">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">NT$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(removeItem(${id}))" class="bi bi-x-lg"></i>
                    </div>

                <div class="buttons">
                    <i class="bi bi-dash" onclick="decrement(${id})"></i>
                    <div id="${id}" class="quantity">${item}</div>
                    <i class="bi bi-plus" onclick="increment(${id})"></i>
                </div>
            <h3>NT$ ${item * search.price}</h3>
            </div>
            </div>
            `
        }).join(" "));
    }else{
        shoppingCart.innerHTML = ``;
        label.innerHTML=`
        <h2>您尚未購買</h2>
        <a href="index-cookies.html">
        <button class="cookiesBtn">回去購物</button>
        </a>
        `;
    };
}
generateCartItem();

let increment = (id) =>{
    let selectItem = id;
    let search = basket.find((x)=>x.id === selectItem.id);
    
    if(search === undefined){
        basket.push({
            id:selectItem.id,
            item:1,
        })
    }else{
        search.item += 1; 
    }
    generateCartItem()
    update(selectItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
};
let decrement = (id) =>{
    let selectItem = id;
    let search = basket.find((x)=> x.id === selectItem.id);
    if(search === undefined)return;
    else if(search.item === 0)return;
    else{
        search.item -= 1;
    }
    update(selectItem.id);
    basket = basket.filter((x)=> x.item !==0);
    generateCartItem();
    totalAmount();
    localStorage.setItem("data",JSON.stringify(basket));
    // console.log(basket);
};
let update = (id) =>{
    let search = basket.find((x)=> x.id === id );
    document.getElementById(id).innerHTML = search.item 
    calculation();
    totalAmount();
};
let removeItem = (id) => {
    let selectItem = id;
    basket = basket.filter((x)=> x.id !== selectItem.id);
    generateCartItem();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let clearCart = () =>{
    basket = [];
    generateCartItem();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let totalAmount = ()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {id, item}= x;
            let search = shopItemData.find((y)=> y.id===id) || [];
            return item * search.price
        }).reduce((x,y)=> x+y, 0);
        label.innerHTML = `
        <h2>總額： NT$ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear cart</button>
        `;
    }else return
}
totalAmount();