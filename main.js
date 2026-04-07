document.addEventListener('DOMContentLoaded', function () {
  function initSlider(sliderClass, cardClass, dotClass) {
    const slider = document.querySelector('.' + sliderClass);
    if (!slider) return;

    const cards = Array.from(slider.querySelectorAll('.' + cardClass));
    const dots = Array.from(document.querySelectorAll('.' + dotClass));

    function setActive(index) {
      cards.forEach((card, i) => card.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    function getCardWidth() {
      const firstCard = cards[0];
      if (!firstCard) return slider.clientWidth;
      const rect = firstCard.getBoundingClientRect();
      const marginRight = parseFloat(window.getComputedStyle(firstCard).marginRight || '0');
      return rect.width + marginRight + 12;
    }

    slider.addEventListener('scroll', () => {
      const cardWidth = getCardWidth();
      if (!cardWidth) return;
      const index = Math.round(slider.scrollLeft / cardWidth);
      setActive(Math.max(0, Math.min(index, cards.length - 1)));
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.index || '0');
        slider.scrollTo({ left: index * getCardWidth(), behavior: 'smooth' });
        setActive(index);
      });
    });

    setActive(0);
  }

  initSlider('peony-slider', 'peony-card', 'peony-dot');
  initSlider('beijing-slider', 'beijing-card', 'beijing-dot');
});

