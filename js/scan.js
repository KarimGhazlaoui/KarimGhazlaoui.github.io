document.addEventListener('DOMContentLoaded', function() {
    // Simuler la connexion d'un périphérique USB après quelques secondes
    setTimeout(simulateUsbConnection, 5000);
    
    // Ajouter des gestionnaires d'événements aux boutons
    const clearBtn = document.querySelector('.clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir effacer tout l\'historique des scans?')) {
                clearScanHistory();
            }
        });
    }
    
    const emptyQuarantineBtn = document.querySelector('.danger-btn');
    if (emptyQuarantineBtn) {
        emptyQuarantineBtn.addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir vider la zone de quarantaine? Cette action est irréversible.')) {
                emptyQuarantine();
            }
        });
    }
    
    // Gérer les boutons de suppression et de restauration des fichiers en quarantaine
    const deleteButtons = document.querySelectorAll('.quarantine-actions .small-btn.danger');
    deleteButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const item = this.closest('.quarantine-item');
            const fileName = item.querySelector('h4').textContent;
            
            if (confirm(`Êtes-vous sûr de vouloir supprimer définitivement "${fileName}"?`)) {
                item.style.opacity = '0';
                setTimeout(function() {
                    item.remove();
                    showNotification('Fichier supprimé avec succès');
                }, 300);
            }
        });
    });
    
    const restoreButtons = document.querySelectorAll('.quarantine-actions .small-btn.warning');
    restoreButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const item = this.closest('.quarantine-item');
            const fileName = item.querySelector('h4').textContent;
            
            if (confirm(`Êtes-vous sûr de vouloir restaurer "${fileName}"? Ce fichier pourrait contenir des menaces.`)) {
                item.style.opacity = '0';
                setTimeout(function() {
                    item.remove();
                    showNotification('Fichier restauré avec succès');
                }, 300);
            }
        });
    });
});

function simulateUsbConnection() {
    // Mettre à jour l'interface pour montrer un périphérique connecté
    const scanMessage = document.querySelector('.scan-message');
    if (scanMessage) {
        scanMessage.querySelector('h2').textContent = 'Périphérique USB détecté';
        scanMessage.querySelector('p').textContent = 'SanDisk Ultra (32GB) connecté au port 2';
    }
    
    // Mettre à jour l'apparence du port 2
    const port2 = document.querySelector('.usb-port:nth-child(2) .port-slot');
    if (port2) {
        port2.classList.remove('empty');
        port2.classList.add('connected');
        
        // Après un court délai, commencer le scan
        setTimeout(startScanning, 2000);
    }
}

function startScanning() {
    // Mettre à jour l'interface pour montrer le scan en cours
    const scanMessage = document.querySelector('.scan-message');
    if (scanMessage) {
        scanMessage.querySelector('h2').textContent = 'Scan en cours...';
        scanMessage.querySelector('p').textContent = 'Veuillez ne pas débrancher le périphérique.';
    }
    
    // Mettre à jour l'apparence du port 2
    const port2 = document.querySelector('.usb-port:nth-child(2) .port-slot');
    if (port2) {
        port2.classList.remove('connected');
        port2.classList.add('scanning');
        
        // Après un certain temps, terminer le scan
        setTimeout(finishScanning, 8000);
    }
    
    // Ajouter une barre de progression de scan
    const scanAnimation = document.querySelector('.scan-animation');
    if (scanAnimation) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scan-progress';
        progressBar.innerHTML = `
            <div class="progress-info">
                <span>Fichiers scannés: <span id="scanned-files">0</span></span>
                <span><span id="scan-percentage">0</span>%</span>
            </div>
            <div class="progress-bar">
                <div class="progress" id="scan-progress"></div>
            </div>
        `;
        
        scanAnimation.appendChild(progressBar);
        
        // Simuler la progression du scan
        simulateScanProgress();
    }
}

