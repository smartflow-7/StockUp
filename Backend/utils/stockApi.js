
import "dotenv/config";
import finnhub from "finnhub";

const connectFinnhub = (symbol) => {
  return new Promise((resolve, reject) => {
    try {
      const api_key = finnhub.ApiClient.instance.authentications["api_key"];
      api_key.apiKey = process.env.FINHUB_API_KEY;

      const finnhubClient = new finnhub.DefaultApi();

      finnhubClient.quote(symbol, (error, data, response) => {
        if (error) {
          console.log("Finnhub error:", error);
          reject(error);
        } else {
          console.log("quotes: ", data);
          resolve(data); 
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default connectFinnhub;
