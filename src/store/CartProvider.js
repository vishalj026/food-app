import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};
const cartReducer = (state, action) => {
    if(action.type === "ADD") {
        //console.log(updatedItems);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItem;
        let updatedItems;

        if(existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItem = {...action.item};
            updatedItems = state.items.concat(updatedItem);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    else if(action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item)
        const existingCartItem = state.items[existingCartItemIndex];
        //console.log(action.id, existingCartItemIndex, existingCartItem);
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;

        if(existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.item)
        }
        else {
            let updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    return defaultCartState;
}

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCart = item => {
        dispatchCartAction({type: "ADD", item: item});
    }

    const removeItemFromCart = id => {
        dispatchCartAction({type: "REMOVE", item: id});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;