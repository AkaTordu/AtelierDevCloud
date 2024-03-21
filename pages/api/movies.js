// pages/api/movies.js

/** 
* @swagger 
* /api/movies: 
*   
get: 
*     
description: Returns movies 
responses: 
200: 
description: Hello Movies 
*     
*       
*         
*/

import clientPromise from "../../lib/mongodb"; 

export default async function handler(req, res) {
    try {
        const client = await clientPromise; 
        const db = client.db("sample_mflix");

        switch (req.method) {
            case "GET":
                const movies = await db.collection("movies").find({}).limit(10).toArray(); 
                return res.status(200).json({ status: 200, data: movies });
            case "POST":
                const { title, director, year } = req.body;
                if (!title || !director || !year) {
                    return res.status(400).json({ status: 400, message: "Missing required fields" });
                }
                const result = await db.collection("movies").insertOne({ title, director, year });
                return res.status(201).json({ status: 201, message: "Movie added successfully", data: result.ops[0] });
            default:
                res.setHeader("Allow", ["GET", "POST"]);
                return res.status(405).json({ status: 405, message: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}