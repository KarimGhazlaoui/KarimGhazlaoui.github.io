document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaire pour le bouton d'activation/désactivation du pare-feu
    const firewallToggle = document.getElementById('firewall-toggle');
    if (firewallToggle) {
        firewallToggle.addEventListener('change', function() {
            toggleFirewallStatus(this.checked);
        });
    }
    
    // Gestionnaire pour le filtre des activités
    const activityFilter = document.querySelector('.filter-select');
    if (activityFilter) {
        activityFilter.addEventListener('change', function() {
            filterActivities(this.value);
        });
    }
    
    // Gestionnaire pour les boutons d'information
    const infoButtons = document.querySelectorAll('.activity-cell .icon-btn');
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('.activity-row');
            const time = row.querySelector('.activity-cell:first-child').textContent;
            const ip = row.querySelector('.activity-cell:nth-child(2)').textContent;
            const actionCell = row.querySelector('.activity-cell:nth-child(5)');
            const action = actionCell.textContent.trim();
            
            showActivityDetails(time, ip, action);
        });
    });
    
    // Gestionnaire pour le bouton d'ajout de règle
    const addRuleButton = document.querySelector('.rules-card .primary-btn');
    if (addRuleButton) {
        addRuleButton.addEventListener('click', function() {
            showAddRuleDialog();
        });
    }
    
    // Gestionnaire pour les boutons d'édition de règle
    const editButtons = document.querySelectorAll('.rule-cell .fa-edit');
    editButtons.forEach(button => {
        button.closest('.icon-btn').addEventListener('click', function() {
            const row = this.closest('.rule-row');
            const ruleName = row.querySelector('.rule-cell:first-child').textContent;
            editRule(ruleName);
        });
    });
    
    // Gestionnaire pour les boutons de suppression de règle
    const deleteButtons = document.querySelectorAll('.rule-cell .fa-trash');
    deleteButtons.forEach(button => {
        button.closest('.icon-btn').addEventListener('click', function() {
            const row = this.closest('.rule-row');
            const ruleName = row.querySelector('.rule-cell:first-child').textContent;
            deleteRule(ruleName, row);
        });
    });
});

function toggleFirewallStatus(isActive) {
    // Dans une vraie application, cette fonction activerait/désactiverait le service de pare-feu
    if (isActive) {
        showNotification('Pare-feu activé');
    } else {
        showNotification('Pare-feu désactivé');
        
        // Avertissement de sécurité
        if (confirm('Désactiver le pare-feu peut exposer votre réseau à des risques de sécurité. Êtes-vous sûr de vouloir continuer?')) {
            showNotification('Pare-feu désactivé - Votre réseau n\'est plus protégé');
        } else {
            // Réactiver le pare-feu si l'utilisateur annule
            const firewallToggle = document.getElementById('firewall-toggle');
            if (firewallToggle) {
                firewallToggle.checked = true;
            }
            showNotification('Pare-feu maintenu actif');
        }
    }
}

function filterActivities(filter) {
    // Filtrer les activités affichées en fonction de la sélection
    const rows = document.querySelectorAll('.activity-row:not(.header)');
    
    rows.forEach(row => {
        const action = row.querySelector('.status-badge').textContent.toLowerCase();
        
        if (filter === 'all') {
            row.style.display = 'flex';
        } else if (filter === 'blocked' && action === 'bloqué') {
            row.style.display = 'flex';
        } else if (filter === 'allowed' && action === 'autorisé') {
            row.style.display = 'flex';
        } else if (filter === 'suspicious' && action === 'suspect') {
            row.style.display = 'flex';
        } else {
            row.style.display = 'none';
        }
    });
}

function showActivityDetails(time, ip, action) {
    // Dans une application réelle, cette fonction afficherait une boîte de dialogue avec les détails complets
    alert(`Détails de l'activité\n\nHorodatage: ${time}\nAdresse IP: ${ip}\nAction: ${action}\n\nDans une application réelle, une fenêtre modale détaillée s'afficherait ici avec beaucoup plus d'informations sur cette connexion, comme l'emplacement géographique de l'IP, le nom d'hôte, les ports concernés, etc.`);
}

function showAddRuleDialog() {
    // Dans une application réelle, cette fonction afficherait un formulaire complet pour ajouter une règle
    const ruleName = prompt('Nom de la règle:');
    
    if (ruleName) {
        // Dans une vraie application, on validerait les entrées et on ajouterait réellement une règle
        addNewRule(ruleName);
    }
}

function addNewRule(name) {
    // Ajouter une nouvelle règle à l'interface
    const rulesTable = document.querySelector('.rules-table');
    
    if (rulesTable) {
        const newRow = document.createElement('div');
        newRow.className = 'rule-row';
        newRow.innerHTML = `
            <div class="rule-cell">${name}</div>
            <div class="rule-cell">Entrant</div>
            <div class="rule-cell">TCP</div>
            <div class="rule-cell">Tous</div>
            <div class="rule-cell">Tous</div>
            <div class="rule-cell">Autoriser</div>
            <div class="rule-cell">
                <label class="switch small">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="rule-cell">
                <button class="icon-btn"><i class="fas fa-edit"></i></button>
                <button class="icon-btn danger"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        // Insérer la nouvelle ligne juste après l'en-tête
        const headerRow = rulesTable.querySelector('.header');
        if (headerRow && headerRow.nextSibling) {
            rulesTable.insertBefore(newRow, headerRow.nextSibling);
        } else {
            rulesTable.appendChild(newRow);
        }
        
        // Ajouter les gestionnaires d'événements pour les nouveaux boutons
        const editButton = newRow.querySelector('.fa-edit').closest('.icon-btn');
        editButton.addEventListener('click', function() {
            editRule(name);
        });
        
        const deleteButton = newRow.querySelector('.fa-trash').closest('.icon-btn');
        deleteButton.addEventListener('click', function() {
            deleteRule(name, newRow);
        });
        
        showNotification(`Règle "${name}" ajoutée avec succès`);
    }
}

function editRule(ruleName) {
    // Dans une application réelle, cette fonction afficherait un formulaire d'édition
    alert(`Édition de la règle "${ruleName}"\n\nDans une application réelle, un formulaire d'édition s'ouvrirait ici pour modifier tous les paramètres de cette règle.`);
}

function deleteRule(ruleName, ruleRow) {
    // Demander confirmation
    if (confirm(`Êtes-vous sûr de vouloir supprimer la règle "${ruleName}" ?`)) {
        // Animation de suppression
        ruleRow.style.opacity = '0';
        setTimeout(() => {
            ruleRow.remove();
            showNotification(`Règle "${ruleName}" supprimée`);
        }, 300);
    }
}
