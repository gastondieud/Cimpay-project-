# Cimpay - Plateforme de Paiement en Ligne

## Description du Projet 

Cimpay est une plateforme de paiement en ligne sécurisée conçue pour faciliter les transactions électroniques pour les entreprises et les particuliers. Cette application offre une API robuste pour l'intégration des paiements, la gestion des utilisateurs, des produits et des commandes.

## Fonctionnalités Principales

1. Authentification des utilisateurs
   - Inscription et connexion sécurisées
   - Gestion des tokens JWT pour l'authentification

2. Gestion des produits
   - Ajout, modification, suppression et listage des produits
   - Catégorisation des produits

3. Traitement des paiements
   - Intégration avec Stripe pour des paiements sécurisés
   - Création d'intentions de paiement
   - Gestion des succès et annulations de paiement

4. Gestion des commandes
   - Création de nouvelles commandes
   - Suivi du statut des commandes
   - Historique des commandes par utilisateur

5. API RESTful
   - Endpoints bien définis pour toutes les fonctionnalités
   - Pagination pour les listes de produits et commandes

## Architecture Technique

- Backend : Node.js avec Express.js
- Base de données : MongoDB avec Mongoose ODM
- Authentification : JSON Web Tokens (JWT)
- Paiements : Intégration Stripe
- Middleware : 
  - CORS pour la sécurité cross-origin
  - Morgan pour le logging
  - Express.json et urlencoded pour le parsing des requêtes

## Structure du Projet
cimpay/
│
├── server/
│ ├── server.js # Point d'entrée de l'application
│ ├── routes/
│ │ ├── index.js # Routeur principal
│ │ ├── authRoutes.js # Routes d'authentification
│ │ ├── paymentRoutes.js # Routes de paiement
│ │ ├── productRoutes.js # Routes de gestion des produits
│ │ └── orderRoutes.js # Routes de gestion des commandes
│ ├── models/
│ │ ├── User.js # Modèle utilisateur
│ │ ├── Product.js # Modèle produit
│ │ ├── Order.js # Modèle commande
│ │ └── Counter.js # Modèle pour les compteurs auto-incrémentés
│ ├── middleware/
│ │ └── auth.js # Middleware d'authentification
│ ├── utils/
│ │ ├── counter.js # Utilitaire pour l'auto-incrémentation des IDs
│ │ └── initCounters.js # Initialisation des compteurs
│ ├── controllers/ # (Optionnel) Logique métier
│ └── config/ # Fichiers de configuration
│
├── .env # Variables d'environnement
├── package.json
└── README.md # Documentation du projet

## Endpoints API

### Authentification
- POST /api/auth/register : Inscription d'un nouvel utilisateur
- POST /api/auth/login : Connexion d'un utilisateur existant

### Produits
- GET /api/products : Liste de tous les produits (avec pagination)
- POST /api/products : Ajout d'un nouveau produit
- GET /api/products/:id : Détails d'un produit spécifique
- PUT /api/products/:id : Mise à jour d'un produit existant
- DELETE /api/products/:id : Suppression d'un produit

### Paiements
- POST /api/payments/create-payment-intent : Création d'une intention de paiement
- GET /api/payments/payment-success : Gestion du succès du paiement
- GET /api/payments/payment-cancel : Gestion de l'annulation du paiement

### Commandes (à implémenter)
- POST /api/orders : Création d'une nouvelle commande
- GET /api/orders : Liste des commandes de l'utilisateur connecté
- GET /api/orders/:id : Détails d'une commande spécifique

## Nouveautés et Mises à Jour

1. Auto-incrémentation des IDs
   - Les modèles User, Product et Order utilisent maintenant des IDs numériques auto-incrémentés.
   - Un nouveau modèle Counter a été ajouté pour gérer les séquences d'IDs.

2. Utilitaires
   - Ajout de utils/counter.js pour gérer l'auto-incrémentation des IDs.
   - Ajout de utils/initCounters.js pour initialiser les compteurs au démarrage du serveur.

3. Modifications des Modèles
   - Les schémas User, Product et Order ont été mis à jour pour utiliser les nouveaux IDs numériques.

4. Sécurité
   - Tous les endpoints, à l'exception de /api/auth/register et /api/auth/login, nécessitent un token JWT valide dans l'en-tête Authorization de la requête.

## Notes pour les Développeurs

- Assurez-vous d'initialiser les compteurs au démarrage du serveur en appelant la fonction d'initialisation depuis server.js.
- Lors de la création de nouveaux documents, les IDs seront automatiquement générés et incrémentés.
- Veillez à mettre à jour toutes les références aux IDs dans le code existant pour refléter le nouveau format numérique.

## Modèles de Données

### Payment
- _id: Number (auto-incrémenté)
- orderId: Number (référence à Order)
- userId: Number (référence à User)
- amount: Number
- status: String (enum: ['completed', 'pending', 'failed'])
- transactionId: String
- timestamps: true

Note: Les IDs des paiements sont maintenant des nombres auto-incrémentés, cohérents avec les autres modèles du système.
