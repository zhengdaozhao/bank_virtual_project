import axios from "axios";
import authHeader from '../util/authHeader';

const API_URL = "http://localhost:9200/kafka/";

const getMessages = async () => {
  return await axios.get(API_URL + "consume/sub", { headers: authHeader() });
};

const sendMessage = async (msg) => {
  return await axios.post(API_URL + "produce/pub"+`?message=${msg}`,null,
    { 
      headers: authHeader() 
    });
};

const KafkaService = {
  getMessages,
  sendMessage,
};

export default KafkaService;