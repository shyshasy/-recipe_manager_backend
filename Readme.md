# Recipe Manager Backend

Cette API permet de gérer des recettes de cuisine, incluant la création, la lecture, la mise à jour et la suppression des recettes (opérations CRUD). L'API utilise une base de données MySQL pour stocker les recettes, et inclut des validations des données grâce à express-validator.

## Prérequis

- Node.js (version 14+ recommandée)
- MySQL (version 5.7+)

# Installation

1. Cloner le projet :

```bash
git clone https://github.com/shyshasy/-recipe_manager_backend.git
```

```bash
cd recipe_manager_backend
```

2. Installer les dépendances :

```bash
npm install
```

3. Configurer la base de données :

4. Suivez les étapes ci-dessous pour configurer et exécuter le projet en local :

- Renommer le fichier de configuration Repérez le fichier nommé .env.example à la racine du projet et renommez-le en env.

Mise à jour des informations de connexion Ouvrez le fichier .env et mettez à jour les informations de connexion à la base de données avec vos propres paramètres. Voici un exemple des configurations à adapter :

`DB_HOST=localhost `
`DB_USER=your_username`
` DB_PASSWORD=your_password` 
`DB_NAME=gestion_recettes`


4. Initialiser la base de données :

- Créez une base de données MySQL et assurez-vous que la table recipes existe avec la structure suivante :

```bash
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  ingredients TEXT NOT NULL,
  type TEXT NOT NULL,
  id_categorie INT,  
  FOREIGN KEY (id_categorie) REFERENCES categories(categorie_id)  
);
```

5. Démarrer le serveur :

```bash
npm start
```

## Endpoints de l'API

1. Récupérer toutes les recettes

- URL : /recipes
- Méthode : GET
- Description : Renvoie la liste de toutes les recettes.
- Exemple de réponse :

[
{
"id": 1,
"title": "Lasagnes",
"type": "dessert",
"ingredients": "sel"
},
{
"id": 2,
"title": "Lasagnes",
"type": "dessert",
"ingredients": "sel"
}
]

2. Récupérer une recette par ID

- URL : /recipes/:id
- Méthode : GET
- Paramètres : id (Requis, entier)
- Description : Renvoie une recette spécifique par son ID.
- Exemple de réponse :
  {
  "id": 1,
  "title": "Lasagnes",
"type": "dessert",
"ingredients": "sel"
  }

3. Créer une nouvelle recette

- URL : /recipes
- Méthode : POST
- Corps :
  {
  "title": "Lasagnes",
  "type": "dessert",
  "ingredients": "sel"
  "id_categorie" : "6"
  }

4.  Mettre à jour une recette

- URL : /recipes/:id
- Méthode : PUT
- Paramètres : id (Requis, entier)
- Corps :

{
"title": "Lasagnes",
"type": "dessert",
"ingredients": "lait"
"id_categorie" : "6"
}

- Exemple de réponse :

{
"message": "Recipe updated successfully"
}

5. Supprimer une recette

- URL : /recipes/:id
- Méthode : DELETE
- Paramètres : id (Requis, entier)
- Description : Supprime une recette spécifique par son ID.
- Exemple de réponse :

{
"message": "Recipe deleted successfully"
}

### Codes de Statut HTTP

- 200 OK : La requête a été traitée avec succès.
- 201 Created : Une nouvelle ressource a été créée.
- 400 Bad Request : Les données fournies ne sont pas valides.
- 404 Not Found : La ressource demandée n'a pas été trouvée.
- 500 Internal Server Error : Une erreur serveur est survenue.

## Lancer l'application

```bash
npm start
```

## Les étapes pour construire et lancer le conteneur Docker:

```bash
docker compose up --build
```

```bash
docker exec -it gestion_recettes mysql -u root -p
```

## Execusion des tests unitaire

```bash
npm test
```

# Auteurs

[Aichetou Taher Sy ](https://github.com/shyshasy)
