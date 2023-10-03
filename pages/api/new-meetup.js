// /api/new-meetup
// POST /api/new-meetup
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://volkanturhan:lBHioveRsUVPYUWC@cluster0.n3lemgu.mongodb.net/meetups?retryWrites=true&w=majority&appName=AtlasApp"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "meetup inserted!" });
    //store them to database
  }
}
export default handler;
