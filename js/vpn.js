document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaire pour le bouton d'activation/désactivation du VPN
    const vpnToggle = document.getElementById('vpn-toggle');
    if (vpnToggle) {
        vpnToggle.addEventListener('change', function() {
            toggleVpnStatus(this.checked);
        });
    }
    
    // Gestionnaire pour les serveurs VPN
    const servers = document.querySelectorAll('.server');
    servers.forEach(server => {
        server.addEventListener('click', function() {
            selectServer(this);
        });
    });
    
    // Gestionnaire pour la recherche de serveurs
    const searchInput = document.querySelector('.server-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterServers(this.value);
        });
    }
    
    // Gestionnaire pour le changement de protocole
    const protocolSelect = document.querySelector('.setting-select');
    if (protocolSelect) {
        protocolSelect.addEventListener('change', function() {
            updateProtocol(this.value);
        });
    }
});

function toggleVpnStatus(isActive) {
    // Récupérer l'élément de statut
    const statusValue = document.querySelector('.status-item:first-child .value');
    
    if (statusValue) {
        if (isActive) {
            statusValue.textContent = 'Connecté';
            statusValue.classList.add('active');
            showNotification('VPN activé');
            
            // Simuler la connexion
            simulateConnection();
        } else {
            statusValue.textContent = 'Déconnecté';
            statusValue.classList.remove('active');
            showNotification('VPN désactivé');
            
            // Réinitialiser les informations
            resetConnectionInfo();
        }
    }
}

function simulateConnection() {
    // Simuler un délai de connexion
    const statusValue = document.querySelector('.status-item:first-child .value');
    if (statusValue) {
        statusValue.textContent = 'Connexion en cours...';
        
        setTimeout(() => {
            statusValue.textContent = 'Connecté';
            
            // Mettre à jour le temps de connexion
            startConnectionTimer();
        }, 1500);
    }
}

function resetConnectionInfo() {
    // Réinitialiser les informations de connexion
    const timeElement = document.querySelector('.status-item:last-child .value');
    if (timeElement) {
        timeElement.textContent = '00:00:00';
    }
    
    // Arrêter le timer de connexion
    if (window.connectionTimer) {
        clearInterval(window.connectionTimer);
    }
}

function startConnectionTimer() {
    // Initialisation du temps à 0
    let seconds = 0;
    const timeElement = document.querySelector('.status-item:last-child .value');
    
    // Arrêter le timer précédent s'il existe
    if (window.connectionTimer) {
        clearInterval(window.connectionTimer);
    }
    
    // Démarrer un nouveau timer
    window.connectionTimer = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        const timeStr = 
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (secs < 10 ? '0' : '') + secs;
        
        if (timeElement) {
            timeElement.textContent = timeStr;
        }
    }, 1000);
}

function selectServer(serverElement) {
    // Supprimer la classe active de tous les serveurs
    document.querySelectorAll('.server').forEach(s => {
        s.classList.remove('active');
    });
    
    // Ajouter la classe active au serveur sélectionné
    serverElement.classList.add('active');
    
    // Récupérer les informations du serveur
    const country = serverElement.querySelector('h4').textContent;
    const city = serverElement.querySelector('span').textContent;
    
    // Mettre à jour les informations de connexion
    const locationElement = document.querySelector('.status-item:nth-child(3) .value');
    const serverElement2 = document.querySelector('.status-item:nth-child(4) .value');
    
    if (locationElement) {
        locationElement.textContent = city + ', ' + country;
    }
    
    if (serverElement2) {
        // Générer un nom de serveur basé sur le pays et la ville
        const countryCode = getCountryCode(country);
        const cityCode = city.toLowerCase().replace(/\s/g, '');
        serverElement2.textContent = `${countryCode}-${cityCode}-01.vpn.kubii.com`;
    }
    
    // Notification
    showNotification(`Serveur VPN changé pour ${city}, ${country}`);
    
    // Si le VPN est actif, simuler une reconnexion
    const vpnToggle = document.getElementById('vpn-toggle');
    if (vpnToggle && vpnToggle.checked) {
        resetConnectionInfo();
        simulateConnection();
    }
}

function getCountryCode(country) {
    // Simplification: retourner les deux premières lettres du pays en minuscules
    const codes = {
        'France': 'fr',
        'Allemagne': 'de',
        'Pays-Bas': 'nl',
        'États-Unis': 'us',
        'Canada': 'ca'
    };
    
    return codes[country] || country.substring(0, 2).toLowerCase();
}

function filterServers(query) {
    query = query.toLowerCase();
    const servers = document.querySelectorAll('.server');
    
    servers.forEach(server => {
        const countryName = server.querySelector('h4').textContent.toLowerCase();
        const cityName = server.querySelector('span').textContent.toLowerCase();
        
        if (countryName.includes(query) || cityName.includes(query)) {
            server.style.display = 'flex';
        } else {
            server.style.display = 'none';
        }
    });
}

function updateProtocol(protocol) {
    // Simuler un changement de protocole
    showNotification(`Protocole VPN changé pour ${protocol === 'wireguard' ? 'WireGuard' : 'OpenVPN'}`);
    
    // Dans une application réelle, cette fonction enverrait la configuration 
    // au backend pour mettre à jour le protocole VPN
}
