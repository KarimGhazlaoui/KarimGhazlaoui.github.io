# Kubii Shield - Maquette Web

## Présentation

Kubii Shield est une solution complète de protection de données pour les utilisateurs particuliers, basée sur un Raspberry Pi. Cette maquette présente l'interface web qui permettra aux utilisateurs de contrôler et configurer facilement leur appareil.

## Fonctionnalités

La solution Kubii Shield intègre les services suivants:

1. **VPN**: Protection de la vie privée et navigation anonyme
2. **Bloqueur de publicités**: Blocage des publicités et trackers au niveau réseau
3. **Pare-feu**: Protection contre les intrusions extérieures
4. **Scanner USB**: Analyse des périphériques USB contre les malwares
5. **Options additionnelles**: Sauvegarde réseau, contrôle parental (en développement)

## Structure de la maquette

La maquette se compose des pages suivantes:

- `setup.html`: Assistant de configuration initiale
- `index.html`: Tableau de bord principal
- `vpn.html`: Configuration et gestion du VPN
- `adblock.html`: Gestion du bloqueur de publicités
- `scan.html`: Interface de scan des périphériques USB
- `firewall.html`: Configuration du pare-feu (à implémenter)
- `settings.html`: Paramètres généraux (à implémenter)

## Structure des dossiers

```
kubii-shield-maquette/
├── images/
│   └── logo-kubii.png
├── css/
│   ├── styles.css
│   ├── vpn-styles.css
│   ├── adblock-styles.css
│   ├── scan-styles.css
│   └── setup-styles.css
├── js/
│   ├── script.js
│   ├── vpn.js
│   ├── adblock.js
│   ├── scan.js
│   └── setup.js
├── index.html
├── vpn.html
├── adblock.html
├── scan.html
├── setup.html
└── README.md
```

## Comment utiliser cette maquette

### Configuration requise

- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Pour le développement: Visual Studio Code avec l'extension Live Server

### Installation et exécution

1. Clonez ce dépôt ou téléchargez les fichiers
2. Ouvrez le projet dans Visual Studio Code
3. Installez l'extension Live Server si ce n'est pas déjà fait
4. Cliquez sur "Go Live" dans la barre d'état en bas à droite
5. Votre navigateur s'ouvrira automatiquement avec la maquette

### Personnalisation

- Modifiez les fichiers CSS pour adapter le style à vos besoins
- Utilisez votre propre logo en remplaçant `images/logo-kubii.png`
- Modifiez les textes dans les fichiers HTML selon vos préférences

## Intégration avec les technologies réelles

Cette interface web pourra être intégrée avec les technologies suivantes:

- **Pi-Hole/AdGuard Home**: Pour la fonctionnalité de blocage de publicités
- **PiVPN**: Pour le service VPN (WireGuard ou OpenVPN)
- **ClamAV**: Pour le scan des périphériques USB
- **UFW/iptables**: Pour la fonctionnalité pare-feu

## Développement futur

Voici les fonctionnalités qui pourraient être ajoutées dans les versions futures:

- Visualisation avancée du trafic réseau
- Détection d'intrusion (IDS)
- Filtrage de contenu avancé
- Sauvegarde chiffrée dans le cloud
- Application mobile compagnon pour la gestion à distance
- Alertes et notifications par email ou push

## Adaptations possibles

Cette maquette peut être adaptée pour fonctionner avec différentes configurations:

- **Raspberry Pi 3B+**: Optimisation des ressources requises
- **Raspberry Pi 4**: Support complet de toutes les fonctionnalités
- **Raspberry Pi Zero 2W**: Version allégée avec uniquement les fonctionnalités essentielles

## Support et contact

Pour toute question ou suggestion concernant cette maquette, veuillez contacter:
- Email: support@kubii.com
- Site web: www.kubii.com

## Licence

Cette maquette est fournie à titre d'exemple et peut être librement adaptée pour votre projet Kubii Shield.
```

## Instructions pour les images

Pour compléter la maquette, vous devrez ajouter une image de logo dans le dossier `images/`. Vous pouvez soit:

1. **Créer votre propre logo**: Créez une image carrée (idéalement 200x200px) avec un fond transparent et placez-la dans `images/logo-kubii.png`

2. **Utiliser un logo temporaire**: Vous pouvez créer un logo simple avec un outil comme Paint ou utiliser un générateur de logo en ligne

3. **Utiliser un placeholder**: Vous pouvez remplacer les balises img par une icône FontAwesome dans les fichiers HTML:
```html
<!-- Remplacer ceci: -->
<img src="images/logo-kubii.png" alt="Kubii Logo">

<!-- Par ceci: -->
<i class="fas fa-shield-alt" style="font-size: 40px; color: white;"></i>
