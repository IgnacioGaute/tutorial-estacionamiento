(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var header = document.querySelector('.site-header');
  var tocLinks = gsap.utils.toArray('.toc a');
  var lessons = gsap.utils.toArray('.lesson');

  var intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (header) {
    intro.fromTo(
      header,
      { opacity: 0, y: -18 },
      { opacity: 1, y: 0, duration: 0.6, clearProps: 'transform' }
    );
  }

  if (tocLinks.length) {
    intro.fromTo(
      tocLinks,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, clearProps: 'transform' },
      '-=0.25'
    );
  }

  lessons.forEach(function (lesson) {
    var number = lesson.querySelector('.lesson__number');
    var texts = lesson.querySelectorAll('.lesson__title, .lesson__desc');
    var video = lesson.querySelector('.lesson__video');
    var trigger = { trigger: lesson, start: 'top 82%', once: true };

    gsap.fromTo(
      lesson,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform', scrollTrigger: trigger }
    );

    if (number) {
      gsap.fromTo(
        number,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: 'back.out(2)', scrollTrigger: trigger }
      );
    }

    if (texts.length) {
      gsap.fromTo(
        texts,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.12, ease: 'power2.out', scrollTrigger: trigger }
      );
    }

    if (video) {
      gsap.fromTo(
        video,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, delay: 0.2, ease: 'power2.out', scrollTrigger: trigger }
      );
    }
  });
})();
