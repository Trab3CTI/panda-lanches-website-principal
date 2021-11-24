function openModal(){
    document.querySelector('.cancelModal').classList.toggle('show')
}

function loadPrice(){
    let newPrice = localStorage.getItem('finalTotal')
    let convertedPrice = newPrice
    document.querySelector('.recivedPrice').innerHTML = `R$${convertedPrice}`
}

function closeCancelModal(){
    document.querySelector('.cancelModal').classList.toggle('show')
}

function removeRequest(){
    document.querySelector('.request').style.display = 'none'
    document.querySelector('.cancelModal').classList.toggle('show')
    document.querySelector('.requests').innerHTML ='<h1 style="font-size: 35px;">Nenhum Pedido Encotrado</h1>'
}