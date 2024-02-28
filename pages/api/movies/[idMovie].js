 // pages/api/movie/[idMovie].js 
export default async function handler(req, res) { 
    const { idMovie } = req.query   
    const dbMovie = await db.collection("movies").findOne({ _id : idMovie }).toArray(); 
    res.json({ status: 200, data: {movie: dbMovie} }); 
}