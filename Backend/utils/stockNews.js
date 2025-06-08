import finnhub from "finnhub";
import "dotenv/config";

const connectNews = (category = "general") => {
  return new Promise((resolve, reject) => {
    try {
      const api_key = finnhub.ApiClient.instance.authentications["api_key"];
      api_key.apiKey = process.env.FINHUB_API_KEY;

      const finnhubClient = new finnhub.DefaultApi();

      finnhubClient.marketNews(category, {}, (error, data, response) => {
        if (error) {
          console.log("Finnhub error:", error);
          reject(error);
        } else {
          console.log("Fetched news: ", data);
          resolve(data);
        }
      });
    } catch (error) {
      console.log("Error in connectNews:", error);
      reject(error);
    }
  });
};

export default connectNews;
