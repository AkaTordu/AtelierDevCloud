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


import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
 
export default async function handler(req, res) {
    const { idMovie } = req.query;
    const client = await clientPromise;
    const db = client.db('sample_mflix');
 
    switch (req.method) {
        case 'GET':
            try {
                const movie = await db.collection('movies').findOne({ _id: new ObjectId(idMovie) });
                if (!movie) return res.status(404).json({ message: 'Movie not found' });
                res.status(200).json(movie);
            }   catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
 
        case 'POST':
            const { title, year } = req.body;
            try {
                const result = await db.collection('movies').insertOne({ title, year });
                res.status(201).json(result.ops[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
 
        case 'PUT':
            try {
                const { title: newTitle } = req.body;
                const result = await db.collection('movies').updateOne({ _id: new ObjectId(idMovie) }, { $set: { title: newTitle } });
                if (result.matchedCount === 0) return res.status(404).json({ message: 'Movie not found' });
                res.status(200).json({ message: 'Movie updated' });
            }   catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
 
        case 'DELETE':
            try {
                const result = await db.collection('movies').deleteOne({ _id: new ObjectId(idMovie) });
                if (result.deletedCount === 0) return res.status(404).json({ message: 'Movie not found' });
                res.status(200).json({ message: 'Movie deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
 
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 