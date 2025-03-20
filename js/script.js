document.addEventListener('DOMContentLoaded', function() {
    // Simuler l'actualisation des données système
    setInterval(function() {
        updateSystemStats();
    }, 5000);
    
    // Ajouter des événements aux interrupteurs
    const switches = document.querySelectorAll('.switch input');
    switches.forEach(function(switchEl) {
        switchEl.addEventListener('change', function() {
            const card = this.closest('.stat-card');
            if (card) {
                const statusEl = card.querySelector('.status');
                
                if (this.checked) {
                    statusEl.classList.add('active');
                    statusEl.textContent = 'Actif';
                } else {
                    statusEl.classList.remove('active');
                    statusEl.textContent = 'Inactif';
                }
            }
        });
    });
    
    // Ajouter des événements aux boutons d'action rapide
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleQuickAction(action);
        });
    });
    
    // Ajouter un gestionnaire d'événement pour le bouton d'aide
    const helpBtn = document.querySelector('.help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            window.location.href = 'help.html';
        });
    }
});

function updateSystemStats() {
    // Simuler des changements dans les statistiques système
    const cpuUsage = document.getElementById('cpu-usage');
    const ramUsage = document.getElementById('ram-usage');
    const temperature = document.getElementById('temperature');
    
    if (cpuUsage) cpuUsage.textContent = Math.floor(Math.random() * 50) + '%';
    if (ramUsage) ramUsage.textContent = Math.floor(Math.random() * 500 + 300) + ' MB';
    if (temperature) temperature.textContent = Math.floor(Math.random() * 15 + 35) + '°C';
}

function handleQuickAction(action) {
    console.log('Action rapide sélectionnée :', action);
    
    // Simuler les actions
    if (action.includes('Scanner')) {
        alert('Veuillez connecter un support USB pour commencer le scan.');
        // Rediriger vers la page de scan
        window.location.href = 'scan.html';
    } else if (action.includes('Rechercher')) {
        simulateUpdateCheck();
    } else if (action.includes('Exporter')) {
        downloadFakeLog();
    } else if (action.includes('Redémarrer')) {
        if(confirm('Êtes-vous sûr de vouloir redémarrer Kubii Shield?')) {
            simulateReboot();
        }
    }
}

function simulateUpdateCheck() {
    const updateBtn = document.querySelector('.action-btn:nth-child(2)');
    if (!updateBtn) return;
    
    const originalText = updateBtn.innerHTML;
    
    updateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification...';
    updateBtn.disabled = true;
    
    setTimeout(function() {
        updateBtn.innerHTML = '<i class="fas fa-check"></i> Système à jour!';
        
        setTimeout(function() {
            updateBtn.innerHTML = originalText;
            updateBtn.disabled = false;
        }, 3000);
    }, 2000);
}

function downloadFakeLog() {
    const a = document.createElement('a');
    const content = "=== Kubii Shield - Journaux d'activité ===\n" +
                    "Date: " + new Date().toLocaleString() + "\n\n" +
                    "VPN: Actif\n" +
                    "Bloqueur de publicités: Actif\n" +
                    "Pare-feu: Actif\n" +
                    "Statistiques de blocage: 1,243 publicités bloquées aujourd'hui\n" +
                    "Dernières activités:\n" +
                    "- Tentative de connexion bloquée à 10:42\n" +
                    "- Publicité bloquée: ads.example.com à 09:15\n" +
                    "- VPN activé à 08:30\n";
    
    const file = new Blob([content], {type: 'text/plain'});
    
    a.href = URL.createObjectURL(file);
    a.download = 'kubii_shield_logs.txt';
    a.click();
    
    URL.revokeObjectURL(a.href);
}

function simulateReboot() {
    const overlay = document.createElement('div');
    overlay.className = 'reboot-overlay';
    overlay.innerHTML = `
        <div class="reboot-message">
            <i class="fas fa-power-off fa-spin"></i>
            <h2>Redémarrage en cours...</h2>
            <p>Veuillez patienter, cette opération peut prendre quelques instants.</p>
            <div class="progress-bar"><div class="progress"></div></div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    let progress = 0;
    const interval = setInterval(function() {
        progress += 5;
        const progressBar = document.querySelector('.progress');
        if(progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if(progress >= 100) {
            clearInterval(interval);
            setTimeout(function() {
                overlay.innerHTML = `
                    <div class="reboot-message">
                        <i class="fas fa-check-circle"></i>
                        <h2>Redémarrage terminé!</h2>
                        <p>Kubii Shield est prêt à l'utilisation.</p>
                    </div>
                `;
                
                setTimeout(function() {
                    overlay.remove();
                }, 2000);
            }, 1000);
        }
    }, 200);
}

// Ajouter des entrées d'activité simulées
function addActivityEntry() {
    const activities = [
        'Publicité bloquée: analytics.example.com',
        'Publicité bloquée: ads.doubleclick.net',
        'Tentative de connexion bloquée',
        'Mise à jour de la liste de blocage',
        'Nouveau périphérique connecté'
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList && activityList.children.length > 0) {
        const newActivity = document.createElement('li');
        const now = new Date();
        const timeStr = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        
        newActivity.innerHTML = `<span class="time">${timeStr}</span> ${activities[Math.floor(Math.random() * activities.length)]}`;
        
        activityList.insertBefore(newActivity, activityList.firstChild);
        
        if (activityList.children.length > 5) {
            activityList.removeChild(activityList.lastChild);
        }
    }
}

// Simuler de nouvelles activités périodiquement sur la page d'accueil
if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
    setInterval(addActivityEntry, 30000);
}

// Fonction utilitaire pour afficher les notifications
function showNotification(message) {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(function() {
        notification.classList.add('show');
        
        // Supprimer après quelques secondes
        setTimeout(function() {
            notification.classList.remove('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }, 100);
}
