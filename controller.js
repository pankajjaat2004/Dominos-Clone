import { apiCall } from "./api-client.js";
import cartOperations from "./cart-service.js";

window.addEventListener('load',loadPizzasJson);

async function loadPizzasJson(){
    const URL = 'https://raw.githubusercontent.com/pankajjaat2004/Dominos-pizza-json/main/pizza.json';
    try{
        const response = await apiCall(URL);
        const responseJson = await response.json();
        loadpizza(responseJson);
        console.log('json fetched.',responseJson);
    }
    catch(error){
        console.log('json invalid- ',error);
    }

}

var arr=['Recommended','NewLaunches','VegPizza','GourmetPizza','NonVegPizza','Beverages','GarlicBread','PizzaMania','ValueCombos','Desserts','CheeseBurstPizza','SpicyPizza'];

// loadPizzasJson();

function loadpizza(Pizzas){

    cartOperations.pizzas = Pizzas;
    console.log(cartOperations.pizzas);
    // cartOperations.pizzas += Pizzas[arr[1]];


    for(let i=0;i<arr.length;i++){
        // console.log('Element ',i,'is- ',arr[i]);
    

        for(let j = 0 ; j<Pizzas[arr[i]].length; j++){

            printPizza(Pizzas[arr[i]][j],arr[i]);
        }
    }    
}

function printPizza(pizza,location){

    

    const ColDiv=document.createElement('div');
    ColDiv.className='col';

    const CardDiv=document.createElement('div');
    CardDiv.className='card';

    const CardHeaderDiv=document.createElement('div');
    CardHeaderDiv.className='card-header';

    const CardHeaderImg=document.createElement('img');
    CardHeaderImg.src=pizza.assets.menu[0].url;

    CardHeaderDiv.appendChild(CardHeaderImg);

    const CardContentDiv=document.createElement('div');
    CardContentDiv.className='card-content';

    const CardContenth4=document.createElement('h4');
    CardContenth4.innerText=pizza.name;

    const CardContentp=document.createElement('p');
    CardContentp.innerText=pizza['menu_description'];

    CardContentDiv.appendChild(CardContenth4);
    CardContentDiv.appendChild(CardContentp);

    const CardActionDiv=document.createElement('div');
    CardActionDiv.className='card-action';

    const FlexDiv=document.createElement('div');
    FlexDiv.className='flex';

    const Span1Flex1=document.createElement('span');

    const Label1Flex1=document.createElement('label');
    Label1Flex1.innerText='Size';

    const Div1=document.createElement('div');
     
    const Div1Select1=document.createElement('select');

    const Option1=document.createElement('option');
    Option1.value='Regular';
    Option1.innerText='Regular';

    const Option2=document.createElement('option');
    Option2.value='Medium';
    Option2.innerText='Medium';
    
    const Option3=document.createElement('option');
    Option3.value='Large';
    Option3.innerText='Large';

    Div1Select1.appendChild(Option1);
    Div1Select1.appendChild(Option2);
    Div1Select1.appendChild(Option3);

    Div1.appendChild(Div1Select1);

    Span1Flex1.appendChild(Label1Flex1);
    Span1Flex1.appendChild(Div1);

    const Span2Flex1=document.createElement('span');

    const Label2Flex1=document.createElement('label');
    Label2Flex1.innerText='Crust';

    const Div2=document.createElement('div');
     
    const Div2Select2=document.createElement('select');

    const Option11=document.createElement('option');
    Option11.value='New Hand Tossed';
    Option11.innerText='New Hand Tossed';

    const Option12=document.createElement('option');
    Option12.value='100% Wheat Thin Crust';
    Option12.innerText='100% Wheat Thin Crust';
    
    const Option13=document.createElement('option');
    Option13.value='Cheese Burst';
    Option13.innerText='Cheese Burst';

    const Option14=document.createElement('option');
    Option14.value='Fresh Pan Pizza';
    Option14.innerText='Fresh Pan Pizza';

    Div2Select2.appendChild(Option11);
    Div2Select2.appendChild(Option12);
    Div2Select2.appendChild(Option13);
    Div2Select2.appendChild(Option14);

    Div2.appendChild(Div2Select2);

    Span2Flex1.appendChild(Label2Flex1);
    Span2Flex1.appendChild(Div2);

    FlexDiv.appendChild(Span1Flex1);
    FlexDiv.appendChild(Span2Flex1);

    CardActionDiv.appendChild(FlexDiv);
    
    const CardCartDiv=document.createElement('div');
    CardCartDiv.className='card-cart';

    const CardCartSpan=document.createElement('span');
    CardCartSpan.innerText='Rs/- '+pizza.price;
    
    const CardCartButton=document.createElement('button');
    CardCartButton.innerText='Add To Cart';
    CardCartButton.setAttribute('pizza-id',pizza.id);

    CardCartButton.setAttribute('location-id',location);

    CardCartButton.addEventListener('click', addToCart);

    CardCartDiv.appendChild(CardCartSpan);
    CardCartDiv.appendChild(CardCartButton);

    CardDiv.appendChild(CardHeaderDiv);
    CardDiv.appendChild(CardContentDiv);
    CardDiv.appendChild(CardActionDiv);
    CardDiv.appendChild(CardCartDiv);

    ColDiv.appendChild(CardDiv);

    const printPizzzas=document.getElementById(location);

    printPizzzas.appendChild(ColDiv);

}

