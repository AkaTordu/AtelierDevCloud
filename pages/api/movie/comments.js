/**
 * @swagger
 * tags:
 *   - name: Commentaires
 *     description: API pour les opérations sur les commentaires.
 */
/**
 * @swagger
 * /api/movie/comments:
 *   get:
 *     tags: [Commentaires]
 *     summary: Récupérer la liste de tous les commentaires liés à un film
 *     responses:
 *       200:
 *         description: Liste de commentaires.
 */
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const comments = await db.collection("comments").find({}).toArray();
  res.status(200).json(comments);
}
