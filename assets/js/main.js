
(function(){
  const html = document.documentElement;
  const stored = localStorage.getItem('lang') || 'ar';
  setLang(stored);

  const btnAr = document.querySelector('[data-lang-btn="ar"]');
  const btnEn = document.querySelector('[data-lang-btn="en"]');
  if(btnAr) btnAr.addEventListener('click', ()=> setLang('ar'));
  if(btnEn) btnEn.addEventListener('click', ()=> setLang('en'));

  function setLang(lang){
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.lang-switch button').forEach(b=>{
      b.classList.toggle('active', b.dataset.langBtn===lang);
    });
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      // Hide/show paired elements if they have language classes
      if(el.classList.contains('ar')){
        el.style.display = (lang==='ar') ? '' : 'none';
      }
      if(el.classList.contains('en')){
        el.style.display = (lang==='en') ? '' : 'none';
      }
    });
  }

  // Quote form -> WhatsApp
  const qf = document.getElementById('quoteForm');
  if(qf){
    qf.addEventListener('submit', function(e){
      e.preventDefault();
      const lang = document.documentElement.lang || 'ar';
      const name = qf.querySelector('[name="name"]').value.trim();
      const phone = qf.querySelector('[name="phone"]').value.trim();
      const email = qf.querySelector('[name="email"]').value.trim();
      const area = qf.querySelector('[name="area"]').value.trim();
      const brand = qf.querySelector('[name="brand"]').value;
      const pkg = qf.querySelector('[name="package"]').value;
      const cams = qf.querySelector('[name="cams"]').value;
      const extra = qf.querySelector('[name="extra"]').value;
      const msg_ar = `طلب عرض سعر جديد:\nالاسم: ${name}\nالهاتف: ${phone}\nالبريد: ${email}\nالمنطقة: ${area}\nالبراند: ${brand}\nالباقة: ${pkg}\nعدد الكاميرات: ${cams}\nأمتار إضافية: ${extra}`;
      const msg_en = `New Quote Request:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nArea: ${area}\nBrand: ${brand}\nPackage: ${pkg}\nCameras: ${cams}\nExtra meters: ${extra}`;
      const text = encodeURIComponent(lang==='ar' ? msg_ar : msg_en);
      const wa = 'https://wa.me/201067034093?text=' + text; // Egypt +20 1067034093
      window.open(wa, '_blank');
    });
  }

  // Highlight active nav
  const active = document.body.dataset.page;
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.dataset.page === active){
      a.classList.add('active');
    }
  });
})();
