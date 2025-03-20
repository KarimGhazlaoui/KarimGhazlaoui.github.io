document.addEventListener('DOMContentLoaded', function() {
    // Gérer les commutateurs de service et mettre à jour les ressources requises
    const serviceToggles = document.querySelectorAll('.service-card .switch input');
    
    serviceToggles.forEach(function(toggle) {
        toggle.addEventListener('change', updateRequirements);
    });
    
    // Gérer les boutons de navigation
    const prevButton = document.querySelector('.btn-outline');
    const nextButton = document.querySelector('.btn-primary');
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            // Simuler la navigation vers l'étape précédente
            window.location.href = '#'; // Dans une vraie implémentation, ce serait 'setup-network.html'
            // Pour la démo, on peut simplement afficher une alerte
            alert('Navigation vers l\'étape précédente (Configuration réseau)');
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            // Simuler la navigation vers l'étape suivante
            window.location.href = '#'; // Dans une vraie implémentation, ce serait 'setup-security.html'
            // Pour la démo, on peut simplement afficher une alerte
            alert('Navigation vers l\'étape suivante (Paramètres de sécurité)');
        });
    }
    
    // Mise à jour initiale des ressources requises
    updateRequirements();
});

function updateRequirements() {
    // Récupérer tous les services activés
    const activeServices = document.querySelectorAll('.service-card .switch input:checked');
    
    // Calculer les ressources requises en fonction des services activés
    let cpuUsage = 20; // Usage de base
    let ramUsage = 256; // RAM de base en MB
    let diskUsage = 0.8; // Espace disque de base en GB
    
    activeServices.forEach(function(service) {
        const serviceCard = service.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        
        // Ajouter des ressources en fonction du service
        switch(serviceName) {
            case 'Service VPN':
                cpuUsage += 10;
                ramUsage += 128;
                diskUsage += 0.2;
                break;
            case 'Bloqueur de publicités':
                cpuUsage += 5;
                ramUsage += 96;
                diskUsage += 0.1;
                break;
            case 'Pare-feu':
                cpuUsage += 8;
                ramUsage += 64;
                diskUsage += 0.1;
                break;
            case 'Scan USB':
                cpuUsage += 7;
                ramUsage += 128;
                diskUsage += 0.2;
                break;
            case 'Sauvegarde réseau':
                cpuUsage += 15;
                ramUsage += 256;
                diskUsage += 0.5;
                break;
            case 'Contrôle parental':
                cpuUsage += 10;
                ramUsage += 128;
                diskUsage += 0.2;
                break;
        }
    });
    
    // Mettre à jour l'affichage des ressources
    updateResourceDisplay(cpuUsage, ramUsage, diskUsage);
    
    // Vérifier si la configuration est compatible avec le Raspberry Pi
    checkCompatibility(cpuUsage, ramUsage, diskUsage);
}

function updateResourceDisplay(cpu, ram, disk) {
    // Récupérer les éléments d'affichage
    const cpuProgress = document.querySelector('.requirement:nth-child(1) .requirement-progress');
    const cpuValue = document.querySelector('.requirement:nth-child(1) .requirement-value');
    
    const ramProgress = document.querySelector('.requirement:nth-child(2) .requirement-progress');
    const ramValue = document.querySelector('.requirement:nth-child(2) .requirement-value');
    
    const diskProgress = document.querySelector('.requirement:nth-child(3) .requirement-progress');
    const diskValue = document.querySelector('.requirement:nth-child(3) .requirement-value');
    
    // Mettre à jour l'affichage
    if (cpuProgress && cpuValue) {
        cpuProgress.style.width = cpu + '%';
        cpuValue.textContent = cpu + '%';
    }
    
    if (ramProgress && ramValue) {
        const ramPercentage = Math.min((ram / 1024) * 100, 100);
        ramProgress.style.width = ramPercentage + '%';
        ramValue.textContent = ram + ' MB';
    }
    
    if (diskProgress && diskValue) {
        const diskPercentage = Math.min((disk / 5) * 100, 100);
        diskProgress.style.width = diskPercentage + '%';
        diskValue.textContent = disk.toFixed(1) + ' GB';
    }
}

function checkCompatibility(cpu, ram, disk) {
    const message = document.querySelector('.requirements-message');
    
    if (!message) return;
    
    // Vérifier si la configuration est compatible
    if (cpu > 80 || ram > 3500 || disk > 4.5) {
        message.className = 'requirements-message warning';
        message.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <p>Certains services pourraient être lents sur votre Raspberry Pi 4 (4GB)</p>
        `;
    } else {
        message.className = 'requirements-message success';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Compatible avec votre Raspberry Pi 4 (4GB)</p>
        `;
    }
}