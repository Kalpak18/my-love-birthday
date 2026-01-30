const blocks=document.querySelectorAll('.block');
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('show')}}),{threshold:.2});
blocks.forEach(b=>obs.observe(b));