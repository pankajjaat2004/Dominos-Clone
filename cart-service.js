var arr=['Recommended','NewLaunches','VegPizza','GourmetPizza','NonVegPizza','Beverages','GarlicBread','PizzaMania','ValueCombos','Desserts','CheeseBurstPizza','SpicyPizza'];

const cartOperations = {
    pizzas:[],
addInCart(pizzaId,locationId){
    // console.log(pizzas);

    const pizza = this.pizzas[locationId].find(currentPizza=>currentPizza.id == pizzaId);
    pizza.isInCart=true;
    console.log(pizza);
},

viewAll(){
    // for(let i=0;i<arr.length;i++){
        
    return this.pizzas[arr[0]].filter(pizza=>pizza.isInCart);
    // }
    
}
}
export default cartOperations;