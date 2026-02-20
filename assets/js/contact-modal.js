/* ================================================
   CONTACT MODAL SCRIPT
   Handles popup opening/closing
   ================================================ */

(function() {
    'use strict';

    // Open Modal Function
    window.openContactModal = function() {
        const modal = document.getElementById('contact-modal-overlay');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    // Close Modal Function
    window.closeContactModal = function() {
        const modal = document.getElementById('contact-modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    // Close on Escape Key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeContactModal();
        }
    });

    // Close on Overlay Click (but not on modal content)
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('contact-modal-overlay');
        if (e.target === modal) {
            closeContactModal();
        }
    });

    // Prevent modal content clicks from closing
    const modalContent = document.querySelector('.contact-modal');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

})();
