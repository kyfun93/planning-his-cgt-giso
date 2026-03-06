# Planning HIS – CGT GISO

Application web de gestion des créneaux HIS (Horaires Inter-Services) pour la CGT GISO.

## Fonctionnalités

- 📅 Calendrier interactif avec affichage des créneaux HIS
- 🎯 Sélection hiérarchique : Site (A) → Sous-site (B) → Type (C)
- 👥 Gestion des inscriptions par collègue
- ➕ Ajout de nouveaux créneaux depuis le calendrier ou la modale d'un jour
- 💾 Sauvegarde dans Supabase (base de données partagée)

## Configuration Supabase

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com) et créez un compte
2. Créez un nouveau projet
3. Notez votre **URL** et votre **clé anonyme (anon key)**

### 2. Créer les tables

1. Dans votre projet Supabase, allez dans **SQL Editor**
2. Copiez-collez le contenu du fichier `supabase_schema.sql`
3. Exécutez le script SQL

Cela créera :
- La table `his_slots` pour les créneaux
- La table `his_registrations` pour les inscriptions
- Les index pour les performances
- Les politiques RLS (Row Level Security)

### 3. Configurer l'application

1. Ouvrez `app.js`
2. Remplacez `VOTRE_SUPABASE_URL` par votre URL Supabase
3. Remplacez `VOTRE_SUPABASE_ANON_KEY` par votre clé anonyme

```javascript
const SUPABASE_URL = "https://xxxxx.supabase.co";
const SUPABASE_ANON_KEY = "votre_cle_anonyme_ici";
```

## Utilisation

### Ajouter un créneau

**Méthode 1 : Depuis le calendrier**
1. Cliquez sur le bouton **"+ Ajouter un créneau"** au-dessus du calendrier
2. Remplissez le formulaire et cliquez sur **"Ajouter"**

**Méthode 2 : Depuis la modale d'un jour**
1. Cliquez sur un jour du calendrier
2. Cliquez sur **"+ Ajouter une HIS pour ce jour"** en bas de la modale
3. La date est pré-remplie, complétez les autres champs

### S'inscrire à un créneau

1. Sélectionnez votre nom dans le menu déroulant "Je suis…"
2. Sélectionnez le site, sous-site et type via le menu déroulant principal (ou "Tous les sites" pour une vue globale)
3. Cliquez sur un jour du calendrier qui contient un créneau
4. Cliquez sur **"M'inscrire"** dans la modale

### Vue globale

- Sélectionnez **"Tous les sites"** dans le menu déroulant pour voir tous les créneaux de tous les sites
- Le calendrier affiche alors tous les créneaux avec leur chemin complet (Site → Sous-site → Type)

## Structure de la base de données

### Table `his_slots`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | TEXT (PK) | Identifiant unique du slot |
| `date` | DATE | Date du créneau |
| `main_id` | TEXT | ID de l'attachement principal (voie, mcbt, etc.) |
| `sub_id` | TEXT | ID du sous-attachement (voie_massy, etc.) |
| `slot_type` | TEXT | Type de slot (Jour, Nuit, etc.) |
| `label` | TEXT | Libellé du slot |
| `max_places` | INTEGER | Nombre maximum de places |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |

### Table `his_registrations`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | BIGSERIAL (PK) | Identifiant unique |
| `slot_id` | TEXT (FK) | Référence à `his_slots.id` |
| `colleague_id` | TEXT | ID du collègue |
| `created_at` | TIMESTAMP | Date d'inscription |

## Développement

### Fichiers principaux
- `index.html` : Structure HTML
- `style.css` : Styles CSS
- `app.js` : Logique JavaScript avec intégration Supabase
- `supabase_schema.sql` : Script SQL pour créer les tables

### Installation
1. Configurez Supabase (voir ci-dessus)
2. Ouvrez `index.html` dans un navigateur moderne
3. Les données sont chargées automatiquement depuis Supabase

### Déploiement
Le projet peut être déployé sur :
- GitHub Pages (gratuit)
- Netlify (gratuit)
- Vercel (gratuit)
- Tout hébergeur de fichiers statiques

**Important** : N'oubliez pas de configurer vos credentials Supabase dans `app.js` avant le déploiement.

## Mise à jour : faire fonctionner les changements

Quand le code (sites, sous-sites, types) a été modifié dans `app.js` et poussé sur GitHub :

### 1. Que le nouveau code soit bien chargé (obligatoire)

- **Si le site est hébergé (ex. GitHub Pages)**  
  - Attendre 1–2 minutes après le push.  
  - Faire un **rechargement forcé** pour éviter le cache : **Ctrl+Shift+R** (Windows/Linux) ou **Cmd+Shift+R** (Mac).  
  - Ou ouvrir le site en **navigation privée** pour tester.

- **Si vous ouvrez les fichiers en local**  
  - Rechargement forcé (Ctrl+Shift+R / Cmd+Shift+R) pour que le navigateur recharge `app.js`.

Les **menus A, B et C** (sites, sous-sites, types) viennent de `app.js`. Dès que le bon `app.js` est chargé, les nouvelles options (VAFO, 3x8, Toul Jour/MTM nuit/MTM 3X8, EPI-PHT, etc.) apparaissent.

### 2. Mettre à jour les anciens créneaux en base (optionnel)

Les **créneaux déjà enregistrés** sur le calendrier viennent de Supabase. Leur `main_id`, `sub_id`, `slot_type` sont stockés en base. Pour que les anciens créneaux affichent les nouveaux types, il faut mettre à jour la table `his_slots` dans Supabase.

1. Ouvrez votre projet Supabase → **SQL Editor**.
2. Exécutez le script `supabase_migration_types.sql` (voir ce fichier dans le projet) pour adapter les anciennes valeurs de `slot_type` aux nouvelles. Vous pouvez l’adapter selon vos besoins avant de l’exécuter.

Après ça, la mise à jour est complète : nouveau code chargé + base alignée si vous avez choisi de lancer la migration.

## Sécurité

Les politiques RLS (Row Level Security) sont configurées pour permettre la lecture et l'écriture à tous. Pour un environnement de production, vous devriez :
- Restreindre les politiques selon vos besoins
- Ajouter une authentification si nécessaire
- Utiliser des clés de service pour les opérations administratives

## Licence

Ce projet est destiné à un usage interne pour la CGT GISO.
