const projects=window.PORTFOLIO_PROJECTS;
const key=new URLSearchParams(location.search).get('category');
const project=projects[key];
const stream=document.querySelector('#project-stream');
Object.entries(projects).forEach(([slug,item])=>{const a=document.createElement('a');a.href='work.html?category='+slug;a.textContent=item.title;if(slug===key)a.setAttribute('aria-current','page');document.querySelector('.project-links').append(a)});
if(project){document.title=project.title+' · 钟英杰';document.querySelector('#project-title').textContent=project.title;document.querySelector('#project-count').textContent='钟英杰 / 数字媒体艺术';project.images.forEach((item,index)=>{const image=new Image();image.src=item.src;image.alt=item.alt;image.width=item.width;image.height=item.height;image.loading=index===0?'eager':'lazy';image.decoding='async';if(index===0)image.fetchPriority='high';stream.append(image)})}else{document.querySelector('#project-title').textContent='请选择作品分类';stream.className='project-error';stream.textContent='通过上方分类查看作品，或返回作品目录。'}
