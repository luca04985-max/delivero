document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
      }
    })
  })
  // Placeholder for reservation form handling
  const form=document.querySelector('.form');
  if(form) form.addEventListener('submit',e=>{e.preventDefault();alert('Richiesta di prenotazione inviata. Ti contatteremo a breve.');form.reset();})
});