(() => {
  function applyDeclineSize(node) {
    const el = node || document.querySelector('.klaro .cm-btn.cm-btn-decline');
    if (!el) return false;
    el.style.setProperty('font-size', '26px', 'important');
    el.style.setProperty('line-height', '1.2', 'important');
    el.style.setProperty('font-weight', '600', 'important');
    return true;
  }

  const tryApply = () => {
    if (applyDeclineSize()) return;
    const obs = new MutationObserver(() => {
      if (applyDeclineSize()) obs.disconnect();
    });
    obs.observe(document.documentElement || document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryApply);
  } else {
    tryApply();
  }
})();

