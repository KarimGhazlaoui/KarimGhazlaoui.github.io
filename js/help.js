document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaire pour la navigation entre les sections
    const navSections = document.querySelectorAll('.nav-section');
    navSections.forEach(section => {
        section.addEventListener('click', function() {
            const target = this.getAttribute('data-section');
            
            // Supprimer la classe active de toutes les sections
            document.querySelectorAll('.nav-section').forEach(s => {
                s.classList.remove('active');
            });
            
            document.querySelectorAll('.help-section').forEach(content => {
                content.classList.remove('active');
            });
            
            // Ajouter la classe active à la section sélectionnée
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Gestionnaire pour les badges de sujets populaires
    const topicBadges = document.querySelectorAll('.topic-badge');
    topicBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            searchByTopic(topic);
        });
    });
    
    // Gestionnaire pour la recherche
    const searchInput = document.getElementById('help-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    searchHelp(query);
                }
            }
        });
        
        // Bouton de recherche
        const searchButton = document.querySelector('.search-icon');
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const query = searchInput.value.trim();
                if (query) {
                    searchHelp(query);
                }
            });
        }
    }
    
    // Gestionnaire pour le contenu expansible
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const content = this.nextElementSibling;
            
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
    
    // Gestionnaire pour l'accordéon
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            
            // Fermer tous les autres contenus d'accordéon dans le même groupe
            const parent = this.parentElement.parentElement;
            parent.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.display = 'none';
                }
            });
            
            // Basculer l'affichage du contenu actuel
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
    
    // Gestionnaire pour les questions de FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
    
    // Gestionnaire pour le filtre de FAQ
    const faqFilters = document.querySelectorAll('.faq-filter-btn');
    faqFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            
            // Mettre à jour le bouton actif
            document.querySelectorAll('.faq-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filtrer les questions
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gestionnaire pour le bouton de contact
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            showContactDialog();
        });
    }
    
    // Gestionnaire pour le bouton de chat
    const chatBtn = document.querySelector('.chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            showChatDialog();
        });
    }
});

function searchHelp(query) {
    // Dans une vraie application, cette fonction rechercherait dans la base de connaissances
    console.log('Recherche:', query);
    
    // Simuler une recherche
    // 1. Activer la section FAQ par défaut
    document.querySelectorAll('.nav-section').forEach(s => {
        s.classList.remove('active');
    });
    document.querySelectorAll('.help-section').forEach(content => {
        content.classList.remove('active');
    });
    
    const faqSection = document.querySelector('.nav-section[data-section="faq"]');
    if (faqSection) {
        faqSection.classList.add('active');
    }
    
    const faqContent = document.getElementById('faq');
    if (faqContent) {
        faqContent.classList.add('active');
    }
    
    // 2. Afficher une notification
    showNotification(`Recherche de "${query}" dans la base de connaissances`);
    
    // 3. Dans une application réelle, cette fonction filtrerait et afficherait les résultats
}

function searchByTopic(topic) {
    console.log('Recherche par sujet:', topic);
    
    // Rediriger vers la section appropriée en fonction du sujet
    let targetSection = 'getting-started';
    
    switch(topic) {
        case 'vpn':
        case 'adblock':
        case 'firewall':
        case 'scan':
            targetSection = 'services';
            break;
        case 'setup':
            targetSection = 'getting-started';
            break;
    }
    
    // Activer la section correspondante
    document.querySelectorAll('.nav-section').forEach(s => {
        s.classList.remove('active');
    });
    document.querySelectorAll('.help-section').forEach(content => {
        content.classList.remove('active');
    });
    
    const section = document.querySelector(`.nav-section[data-section="${targetSection}"]`);
    if (section) {
        section.classList.add('active');
    }
    
    const content = document.getElementById(targetSection);
    if (content) {
        content.classList.add('active');
    }
    
    // Afficher une notification
    showNotification(`Navigation vers le sujet: ${topic}`);
}

function showContactDialog() {
    // Dans une vraie application, cette fonction afficherait un formulaire de contact
    alert("Dans une application réelle, un formulaire de contact s'ouvrirait ici pour vous permettre d'envoyer un message au support.");
}

function showChatDialog() {
    // Dans une vraie application, cette fonction ouvrirait une interface de chat
    alert("Dans une application réelle, une fenêtre de chat en direct s'ouvrirait ici pour vous connecter avec un agent de support.");
}
