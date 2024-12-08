import { useRef, useState } from "react";
import { postData } from "../../../fuctions";
import { useMutation } from "@tanstack/react-query";

export default function Post(props) {
    const { data, mutate:addToCart, isSuccess } = useMutation({
        mutationFn: (data) => postData("", data)
    });

    function handleAddToCart(e) {
        e.preventDefault();
        const data = {"product": 1}
        
        addToCart(data);
    }
    if (isSuccess) console.log("SUCCESS")

    return <div>
        <form onSubmit={handleAddToCart}>
            <input 
                type="text"
                name="quantity"
            />
            <button>add to cart</button>
        </form>
    </div>
}