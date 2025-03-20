document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaire pour le bouton d'activation/désactivation du bloqueur
    const adblockToggle = document.getElementById('adblock-toggle');
    if (adblockToggle) {
        adblockToggle.addEventListener('change', function() {
            toggleAdblockStatus(this.checked);
        });
    }
    
    // Gestionnaire pour les boutons de période du graphique
    const graphButtons = document.querySelectorAll('.graph-btn');
    graphButtons.forEach(button => {
        button.addEventListener('click', function() {
            setActiveGraphPeriod(this);
        });
    });
    
    // Gestionnaire pour les boutons des listes
    setupListActionButtons();
    
    // Gestionnaire pour le bouton d'ajout de liste
    const addListButton = document.querySelector('.primary-btn');
    if (addListButton) {
        addListButton.addEventListener('click', function() {
            showAddListDialog();
        });
    }
    
    // Simuler l'ajout de statistiques de blocage
    startBlockingSimulation();
});

function toggleAdblockStatus(isActive) {
    // Dans une vraie application, cette fonction activerait/désactiverait le service de blocage
    if (isActive) {
        showNotification('Bloqueur de publicités activé');
    } else {
        showNotification('Bloqueur de publicités désactivé');
    }
    
    // Désactiver ou activer l'interface en fonction de l'état
    const dashboard = document.querySelector('.adblock-dashboard');
    if (dashboard) {
        if (!isActive) {
            dashboard.classList.add('disabled');
            // Arrêter la simulation de blocage
            if (window.blockingInterval) {
                clearInterval(window.blockingInterval);
            }
        } else {
            dashboard.classList.remove('disabled');
            // Redémarrer la simulation
            startBlockingSimulation();
        }
    }
}

function setActiveGraphPeriod(button) {
    // Supprimer la classe active de tous les boutons
    document.querySelectorAll('.graph-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ajouter la classe active au bouton sélectionné
    button.classList.add('active');
    
    // Simuler le changement de période (dans une application réelle, cela chargerait de nouvelles données)
    const period = button.textContent.trim();
    updateGraphForPeriod(period);
}

function updateGraphForPeriod(period) {
    // Dans une vraie application, cette fonction chargerait les données pour la période sélectionnée
    // Pour notre démo, on va juste simuler un changement de graphique
    
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 95) + 5; // entre 5% et 100%
        bar.style.height = randomHeight + '%';
    });
    
    showNotification('Affichage des données pour la période: ' + period);
}

function setupListActionButtons() {
    // Gestionnaire pour les boutons de synchronisation
    const syncButtons = document.querySelectorAll('.icon-btn .fa-sync-alt');
    syncButtons.forEach(button => {
        button.closest('.icon-btn').addEventListener('click', function() {
            const listRow = this.closest('.list-row');
            const listName = listRow.querySelector('.list-name').textContent;
            syncList(listName, listRow);
        });
    });
    
    // Gestionnaire pour les boutons de paramètres
    const settingsButtons = document.querySelectorAll('.icon-btn .fa-cog');
    settingsButtons.forEach(button => {
        button.closest('.icon-btn').addEventListener('click', function() {
            const listRow = this.closest('.list-row');
            const listName = listRow.querySelector('.list-name').textContent;
            showListSettings(listName);
        });
    });
    
    // Gestionnaire pour les boutons de suppression
    const deleteButtons = document.querySelectorAll('.icon-btn.danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const listRow = this.closest('.list-row');
            const listName = listRow.querySelector('.list-name').textContent;
            deleteList(listName, listRow);
        });
    });
    
    // Gestionnaire pour les boutons d'édition
    const editButtons = document.querySelectorAll('.icon-btn .fa-edit');
    editButtons.forEach(button => {
        button.closest('.icon-btn').addEventListener('click', function() {
            const listRow = this.closest('.list-row');
            const listName = listRow.querySelector('.list-name').textContent;
            editList(listName);
        });
    });
}