function simulateScanProgress() {
    let progress = 0;
    const files = 3871; // Nombre total de fichiers à scanner
    const interval = setInterval(function() {
        progress += 1;
        
        const progressBar = document.getElementById('scan-progress');
        const percentage = document.getElementById('scan-percentage');
        const scannedFiles = document.getElementById('scanned-files');
        
        if (progressBar && percentage && scannedFiles) {
            progressBar.style.width = progress + '%';
            percentage.textContent = progress;
            scannedFiles.textContent = Math.floor(files * (progress / 100));
        }
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 80); // Vitesse de la progression
}

function finishScanning() {
    // Mettre à jour l'interface pour montrer que le scan est terminé
    const scanMessage = document.querySelector('.scan-message');
    if (scanMessage) {
        scanMessage.querySelector('h2').textContent = 'Scan terminé';
        scanMessage.querySelector('p').textContent = '2 menaces détectées et mises en quarantaine.';
    }
    
    // Mettre à jour l'apparence du port 2
    const port2 = document.querySelector('.usb-port:nth-child(2) .port-slot');
    if (port2) {
        port2.classList.remove('scanning');
        port2.classList.add('connected');
    }
    
    // Remplacer la barre de progression par un résumé du scan
    const scanAnimation = document.querySelector('.scan-animation');
    if (scanAnimation) {
        const scanProgress = document.querySelector('.scan-progress');
        if (scanProgress) {
            scanProgress.remove();
        }
        
        const scanResult = document.createElement('div');
        scanResult.className = 'scan-result';
        scanResult.innerHTML = `
            <div class="result-header warning">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Menaces détectées</h3>
            </div>
            <div class="result-details">
                <div class="result-item">
                    <span class="label">Fichiers scannés:</span>
                    <span class="value">3,871</span>
                </div>
                <div class="result-item">
                    <span class="label">Menaces trouvées:</span>
                    <span class="value danger">2</span>
                </div>
                <div class="result-item">
                    <span class="label">Action réalisée:</span>
                    <span class="value">Mise en quarantaine</span>
                </div>
                <div class="result-item">
                    <span class="label">Durée du scan:</span>
                    <span class="value">00:01:15</span>
                </div>
            </div>
            <div class="result-actions">
                <button class="primary-btn"><i class="fas fa-eye"></i> Voir le rapport détaillé</button>
                <button class="action-btn"><i class="fas fa-sync-alt"></i> Scanner à nouveau</button>
            </div>
        `;
        
        scanAnimation.appendChild(scanResult);
        
        // Ajouter une nouvelle entrée dans l'historique des scans
        addNewScanToHistory();
    }
}

function addNewScanToHistory() {
    const historyTable = document.querySelector('.history-table');
    if (historyTable) {
        const now = new Date();
        const timeStr = 'Aujourd\'hui ' + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        
        const newRow = document.createElement('div');
        newRow.className = 'history-row';
        newRow.innerHTML = `
            <div class="history-cell">${timeStr}</div>
            <div class="history-cell">SanDisk Ultra (32GB)</div>
            <div class="history-cell">3,871</div>
            <div class="history-cell">2</div>
            <div class="history-cell"><span class="status-badge danger">Infecté</span></div>
            <div class="history-cell">
                <button class="icon-btn"><i class="fas fa-eye"></i></button>
                <button class="icon-btn"><i class="fas fa-download"></i></button>
            </div>
        `;
        
        // Insérer après la ligne d'en-tête
        const headerRow = historyTable.querySelector('.history-row.header');
        if (headerRow && headerRow.nextSibling) {
            historyTable.insertBefore(newRow, headerRow.nextSibling);
        } else {
            historyTable.appendChild(newRow);
        }
    }
}

function clearScanHistory() {
    const historyRows = document.querySelectorAll('.history-row:not(.header)');
    historyRows.forEach(function(row) {
        row.style.opacity = '0';
        setTimeout(function() {
            row.remove();
        }, 300);
    });
    
    showNotification('Historique des scans effacé');
}

function emptyQuarantine() {
    const quarantineItems = document.querySelectorAll('.quarantine-item');
    quarantineItems.forEach(function(item) {
        item.style.opacity = '0';
        setTimeout(function() {
            item.remove();
        }, 300);
    });
    
    showNotification('Zone de quarantaine vidée');
}
