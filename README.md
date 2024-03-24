# 🎬 MFLIX API

Le projet MFLIX est une API RESTful conçue pour fournir des informations cinématographiques, similaire à Allociné. Cette API permet de récupérer des données sur les films et les commentaires associés, offrant une expérience riche pour les utilisateurs de la plateforme.

## 🛠 Installation

Pour mettre en place et exécuter cette API localement, suivez ces étapes :

1. **Cloner le Répertoire**
    ```bash
    git clone https://github.com/AkaTordu/AtelierDevCloud.git
    ```

2. **Installer les Dépendances**
    Assurez-vous que [Node.js](https://nodejs.org/) est installé sur votre système.
    ```bash
    npm install
    ```

3. **Configurer les Variables d'Environnement**
    Dupliquez le fichier `.env.example` en `.env.local` et remplissez-le avec vos propres valeurs pour la base de données MongoDB.
    ```plaintext
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-address>/sample_mflix?retryWrites=true&w=majority
    ```

4. **Lancer l'Application**
    ```bash
    npm run dev
    ```
    Votre API est maintenant accessible sur [http://localhost:3000](http://localhost:3000).

## 📚 Stack Technologique

- **Framework :** Next.js
- **Base de Données :** MongoDB Atlas
- **Documentation API :** Swagger UI

## 🏗 Conception

L'API suit les principes REST pour faciliter son intégration et son utilisation. Elle est conçue autour de ressources claires (films et commentaires) et utilise les méthodes HTTP standards (GET, POST, PUT, DELETE) pour les opérations CRUD.

### Endpoints

- **Films**
    - `GET /api/movies` : Récupère une liste de films.
    - `GET /api/movie/{idMovie}` : Récupère les détails d'un film spécifique.
    - `POST /api/movie/{idMovie}` : Ajoute un nouveau film.
    - `PUT /api/movie/{idMovie}` : Modifie les détails d'un film existant.
    - `DELETE /api/movie/{idMovie}` : Supprime un film.

- **Commentaires**
    - `GET /api/movie/comments` : Récupère tous les commentaires liés à un film.
    - `GET /api/movie/comment/{idComment}` : Récupère un commentaire spécifique.
    - `POST /api/movie/comment/{idComment}` : Ajoute un commentaire à un film.
    - `PUT /api/movie/comment/{idComment}` : Modifie un commentaire existant.
    - `DELETE /api/movie/comment/{idComment}` : Supprime un commentaire.

### Documentation API

Pour une documentation complète et interactive de l'API, visitez `/swagger` sur votre instance locale. Cela vous permettra de voir tous les endpoints disponibles, leurs paramètres, et de tester directement les requêtes via Swagger UI.