const deleteImg=document.querySelectorAll('.delete')

for (pic of deleteImg){
pic.addEventListener('dblclick',(e)=>{
    e.target.classList.toggle('delete-Img');
    picName=e.target.id
    const path=e.target.dataset.path.trim()
    const deletePic={picName,path};
    const options={
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(deletePic)
    }
    fetch('/yelpies/image/delete',options)
    .then(req=>{if(!req.ok){throw Error(req.status)}return req.json()})
    .then(deletePic=>{console.log(deletePic)})
    .catch(e=>console.log(e,'deleteImg req error'))
})}