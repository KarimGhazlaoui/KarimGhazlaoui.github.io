document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaire pour les onglets de paramètres
    const settingsTabs = document.querySelectorAll('.settings-nav li');
    
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Récupérer la cible de l'onglet
            const target = this.getAttribute('data-target');
            
            // Supprimer la classe active de tous les onglets et sections
            document.querySelectorAll('.settings-nav li').forEach(t => {
                t.classList.remove('active');
            });
            
            document.querySelectorAll('.settings-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Ajouter la classe active à l'onglet sélectionné et à la section correspondante
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Gestionnaire pour le choix de la configuration IP
    const ipModeSelect = document.querySelector('#network select[class="setting-select"]');
    
    if (ipModeSelect) {
        ipModeSelect.addEventListener('change', function() {
            const dhcpHiddenFields = document.querySelectorAll('.dhcp-hidden');
            
            if (this.value === 'static') {
                // Afficher les champs de configuration statique
                dhcpHiddenFields.forEach(field => {
                    field.style.display = 'flex';
                });
            } else {
                // Masquer les champs
                dhcpHiddenFields.forEach(field => {
                    field.style.display = 'none';
                });
            }
        });
    }
    
    // Gestionnaire pour la recherche de réseaux Wi-Fi
    const wifiScanButton = document.querySelector('#network .outline-btn');
    
    if (wifiScanButton) {
        wifiScanButton.addEventListener('click', function() {
            // Simuler une recherche de réseaux Wi-Fi
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Recherche...';
            
            setTimeout(() => {
                this.disabled = false;
                this.innerHTML = 'Rechercher';
                
                // Afficher une liste de réseaux fictifs
                const networks = [
                    { ssid: 'Livebox-1234', security: 'WPA2', signal: 85 },
                    { ssid: 'Freebox-5678', security: 'WPA2', signal: 70 },
                    { ssid: 'SFR_WiFi_9ABC', security: 'WPA2', signal: 60 },
                    { ssid: 'HUAWEI-DEF0', security: 'WPA3', signal: 45 },
                    { ssid: 'Guest_Network', security: 'Ouvert', signal: 30 }
                ];
                
                showWifiNetworksList(networks);
            }, 2000);
        });
    }
    
    // Gestionnaire pour la personnalisation du tableau de bord
    const customizeDashboardButton = document.querySelector('#general .outline-btn');
    
    if (customizeDashboardButton) {
        customizeDashboardButton.addEventListener('click', function() {
            // Simuler l'ouverture d'une boîte de dialogue de personnalisation
            alert('Dans une application réelle, une boîte de dialogue de personnalisation des widgets s\'ouvrirait ici.');
        });
    }
});

function showWifiNetworksList(networks) {
    // Créer un élément de dialogue modal pour afficher les réseaux
    const modal = document.createElement('div');
    modal.className = 'wifi-modal';
    
    let modalContent = `
        <div class="wifi-modal-content">
            <h3>Réseaux Wi-Fi disponibles</h3>
            <ul class="wifi-networks-list">
    `;
    
    networks.forEach(network => {
        // Déterminer la classe de signal
        let signalClass = 'weak';
        if (network.signal > 70) {
            signalClass = 'strong';
        } else if (network.signal > 40) {
            signalClass = 'medium';
        }
        
        modalContent += `
            <li class="wifi-network">
                <div class="wifi-network-info">
                    <span class="wifi-name">${network.ssid}</span>
                    <span class="wifi-security">${network.security}</span>
                </div>
                <div class="wifi-signal ${signalClass}">
                    <i class="fas fa-wifi"></i>
                    <span>${network.signal}%</span>
                </div>
            </li>
        `;
    });
    
    modalContent += `
            </ul>
            <div class="wifi-modal-footer">
                <button class="outline-btn wifi-modal-close">Fermer</button>
            </div>
        </div>
    `;
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    
    // Ajouter un gestionnaire pour le bouton de fermeture
    const closeButton = modal.querySelector('.wifi-modal-close');
    closeButton.addEventListener('click', function() {
        modal.remove();
    });
    
    // Ajouter un gestionnaire pour la sélection d'un réseau
    const networkItems = modal.querySelectorAll('.wifi-network');
    networkItems.forEach(item => {
        item.addEventListener('click', function() {
            const ssid = this.querySelector('.wifi-name').textContent;
            selectWifiNetwork(ssid, modal);
        });
    });
}

function selectWifiNetwork(ssid, modal) {
    // Remplir le champ SSID avec le réseau sélectionné
    const ssidInput = document.querySelector('#network input[placeholder="Entrez le SSID"]');
    if (ssidInput) {
        ssidInput.value = ssid;
    }
    
    // Fermer la modale
    modal.remove();
    
    // Afficher une notification
    showNotification(`Réseau Wi-Fi "${ssid}" sélectionné`);
}

// Ajouter du CSS pour la modale Wi-Fi
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .wifi-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .wifi-modal-content {
            background-color: white;
            border-radius: var(--border-radius);
            width: 500px;
            max-width: 90%;
            padding: 20px;
        }
        
        .wifi-modal-content h3 {
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        
        .wifi-networks-list {
            list-style: none;
            margin-bottom: 20px;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .wifi-network {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .wifi-network:hover {
            background-color: #f9f9f9;
        }
        
        .wifi-network-info {
            display: flex;
            flex-direction: column;
        }
        
        .wifi-name {
            font-weight: 500;
            margin-bottom: 5px;
        }
        
        .wifi-security {
            font-size: 12px;
            color: #777;
        }
        
        .wifi-signal {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .wifi-signal.strong {
            color: var(--success-color);
        }
        
        .wifi-signal.medium {
            color: var(--warning-color);
        }
        
        .wifi-signal.weak {
            color: var(--danger-color);
        }
        
        .wifi-modal-footer {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }
    `;
    
    document.head.appendChild(style);
});

// Ajoutons également un simple JavaScript pour la page pare-feu
