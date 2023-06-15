import axios from "axios";

const findCEP = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})

export default findCEP;