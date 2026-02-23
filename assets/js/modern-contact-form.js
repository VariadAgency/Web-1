/**
 * MODERN MULTI-STEP CONTACT FORM 2026
 * Features: Progressive disclosure, Real-time validation,
 * Smooth animations, Accessibility, localStorage persistence
 */

(function() {
    'use strict';

    // =================================
    // CONFIGURATION & STATE
    // =================================

    const CONFIG = {
        animationDuration: 250, // 250ms optimal for web (research-based)
        localStorageKey: 'variad_contact_form_draft',
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phoneRegex: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        submitEmail: atob('aW5mb0B2YXJpYWQtYWdlbmN5LmRl')
    };

    const state = {
        currentStep: 0,
        formData: {
            service: null,
            budget: 1000,
            description: '',
            name: '',
            company: '',
            email: '',
            phone: ''
        },
        isValid: {
            step0: false,
            step1: true,
            step2: true,
            step3: false
        }
    };

    // =================================
    // DOM ELEMENTS
    // =================================

    const elements = {
        form: null,
        steps: [],
        progressSteps: [],
        progressLabels: [],
        progressFill: null,
        btnBack: null,
        btnNext: null,
        budgetSlider: null,
        budgetValue: null
    };

    // =================================
    // INITIALIZATION
    // =================================

    function init() {
        // Get DOM elements
        elements.form = document.getElementById('modern-contact-form');
        if (!elements.form) {
            console.warn('[ModernForm] Form not found');
            return;
        }

        elements.steps = Array.from(elements.form.querySelectorAll('.form-step'));
        elements.progressSteps = Array.from(elements.form.querySelectorAll('.progress-step'));
        elements.progressLabels = Array.from(elements.form.querySelectorAll('.progress-label'));
        elements.progressFill = elements.form.querySelector('.progress-line-fill');
        elements.btnBack = elements.form.querySelector('.btn-back');
        elements.btnNext = elements.form.querySelector('.btn-next');
        elements.budgetSlider = document.getElementById('budget-slider');
        elements.budgetValue = document.getElementById('budget-value');

        // Load saved draft
        loadDraft();

        // Setup event listeners
        setupEventListeners();

        // Initialize first step
        updateUI();

        console.log('[ModernForm] Initialized successfully');
    }

    // =================================
    // EVENT LISTENERS
    // =================================

    function setupEventListeners() {
        // Navigation buttons
        elements.btnBack?.addEventListener('click', handleBack);
        elements.btnNext?.addEventListener('click', handleNext);

        // Progress step indicators (allow clicking)
        elements.progressSteps.forEach((step, index) => {
            step.addEventListener('click', () => goToStep(index));
        });

        // Service selection chips
        const serviceChips = elements.form.querySelectorAll('[data-service]');
        serviceChips.forEach(chip => {
            chip.addEventListener('click', () => handleServiceSelect(chip));
        });

        // Budget slider
        if (elements.budgetSlider) {
            elements.budgetSlider.addEventListener('input', handleBudgetChange);
            elements.budgetSlider.addEventListener('change', saveDraft);
        }

        // Form inputs with real-time validation
        const inputs = elements.form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
                saveDraft();
            });
            input.addEventListener('blur', () => validateInput(input));
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
    }

    // =================================
    // NAVIGATION HANDLERS
    // =================================

    function handleBack() {
        if (state.currentStep > 0) {
            goToStep(state.currentStep - 1);
        }
    }

    function handleNext() {
        const currentStepKey = `step${state.currentStep}`;

        // Validate current step
        if (!state.isValid[currentStepKey]) {
            showStepError(state.currentStep);
            return;
        }

        // Last step - submit
        if (state.currentStep === elements.steps.length - 1) {
            submitForm();
            return;
        }

        // Go to next step
        goToStep(state.currentStep + 1);
    }

    function goToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= elements.steps.length) return;
        if (stepIndex === state.currentStep) return;

        const direction = stepIndex > state.currentStep ? 'forward' : 'backward';
        const currentStepEl = elements.steps[state.currentStep];
        const nextStepEl = elements.steps[stepIndex];

        // Add exiting class to current step
        currentStepEl.classList.add('exiting');

        // Wait for exit animation
        setTimeout(() => {
            // Hide current step
            currentStepEl.classList.remove('active', 'exiting');

            // Show next step
            nextStepEl.classList.add('active');

            // Update state
            state.currentStep = stepIndex;

            // Update UI
            updateUI();

            // Focus first input in new step
            focusFirstInput(nextStepEl);

            // Save state
            saveDraft();
        }, CONFIG.animationDuration);
    }

    // =================================
    // SERVICE SELECTION
    // =================================

    function handleServiceSelect(chip) {
        const service = chip.getAttribute('data-service');

        // Update UI
        const allChips = elements.form.querySelectorAll('[data-service]');
        allChips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');

        // Update state
        state.formData.service = service;
        state.isValid.step0 = true;

        // Micro-interaction: Auto-advance after selection
        setTimeout(() => {
            if (state.currentStep === 0) {
                goToStep(1);
            }
        }, 600);

        saveDraft();
    }

    // =================================
    // BUDGET SLIDER
    // =================================

    function handleBudgetChange(event) {
        const value = parseInt(event.target.value, 10);
        state.formData.budget = value;

        // Update display
        if (elements.budgetValue) {
            const formatted = value >= 2500
                ? '> 2.500 €'
                : new Intl.NumberFormat('de-DE').format(value) + ' €';
            elements.budgetValue.textContent = formatted;
        }

        // Update slider background (visual feedback)
        updateSliderBackground(value);
    }

    function updateSliderBackground(value) {
        if (!elements.budgetSlider) return;

        const min = parseInt(elements.budgetSlider.min, 10);
        const max = parseInt(elements.budgetSlider.max, 10);
        const percentage = ((value - min) / (max - min)) * 100;

        elements.budgetSlider.style.background = `linear-gradient(to right,
            rgba(220, 38, 38, 0.3) 0%,
            rgba(251, 146, 60, 0.3) ${percentage}%,
            rgba(255, 255, 255, 0.1) ${percentage}%,
            rgba(255, 255, 255, 0.1) 100%)`;
    }

    // =================================
    // VALIDATION
    // =================================

    function validateInput(input) {
        const value = input.value.trim();
        const id = input.id;
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        clearInputError(input);

        switch (id) {
            case 'contact-name':
                isValid = value.length >= 2;
                errorMessage = 'Bitte gib deinen Namen an (mindestens 2 Zeichen)';
                state.formData.name = value;
                break;

            case 'contact-company':
                state.formData.company = value;
                isValid = true; // Optional field
                break;

            case 'contact-email':
                isValid = value === '' || CONFIG.emailRegex.test(value);
                errorMessage = 'Bitte gib eine gültige E-Mail-Adresse an';
                state.formData.email = value;
                break;

            case 'contact-phone':
                isValid = value === '' || CONFIG.phoneRegex.test(value);
                errorMessage = 'Bitte gib eine gültige Telefonnummer an';
                state.formData.phone = value;
                break;

            case 'contact-description':
                state.formData.description = value;
                isValid = true; // Optional field
                break;
        }

        // Visual feedback
        if (value.length > 0) {
            if (isValid) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
                input.classList.add('invalid');
                showInputError(input, errorMessage);
            }
        } else {
            input.classList.remove('valid', 'invalid');
        }

        // Update step validation
        updateStepValidation();

        return isValid;
    }

    function updateStepValidation() {
        // Step 0: Service selected
        state.isValid.step0 = !!state.formData.service;

        // Step 1: Budget (always valid)
        state.isValid.step1 = true;

        // Step 2: Description (optional)
        state.isValid.step2 = true;

        // Step 3: Name + (Email OR Phone)
        const hasName = state.formData.name.length >= 2;
        const hasValidEmail = CONFIG.emailRegex.test(state.formData.email);
        const hasValidPhone = CONFIG.phoneRegex.test(state.formData.phone);
        state.isValid.step3 = hasName && (hasValidEmail || hasValidPhone);
    }

    function showInputError(input, message) {
        const parent = input.closest('.form-group');
        if (!parent) return;

        let errorEl = parent.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            parent.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    function clearInputError(input) {
        const parent = input.closest('.form-group');
        if (!parent) return;

        const errorEl = parent.querySelector('.error-message');
        if (errorEl) {
            errorEl.remove();
        }
    }

    function showStepError(stepIndex) {
        const stepEl = elements.steps[stepIndex];
        if (!stepEl) return;

        let errorEl = stepEl.querySelector('.step-error');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message step-error';
            errorEl.style.marginTop = '1rem';
            stepEl.appendChild(errorEl);
        }

        switch (stepIndex) {
            case 0:
                errorEl.textContent = 'Bitte wähle einen Service aus.';
                break;
            case 3:
                errorEl.textContent = 'Bitte gib deinen Namen und mindestens E-Mail oder Telefon an.';
                break;
            default:
                errorEl.textContent = 'Bitte fülle alle Pflichtfelder aus.';
        }

        // Shake animation
        stepEl.style.animation = 'none';
        setTimeout(() => {
            stepEl.style.animation = 'shake 0.3s ease';
        }, 10);
    }

    // =================================
    // UI UPDATES
    // =================================

    function updateUI() {
        // Update progress bar
        updateProgressBar();

        // Update button states
        updateButtonStates();

        // Update step indicators
        updateStepIndicators();

        // Update progress labels
        updateProgressLabels();
    }

    function updateProgressBar() {
        if (!elements.progressFill) return;

        const progress = (state.currentStep / (elements.steps.length - 1)) * 100;
        elements.progressFill.style.width = `${progress}%`;
    }

    function updateButtonStates() {
        // Back button
        if (elements.btnBack) {
            elements.btnBack.disabled = state.currentStep === 0;
        }

        // Next button
        if (elements.btnNext) {
            const currentStepKey = `step${state.currentStep}`;
            elements.btnNext.disabled = !state.isValid[currentStepKey];

            // Update text
            const isEn = document.documentElement.lang.startsWith('en');
            if (state.currentStep === elements.steps.length - 1) {
                elements.btnNext.innerHTML = isEn ? '<span>Send Inquiry</span>' : '<span>Anfrage absenden</span>';
            } else {
                elements.btnNext.innerHTML = isEn ? '<span>Next</span>' : '<span>Weiter</span>';
            }
        }
    }

    function updateStepIndicators() {
        elements.progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');

            if (index === state.currentStep) {
                step.classList.add('active');
            } else if (index < state.currentStep) {
                step.classList.add('completed');
            }
        });
    }

    function updateProgressLabels() {
        elements.progressLabels.forEach((label, index) => {
            label.classList.toggle('active', index === state.currentStep);
        });
    }

    function focusFirstInput(stepEl) {
        const firstInput = stepEl.querySelector('.form-input, .form-textarea, .option-chip');
        if (firstInput) {
            setTimeout(() => {
                firstInput.focus({ preventScroll: true });
            }, CONFIG.animationDuration + 50);
        }
    }

    // =================================
    // FORM SUBMISSION
    // =================================

    function submitForm() {
        // Show loading state
        elements.btnNext.classList.add('loading');
        elements.btnNext.disabled = true;

        // Prepare email content
        const subject = `Anfrage: ${state.formData.service || 'Projekt'} – ${state.formData.name}`;
        const budgetFormatted = state.formData.budget >= 2500
            ? '> 2.500 €'
            : new Intl.NumberFormat('de-DE').format(state.formData.budget) + ' €';

        const body = `
Name: ${state.formData.name}
Unternehmen: ${state.formData.company || '-'}
E-Mail: ${state.formData.email || '-'}
Telefon: ${state.formData.phone || '-'}

Service: ${state.formData.service || '-'}
Budget: ${budgetFormatted}

Beschreibung:
${state.formData.description || 'Keine Angabe'}
        `.trim();

        // Save to localStorage as backup
        try {
            localStorage.setItem(CONFIG.localStorageKey + '_submitted', JSON.stringify({
                ...state.formData,
                timestamp: new Date().toISOString()
            }));
        } catch (e) {
            console.warn('[ModernForm] Failed to save backup:', e);
        }

        // Simulate API delay (replace with actual API call)
        setTimeout(() => {
            // Open mailto as fallback
            const mailtoLink = `mailto:${CONFIG.submitEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            // Show success state
            showSuccessState();

            // Clear form after delay
            setTimeout(() => {
                clearForm();
            }, 5000);
        }, 1000);
    }

    function showSuccessState() {
        const formSteps = elements.form.querySelector('.form-steps');
        const navigation = elements.form.querySelector('.form-navigation');

        if (!formSteps) return;

        // Hide steps and navigation
        formSteps.style.display = 'none';
        if (navigation) navigation.style.display = 'none';

        // Create and show success message
        const successHTML = `
            <div class="success-state">
                <div class="success-icon">✓</div>
                <h3 class="success-title">Vielen Dank für deine Anfrage!</h3>
                <p class="success-message">
                    Wir haben deine Nachricht erhalten und melden uns schnellstmöglich bei dir.<br>
                    In der Zwischenzeit wird dein E-Mail-Client geöffnet, um die Anfrage zu senden.
                </p>
            </div>
        `;

        formSteps.insertAdjacentHTML('afterend', successHTML);
    }

    function clearForm() {
        // Reset state
        state.currentStep = 0;
        state.formData = {
            service: null,
            budget: 1000,
            description: '',
            name: '',
            company: '',
            email: '',
            phone: ''
        };
        state.isValid = {
            step0: false,
            step1: true,
            step2: true,
            step3: false
        };

        // Clear localStorage
        try {
            localStorage.removeItem(CONFIG.localStorageKey);
        } catch (e) {}

        // Reset form (reload page for simplicity)
        // In production, you might want to manually reset all fields
        setTimeout(() => {
            window.location.hash = '#contact';
            window.location.reload();
        }, 3000);
    }

    // =================================
    // PERSISTENCE
    // =================================

    function saveDraft() {
        try {
            localStorage.setItem(CONFIG.localStorageKey, JSON.stringify({
                currentStep: state.currentStep,
                formData: state.formData,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('[ModernForm] Failed to save draft:', e);
        }
    }

    function loadDraft() {
        try {
            const draft = localStorage.getItem(CONFIG.localStorageKey);
            if (!draft) return;

            const data = JSON.parse(draft);

            // Check if draft is not too old (24 hours)
            const age = Date.now() - data.timestamp;
            if (age > 24 * 60 * 60 * 1000) {
                localStorage.removeItem(CONFIG.localStorageKey);
                return;
            }

            // Restore data
            if (data.formData) {
                state.formData = { ...state.formData, ...data.formData };

                // Restore form values
                if (state.formData.service) {
                    const chip = elements.form.querySelector(`[data-service="${state.formData.service}"]`);
                    if (chip) chip.classList.add('selected');
                }

                if (state.formData.budget && elements.budgetSlider) {
                    elements.budgetSlider.value = state.formData.budget;
                    handleBudgetChange({ target: elements.budgetSlider });
                }

                // Restore text inputs
                ['name', 'company', 'email', 'phone', 'description'].forEach(field => {
                    const input = document.getElementById(`contact-${field}`);
                    if (input && state.formData[field]) {
                        input.value = state.formData[field];
                        validateInput(input);
                    }
                });
            }

            console.log('[ModernForm] Draft restored');
        } catch (e) {
            console.warn('[ModernForm] Failed to load draft:', e);
        }
    }

    // =================================
    // KEYBOARD NAVIGATION
    // =================================

    function handleKeyboard(event) {
        // Only handle if form is visible
        if (!elements.form || !elements.form.offsetParent) return;

        // Enter key on next button
        if (event.key === 'Enter' && document.activeElement === elements.btnNext) {
            handleNext();
        }

        // Escape key to go back
        if (event.key === 'Escape' && state.currentStep > 0) {
            handleBack();
        }

        // Arrow keys for navigation
        if (event.key === 'ArrowRight' && !event.target.matches('input, textarea')) {
            handleNext();
        }
        if (event.key === 'ArrowLeft' && !event.target.matches('input, textarea')) {
            handleBack();
        }
    }

    // =================================
    // AUTO-INIT ON DOM READY
    // =================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
