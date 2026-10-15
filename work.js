const projects=window.PORTFOLIO_PROJECTS;
const key=new URLSearchParams(location.search).get('category');
const project=projects[key];
const stream=document.querySelector('#project-stream');
Object.entries(projects).forEach(([slug,item])=>{const a=document.createElement('a');a.href='work.html?category='+slug;a.textContent=item.title;if(slug===key)a.setAttribute('aria-current','page');document.querySelector('.project-links').append(a)});
if(project){
 document.title=project.title+' · 钟英杰';document.querySelector('#project-title').textContent=project.title;
 const mode=document.createElement('button');mode.type='button';mode.textContent='查看高清';mode.setAttribute('aria-pressed','false');mode.style.cssText='border:1px solid #aaa18c;background:transparent;padding:7px 12px;font-size:12px';document.querySelector('#project-count').append(mode);
 let high=false;mode.addEventListener('click',()=>{high=!high;mode.setAttribute('aria-pressed',String(high));mode.textContent=high?'切换省流量':'查看高清';stream.querySelectorAll('source').forEach(s=>s.media=high?'not all':'(max-width: 650px)')});
 const load=picture=>{if(picture.dataset.loaded)return;picture.dataset.loaded='true';const item=project.images[Number(picture.dataset.index)];const source=picture.querySelector('source');if(item.mobile)source.srcset=item.mobile;picture.querySelector('img').src=item.src;};
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){load(e.target);observer.unobserve(e.target)}})},{rootMargin:'500px 0px'}):null;
 project.images.forEach((item,index)=>{const picture=document.createElement('picture');picture.dataset.index=index;picture.style.display='block';const source=document.createElement('source');source.media='(max-width: 650px)';source.type='image/webp';picture.append(source);const image=document.createElement('img');image.alt=item.alt;image.width=item.width;image.height=item.height;image.decoding='async';if(index===0)image.fetchPriority='high';picture.append(image);stream.append(picture);if(index===0||!observer)load(picture);else observer.observe(picture)});
}else{document.querySelector('#project-title').textContent='请选择作品分类';stream.className='project-error';stream.textContent='通过上方分类查看作品，或返回作品目录。';}
