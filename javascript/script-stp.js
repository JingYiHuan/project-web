let shop = document.getElementById("shop")
let cartAmount = document.getElementById("cart-amount")

let basket = JSON.parse(localStorage.getItem("data")) || [];



let genershop = () => {
    return (shop.innerHTML = shopItemData
        .map((x) => {
            let { id, name, price, decs, img } = x;
            let search = basket.find((x)=> x.id === id) || [];
            return `
    <div id="product-id-${id}" class="item">
        <img width="218" src=${img} alt="cookies">
        <div class="detail">
            <h3>${name}</h3>
            <p>${decs}</p>
            <div class="price-quantity">
                <h2>NT$ ${price}</h2>
                <div class="buttons">
                    <i class="bi bi-dash" onclick="decrement(${id})"></i>
                    <div id="${id}" class="quantity">
                    ${search.item === undefined? 0: search.item}
                    </div>
                    <i class="bi bi-plus" onclick="increment(${id})"></i>
                </div>
            </div>    
        </div>
    </div>
    `;
    }).join(" "));
}

genershop()

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
    localStorage.setItem("data",JSON.stringify(basket));
    // console.log(basket);
};
let update = (id) =>{
    let search = basket.find((x)=> x.id === id );
    document.getElementById(id).innerHTML = search.item 
    
    
    calculation()
    localStorage.setItem("data",JSON.stringify(basket));
};

let calculation = () =>{
    cartAmount.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y,0)
    /* x => previous number , y => next number , 0 => default number */
}

calculation();