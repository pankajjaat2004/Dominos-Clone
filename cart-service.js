const cartOperations = {
    pizzas:[],
addInCart(pizzaId){
    const pizza = this.pizzas.find(currentPizza=>currentPizza.id == pizzaId);
    pizza.isInCart=true;
},

viewAll(){
        
    return this.pizzas.filter(pizza=>pizza.isInCart);
    
}
}
export default cartOperations;
