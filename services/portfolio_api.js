import Axios from 'axios'
import qs from "qs";

const fetchPortfolio = async (path , urlParamsObject ) => {

    const queryString = qs.stringify(urlParamsObject );
    //const url = `http://localhost:1337/${path}${queryString ? `?${queryString}` : ""}`
    const url = `https://auto-land.herokuapp.com/${path}${queryString ? `?${queryString}` : ""}`
    const res = await Axios.get(url)
    return res.data
}

export default fetchPortfolio
  
//export {fetchPortfolio , postPortfolio}