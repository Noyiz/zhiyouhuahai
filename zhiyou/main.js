document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.peony-slider');
  if (!slider) return;

  const cards = Array.from(slider.querySelectorAll('.peony-card'));
  const dots = Array.from(document.querySelectorAll('.peony-dot'));

  function setActive(index) {
    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function getCardWidth() {
    const firstCard = cards[0];
    if (!firstCard) return slider.clientWidth;
    const rect = firstCard.getBoundingClientRect();
    const style = window.getComputedStyle(firstCard);
    const marginRight = parseFloat(style.marginRight || '0');
    return rect.width + marginRight + 12; // approximate gap
  }

  slider.addEventListener('scroll', () => {
    const cardWidth = getCardWidth();
    if (!cardWidth) return;
    const index = Math.round(slider.scrollLeft / cardWidth);
    const clamped = Math.max(0, Math.min(index, cards.length - 1));
    setActive(clamped);
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index || '0');
      const cardWidth = getCardWidth();
      slider.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setActive(index);
    });
  });

  setActive(0);
});

