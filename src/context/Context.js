import {useContext,createContext,useState, useEffect} from 'react'

const cartContext = createContext()


export const CartContextProvider =({children})=>{

    const [cartItems,setCartItems] = useState([])
    console.log(cartItems);

    useEffect(()=>{

    },[])


    return (
        <cartContext.Provider value={[cartItems,setCartItems]}>{children}</cartContext.Provider>
    )

}


export const useCart = () => useContext(cartContext)

