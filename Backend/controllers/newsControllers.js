import connectNews from "../utils/stockNews.js";

const getNews = async (req,res) => {
    try {
        const news = await connectNews("general")
        res.json({ success: true, news });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to fetch news", error: error.message });
        
    }
}


export default getNews;