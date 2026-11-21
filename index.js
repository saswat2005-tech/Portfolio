const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

if (menuToggle && navigation) {
    const closeNavigation = () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        navigation.classList.remove('is-open');
    };

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isExpanded));
        menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
        navigation.classList.toggle('is-open', !isExpanded);
    });

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeNavigation);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeNavigation();
    });

    document.addEventListener('click', (event) => {
        if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
            closeNavigation();
        }
    });
}

document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
}

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    const draftResult = document.querySelector('#draftResult');
    const draftText = document.querySelector('#draftText');
    const formStatus = document.querySelector('#formStatus');
    const copyDraft = document.querySelector('#copyDraft');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const name = String(formData.get('name')).trim();
        const email = String(formData.get('email')).trim();
        const message = String(formData.get('message')).trim();

        draftText.value = `From: ${name} <${email}>\n\n${message}`;
        draftResult.hidden = false;
        formStatus.textContent = 'Your draft is ready. Copy it to send using your preferred contact method.';
        draftResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    copyDraft.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(draftText.value);
            formStatus.textContent = 'Message copied to clipboard.';
        } catch (error) {
            draftText.focus();
            draftText.select();
            formStatus.textContent = 'Clipboard access is unavailable. The draft is selected so you can copy it manually.';
        }
    });
}
