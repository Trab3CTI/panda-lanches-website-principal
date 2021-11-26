//Change Navbar
window.addEventListener('scroll', ()=>{
    let header = document.querySelector('header')
    let banner = document.querySelector('#banner')
    header.classList.toggle('dark', window.scrollY > 100)
})


//Smooth Scroll
$(document).ready(function(){
    $("a").on('click', function(event) {
  
      if (this.hash !== "") {
        event.preventDefault();
  
        var hash = this.hash;
  
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
  
          window.location.hash = hash;
        });
      }
    });
});

//Show User Details
function showUserDetails(){
  document.querySelector('.userDetails').classList.toggle('reveal')
}

function openExitModal(){
  document.querySelector('.exitModal').style.display = 'flex'
}

function returnToLogin(){
  window.location.href = './login.html'
}

function hideModal(){
  document.querySelector('.exitModal').style.display = 'none'
}


let foodJson = [
  {id:1, name:'X-Ratão', type:'burger', img:'./images/hamb1.png', price:22.95,  description:'Lorem Ipsun Morat Aranaes Afodentas'},
  {id:2, name:'X-Raiz', type:'burger', img:'./images/hamb3.png', price:15.20, description:'Lorem Ipsun Morat Aranaes Afodentas'},
  {id:3, name:'x-Frango', type:'burger', img:'./images/xFrango.png', price:39.90, description:'Lorem Ipsun Morat Aranaes Afodentas'}
];

foodJson.map((item, index) =>{
  let {img, name, price, description, type} = item
  let foodItem = document.querySelector('.model .foodCard').cloneNode(true)
  document.querySelector('.model .foodCard').classList.add(`${type}`)

  foodItem.querySelector('.foodCard .foodImage img').setAttribute('src',  `${img}`)
  foodItem.querySelector('.foodName').innerHTML = name
  foodItem.querySelector('.foodPrice').innerHTML = `R$ ${price.toFixed(2)}`
  foodItem.querySelector('.foodDesc').innerHTML = description
  
  document.querySelector('.foodOptions').append(foodItem)
})



window.addEventListener('load', function(){
	new Glider(document.querySelector('.carouselArea'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: {
			prev: '.prev',
			next: '.next'
		},
	});
});






 