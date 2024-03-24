/**
 * @swagger
 * /api/movie/comment/{idComment}:
 *   get:
 *     summary: Récupérer un commentaire par son ID
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         description: ID du commentaire à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Un commentaire.
 *   post:
 *     summary: Ajouter un commentaire à un film
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *                 description: L'ID du film auquel le commentaire est ajouté
 *                 example: "507f1f77bcf86cd799439011"
 *               comment:
 *                 type: string
 *                 description: Le contenu du commentaire
 *                 example: "Ce film est fantastique !"
 *     responses:
 *       201:
 *         description: Commentaire ajouté.
 *   put:
 *     summary: Modifier un commentaire par son ID
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         description: ID du commentaire à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: Le nouveau contenu du commentaire
 *                 example: "En fait, après réflexion, c'est mon film préféré !"
 *     responses:
 *       200:
 *         description: Commentaire modifié.
 *   delete:
 *     summary: Supprimer un commentaire par son ID
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         description: ID du commentaire à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire supprimé.
 */

import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { idComment } = req.query;
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const collection = db.collection("comments");

  switch (req.method) {
    case "GET":
      try {
        const comment = await collection.findOne({ _id: new ObjectId(idComment) });
        if (!comment) return res.status(404).json({ error: "Comment not found" });
        res.status(200).json(comment);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
      case 'POST':
        try {
            const { movieId, text } = req.body; 
            const newComment = { movieId: new ObjectId(movieId), text, date: new Date() };
            const result = await db.collection('comments').insertOne(newComment);
            res.status(201).json({ message: 'Comment added', data: result.ops[0] });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        break;
    case "PUT":
      try {
        const { text } = req.body; 
        const result = await collection.updateOne(
          { _id: new ObjectId(idComment) },
          { $set: { text: text } }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: "Comment not found" });
        res.status(200).json({ message: "Comment updated" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const result = await collection.deleteOne({ _id: new ObjectId(idComment) });
        if (result.deletedCount === 0) return res.status(404).json({ error: "Comment not found" });
        res.status(200).json({ message: "Comment deleted" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