function syncList(listName, listRow) {
    // Simuler la synchronisation d'une liste
    const syncButton = listRow.querySelector('.fa-sync-alt').closest('.icon-btn');
    const originalHTML = syncButton.innerHTML;
    
    // Afficher l'animation de chargement
    syncButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    syncButton.disabled = true;
    
    // Simuler un délai
    setTimeout(() => {
        // Mettre à jour la dernière date de mise à jour
        const dateCell = listRow.querySelector('.list-cell:nth-child(4)');
        if (dateCell) {
            dateCell.textContent = 'Aujourd\'hui à ' + new Date().getHours() + ':' + 
                (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes();
        }
        
        // Restaurer le bouton
        syncButton.innerHTML = originalHTML;
        syncButton.disabled = false;
        
        showNotification(`Liste "${listName}" mise à jour avec succès`);
    }, 2000);
}

function showListSettings(listName) {
    // Simuler l'affichage d'une boîte de dialogue de paramètres
    alert(`Paramètres de la liste "${listName}"\n\nDans une application réelle, une boîte de dialogue s'ouvrirait ici.`);
}

function deleteList(listName, listRow) {
    // Demander confirmation
    if (confirm(`Êtes-vous sûr de vouloir supprimer la liste "${listName}" ?`)) {
        // Animer la suppression
        listRow.style.opacity = '0';
        setTimeout(() => {
            listRow.remove();
            showNotification(`Liste "${listName}" supprimée`);
        }, 300);
    }
}

function editList(listName) {
    // Simuler l'affichage d'une boîte de dialogue d'édition
    alert(`Édition de la liste "${listName}"\n\nDans une application réelle, une boîte de dialogue s'ouvrirait ici.`);
}

function showAddListDialog() {
    // Simuler l'affichage d'une boîte de dialogue d'ajout de liste
    const listUrl = prompt('Entrez l\'URL de la liste de blocage à ajouter:');
    
    if (listUrl) {
        // Dans une application réelle, on validerait l'URL et on téléchargerait la liste
        addNewList('Nouvelle liste', listUrl);
    }
}

function addNewList(name, url) {
    // Ajouter une nouvelle liste à l'interface
    const listsTable = document.querySelector('.lists-table');
    
    if (listsTable) {
        const newRow = document.createElement('div');
        newRow.className = 'list-row';
        newRow.innerHTML = `
            <div class="list-cell">
                <span class="list-name">${name}</span>
                <span class="list-badge custom">Personnalisée</span>
            </div>
            <div class="list-cell">${url}</div>
            <div class="list-cell">0</div>
            <div class="list-cell">À l'instant</div>
            <div class="list-cell">
                <button class="icon-btn"><i class="fas fa-sync-alt"></i></button>
                <button class="icon-btn"><i class="fas fa-cog"></i></button>
                <button class="icon-btn danger"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        // Insérer la nouvelle ligne au début, après l'en-tête
        const headerRow = listsTable.querySelector('.header');
        if (headerRow && headerRow.nextSibling) {
            listsTable.insertBefore(newRow, headerRow.nextSibling);
        } else {
            listsTable.appendChild(newRow);
        }
        
        // Configurer les événements pour les boutons
        setupListActionButtons();
        
        showNotification(`Liste "${name}" ajoutée avec succès`);
        
        // Simuler le téléchargement et la mise à jour des règles
        setTimeout(() => {
            const rulesCell = newRow.querySelector('.list-cell:nth-child(3)');
            if (rulesCell) {
                rulesCell.textContent = Math.floor(Math.random() * 10000) + 5000;
                showNotification(`Téléchargement de la liste "${name}" terminé`);
            }
        }, 3000);
    }
}

function startBlockingSimulation() {
    // Dans une vraie application, cette fonction ne serait pas nécessaire
    // car le serveur enverrait les statistiques réelles
    
    // Simuler l'augmentation régulière des statistiques de blocage
    
    // Arrêter tout intervalle existant
    if (window.blockingInterval) {
        clearInterval(window.blockingInterval);
    }
    
    // Créer un nouvel intervalle
    window.blockingInterval = setInterval(() => {
        // Incrémenter le compteur de publicités bloquées aujourd'hui
        const todayValue = document.querySelector('.stat-box:nth-child(2) .stat-value');
        if (todayValue) {
            let value = parseInt(todayValue.textContent.replace(/,/g, ''), 10);
            value += Math.floor(Math.random() * 5) + 1;
            todayValue.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        // Incrémenter le compteur total
        const totalValue = document.querySelector('.stat-box:first-child .stat-value');
        if (totalValue) {
            let value = parseInt(totalValue.textContent.replace(/,/g, ''), 10);
            value += Math.floor(Math.random() * 5) + 1;
            totalValue.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        // Mettre à jour la barre active dans le graphique
        const activeBar = document.querySelector('.bar-container.active .bar');
        if (activeBar) {
            let height = parseInt(activeBar.style.height, 10) || 80;
            height += Math.floor(Math.random() * 3) - 1; // -1, 0, ou +1
            height = Math.max(10, Math.min(95, height)); // Garder entre 10% et 95%
            activeBar.style.height = height + '%';
        }
    }, 5000); // Toutes les 5 secondes
}
