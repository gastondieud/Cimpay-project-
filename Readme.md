# Cimpay - Plateforme de Paiement en Ligne
## Description
Cimpay est une plateforme de paiement en ligne sécurisée, conçue pour faciliter les transactions électroniques pour les entreprises et les particuliers. Cette application offre une API robuste pour l'intégration des paiements, la gestion des utilisateurs et des produits.

## Fonctionnalités principales
- Authentification des utilisateurs (inscription, connexion)
- Gestion des produits (ajout, modification, suppression, liste)
- Traitement des paiements via Stripe
- API RESTful pour l'intégration avec des applications frontales

## Prérequis
- Node.js (v14.0.0 ou supérieur)
- MongoDB
- Compte Stripe pour le traitement des paiements

## Installation
1. Cloner le dépôt :
   ```
   git clone https://github.com/votre-username/cimpay.git
   cd cimpay
   ```

2. Installer les dépendances :
   ```
   npm install
   ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :
   ```
   PORT=3001
   MONGODB_URI=votre_uri_mongodb
   JWT_SECRET=votre_secret_jwt
   STRIPE_SECRET_KEY=votre_clé_secrète_stripe
   ```

4. Lancez le serveur :
   ```
   npm start
   ```

## Structure du projet