function addToCart(){
    const pizzaId = this.getAttribute('pizza-id');

    const locationId = this.getAttribute('location-id');

    cartOperations.addInCart(pizzaId,locationId);
    
    printCart();
    printBill(); 
}

function printCart(){
    const pizzasInCart = cartOperations.viewAll();
    console.log(cartOperations.viewAll());
    document.getElementById('orderList').innerHTML = '';
    pizzasInCart.forEach(p=>printCartItem(p));

}

var Increment_DecrementButtons='';

function printCartItem(pizza){

    const CartItemDiv=document.createElement('div');
    CartItemDiv.classList='card-item';

    const PizzaDetailDiv=document.createElement('div');
    PizzaDetailDiv.className='pizza-detail';

    const ItemImgDiv=document.createElement('div');
    ItemImgDiv.className='item-img';

    const ItemImgImg=document.createElement('img');
    ItemImgImg.src=pizza.assets.menu[0].url;

    ItemImgDiv.appendChild(ItemImgImg);

    const ItemDetailsDiv=document.createElement('div');
    ItemDetailsDiv.className='item-details';

    const ItemDetailsh4=document.createElement('h4');
    ItemDetailsh4.innerText=pizza.name;

    const ItemDetailsp=document.createElement('p');
    ItemDetailsp.innerText=pizza['menu_description'];

    ItemDetailsDiv.appendChild(ItemDetailsh4);
    ItemDetailsDiv.appendChild(ItemDetailsp);

    PizzaDetailDiv.appendChild(ItemImgDiv);
    PizzaDetailDiv.appendChild(ItemDetailsDiv);

    const SizeCrustDiv=document.createElement('div');
    SizeCrustDiv.className='size-crust';

    const SizeSpan=document.createElement('span');
    SizeSpan.innerText='Regular';

    const SeperateSpan=document.createElement('span');
    SeperateSpan.innerText='|';

    const CrustSpan=document.createElement('span');
    CrustSpan.innerText='New Hand Tossed';

    SizeCrustDiv.appendChild(SizeSpan);
    SizeCrustDiv.appendChild(SeperateSpan);
    SizeCrustDiv.appendChild(CrustSpan);

    const ItemDescriptionDiv=document.createElement('div');
    ItemDescriptionDiv.className='item-description';

    const ItemQuantityDiv=document.createElement('div');
    ItemQuantityDiv.className='item-quantity';

    const DecrementButton=document.createElement('button');
    DecrementButton.className='Quantity_Changer';
    DecrementButton.innerText='-';

    const QuantitySpan=document.createElement('span');
    QuantitySpan.className='Quantity';
    QuantitySpan.innerText='1';

    const IncrementButton=document.createElement('button');
    IncrementButton.className='Quantity_Changer';
    IncrementButton.innerText='+';

    ItemQuantityDiv.appendChild(DecrementButton);
    ItemQuantityDiv.appendChild(QuantitySpan);
    ItemQuantityDiv.appendChild(IncrementButton);

    const ItemPriceDiv=document.createElement('div');
    ItemPriceDiv.className='item-price';

    const ItemPriceSpan=document.createElement('span');
    ItemPriceSpan.innerText='Rs/- '+pizza.price;

    ItemPriceDiv.appendChild(ItemPriceSpan);

    ItemDescriptionDiv.appendChild(ItemQuantityDiv);
    ItemDescriptionDiv.appendChild(ItemPriceDiv);

    CartItemDiv.appendChild(PizzaDetailDiv);
    CartItemDiv.appendChild(SizeCrustDiv);
    CartItemDiv.appendChild(ItemDescriptionDiv);
    
    document.getElementById('orderList').appendChild(CartItemDiv);
    
    Increment_DecrementButtons=document.getElementsByClassName('Quantity_Changer');
    
    buttonEventListen();


}

function buttonEventListen(){
    for(let i=0;i<Increment_DecrementButtons.length;i++){
        Increment_DecrementButtons[i].addEventListener('click',IncrementDecrement);
    
    }
}

function IncrementDecrement(){

    var SpanValue=this.parentNode.getElementsByClassName('Quantity')[0];

    if(SpanValue.innerText>0){

        if(this.innerText=='+'){
            let valuee = eval(SpanValue.innerText+'+'+'1');
            SpanValue.innerText = valuee;
        }

        if(this.innerText=='-'){
            let valuee = eval(SpanValue.innerText+'-'+'1');
            SpanValue.innerText = valuee;
        }
    }
    if(SpanValue.innerText==0){
        var a=SpanValue.parentNode;
        var b=a.parentNode;
        // b.isInCart=false;
        (b).parentNode.remove();
        
        // printBill();

    }
}

function printBill(){
    const pizzasInCart = cartOperations.viewAll();
    document.getElementById('bill').innerHTML = '';

    document.getElementById('bill').appendChild(printTotal(pizzasInCart));
}

function printTotal(pizzasInCart){

    const total = pizzasInCart.reduce((acc, pizza)=>acc + parseFloat(pizza.price), 0).toFixed(2);

    const discount=(total*0.1).toFixed(2);

    const gst = (total*0.18).toFixed(2);
    const totalgst=eval(total+'+44+'+gst).toFixed(3);

    const pTag = document.createElement('p');
    pTag.innerText='Bill: '+total+'\n'+ 'Discount 10%:- '+discount+'\n\n'+ 'Additional Charges: '+'\n\n'+ '18% GST: '+gst+'\n'+ 'Delivery Chargrs: '+'44'+'\n\n\n'+ 'Total Bill: '+totalgst;
    
    return pTag;
}

