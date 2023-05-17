import axios from "axios";
import { createContext, useState } from "react";

export const categoriesStore = createContext()



export default function CatgoriesStoreProvider({children}) {


    const [loading, setLoading] = useState(false)


    const [proDetails, setproDetails] = useState(null)

    async function getRandomProDetails(id) {

  try {
    setLoading(true)
    const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/products/${id}`)
    console.log(data.product);
    setproDetails(data.product)
setLoading(false)
    
  } catch (error) {
    console.log("error",error);
  }
    }











 return <categoriesStore.Provider value={{getRandomProDetails,proDetails,loading}}>



{children}



 </categoriesStore.Provider>
 
 

}
