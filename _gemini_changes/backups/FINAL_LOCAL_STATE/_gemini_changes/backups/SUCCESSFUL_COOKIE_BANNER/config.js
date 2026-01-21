var klaroConfig = {
    // Standard-Sprache
    lang: 'de',
    
    // Wo die Einstellungen im Browser gespeichert werden
    storageMethod: 'cookie',
    cookieName: 'klaro_v5', /* Reset für Neuanzeige */
    cookieExpiresAfterDays: 365,

    // Hier legen wir fest, dass wir das Design selbst anpassen
    styling: {
        theme: ['dark'],
    },

    // Die Texte im Banner
    translations: {
        de: {
            consentModal: {
                title: 'Datenschutzeinstellungen',
                description: 'Wir nutzen Cookies und Tracking-Tools, um unsere Website zu optimieren und unser Marketing auszuwerten.',
            },
            consentNotice: {
                description: 'Wir nutzen Cookies für Performance & Marketing.',
                learnMore: 'Einstellungen',
            },
            ok: 'Das ist okay',
            decline: 'Ich lehne ab',
            purposes: {
                analytics: 'Analyse & Statistik',
                marketing: 'Marketing & Retargeting',
            },
            facebook: {
                description: 'Wird genutzt, um den Erfolg unserer Meta-Werbekampagnen zu messen und dir relevante Werbung anzuzeigen.',
            },
            googleanalytics: {
                description: 'Hilft uns zu verstehen, wie Besucher mit unserer Website interagieren.',
            }
        },
    },

    // Die Dienste (Meta Pixel & Google Analytics)
    services: [
        {
            name: 'facebook',
            title: 'Meta Pixel (Facebook)',
            purposes: ['marketing'],
            // Standardmäßig aus
            default: false,
        },
        {
            name: 'googleanalytics',
            title: 'Google Analytics',
            purposes: ['analytics'],
            default: false,
        }
    ],
};
