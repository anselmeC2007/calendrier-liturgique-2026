# Calendrier liturgique 2026 — septembre à décembre

Cette version est volontairement simple : elle commence avec septembre 2026 et contient septembre, octobre, novembre et décembre.

## Ce qui est inclus

- Affichage mobile/PWA.
- La date du jour est mise en évidence.
- Calendrier septembre → décembre 2026.
- Règles de remplacement demandées :
  - lundi ordinaire → Messe votive de la Sainte Trinité — blanc
  - mardi ordinaire → Messe votive des Saints Anges — blanc
  - mercredi ordinaire → Messe votive de Saint Joseph — blanc
  - jeudi ordinaire → Messe votive du Saint-Sacrement — blanc
  - vendredi ordinaire → Messe votive du Sacré-Cœur — blanc
- Les remplacements ne s'appliquent que lorsque l'entrée du PDF est une journée de Temps Ordinaire sans célébration particulière.
- Notifications web :
  - 07:00 : célébration du jour + couleur
  - 19:00 : célébration du lendemain + couleur
  - dimanche 08:00 : semaine à venir

Le calendrier et les formulations sont basés sur le PDF fourni par l'utilisateur. Le PDF indique les couleurs disponibles (Blanc, Vert, Rouge, Violet, Rose) et les rangs S/F/M/m ; l'extraction texte ne transporte pas les pastilles de couleur. Le site applique donc une correspondance liturgique par saison/rang pour les couleurs.

## Important pour les notifications

Le dossier contient le site et un serveur Node.js de notifications. Pour recevoir les notifications téléphone même lorsque le site n'est pas ouvert, le serveur doit rester en ligne sur Internet.

### 1. Générer les clés VAPID

Sur un ordinateur avec Node.js :
```bash
npm install
npx web-push generate-vapid-keys
```

Copier les deux clés dans les variables d'environnement :
- VAPID_PUBLIC_KEY
- VAPID_PRIVATE_KEY
- VAPID_SUBJECT

### 2. Lancer le serveur

```bash
npm install
npm start
```

### 3. Héberger le serveur

Il faut un hébergeur qui laisse tourner un processus Node.js en continu. Le serveur doit utiliser le fuseau `Europe/Paris`.

### 4. Configurer le domaine

Le site doit être servi en HTTPS. Ouvrir ensuite le site sur le téléphone, appuyer sur « Activer les notifications » et autoriser les notifications.

## iPhone

Sur iPhone, le plus sûr est :
1. Ouvrir le site dans Safari.
2. Ajouter le site à l'écran d'accueil.
3. Ouvrir l'icône installée.
4. Appuyer sur « Activer les notifications ».
5. Autoriser les notifications.

## Android

Ouvrir le site dans Chrome, puis activer les notifications. L'installation sur l'écran d'accueil est recommandée.

## Source

Calendrier liturgique 2026 — Calendrier romain général, forme ordinaire, en français, fourni dans cette conversation.
