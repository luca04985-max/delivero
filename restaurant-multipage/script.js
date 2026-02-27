document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.form').forEach(f=>{
    f.addEventListener('submit',e=>{e.preventDefault();alert('Grazie! Il messaggio è stato inviato.');f.reset();})
  })
})