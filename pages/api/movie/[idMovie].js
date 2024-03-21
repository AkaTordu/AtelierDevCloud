 // pages/api/movie/[idMovie].js 

 /**
 * @swagger
 * /api/movie/{idMovie}:
 *   get:
 *     summary: Récupérer un film par son ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID du film à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Un film.
 *   post:
 *     summary: Ajouter un film
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               year:
 *                 type: integer
 *                 example: 2010
 *     responses:
 *       201:
 *         description: Film ajouté.
 *   put:
 *     summary: Modifier un film par son ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID du film à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception 2
 *     responses:
 *       200:
 *         description: Film modifié.
 *   delete:
 *     summary: Supprimer un film par son ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID du film à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Film supprimé.
 */


 export default async function handler(req, res) { 
    const { idMovie } = req.query   
    const dbMovie = await db.collection("movies").findOne({ _id : idMovie }).toArray(); 
    res.json({ status: 200, data: {movie: dbMovie} }); 
}