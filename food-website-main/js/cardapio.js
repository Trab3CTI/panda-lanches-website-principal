//Filter Script
function filterMenu(){
    let filterItens = document.querySelector('#food').value
    let foods = document.querySelectorAll('.food-item')

    if(filterItens === 'Todos'){
        for(let i = 0; i < foodJson.length + 1; i++){
            foods[i].style.display = 'flex'
        }
    }
    
    if(filterItens === 'Hamburgers'){
        for(let i = 0; i < foodJson.length + 1; i++){
            foods[i].style.display = 'none'
            for(let h = 0 ; h < 5;h++){
                foods[h].style.display = 'flex'
            }
        }
    }

    if(filterItens === 'Batatas'){
        for(let i = 0; i < foodJson.length + 1; i++){
            foods[i].style.display = 'none'

            for(let b = 5 ; b < 7; b++){
                foods[b].style.display = 'flex'
            }
        }
    }

    if(filterItens === 'Bebidas'){
        for(let i = 0; i < foodJson.length + 1; i++){
            foods[i].style.display = 'none'

            for(let b = 7 ; b < 10; b++){
                foods[b].style.display = 'flex'
            }
        }
    }
}


//Menu
let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

// Listagem dos alimentos
foodJson.map((item, index)=>{
    let foodItem = c('.models .food-item').cloneNode(true);
    
    foodItem.setAttribute('data-key', index);
    foodItem.querySelector('.food-item--img img').src = item.img;
    foodItem.querySelector('.food-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    foodItem.querySelector('.food-item--name').innerHTML = item.name;
    foodItem.querySelector('.food-item--desc').innerHTML = item.description;
    
    foodItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.food-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.foodBig img').src = foodJson[key].img;
        c('.foodInfo h1').innerHTML = foodJson[key].name;
        c('.foodInfo--desc').innerHTML = foodJson[key].description;
        c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price.toFixed(2)}`;
        c('.foodInfo--size.selected').classList.remove('selected');
        cs('.foodInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = foodJson[key].sizes[sizeIndex];
        });

        c('.foodInfo--qt').innerHTML = modalQt;

        c('.foodWindowArea').style.opacity = 0;
        c('.foodWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.foodWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.food-area').append( foodItem );
});

// Eventos do MODAL
function closeModal() {
    c('.foodWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.foodWindowArea').style.display = 'none';
    }, 500);
}
cs('.foodInfo--cancelButton, .foodInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});
c('.foodInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--;
        c('.foodInfo--qt').innerHTML = modalQt;
    }
});
c('.foodInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.foodInfo--qt').innerHTML = modalQt;
});
cs('.foodInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.foodInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
c('.foodInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.foodInfo--size.selected').getAttribute('data-key'));
    let identifier = foodJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:foodJson[modalKey].id,
            size,
            qt:modalQt
        });
    }
    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        c('aside').style.right = '0';
    }
});
c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.right = '-100vw';
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        c('aside').style.right = '0';
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let foodItem = foodJson.find((item)=>item.id == cart[i].id);
            subtotal += foodItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);
            let foodName = `${foodItem.name}`;

            cartItem.querySelector('img').src = foodItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = foodName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        }

        desconto = subtotal * 0;
        total = subtotal - desconto;

        localStorage.setItem('finalTotal', total)

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        c('aside').style.right = '-100vh';
        c('aside').style.right = '0vh';
    }
}

function openCart(){
    document.querySelector('aside').style.right = '0'
}

function closeCart(){
    document.querySelector('aside').style.right = '-100vh'
}



function openPayModal(){
    document.querySelector('aside').style.right = '-100vh';
    document.querySelector('.payModal').style.display = 'flex'
}

function pixChoice(){
    let method1 = document.querySelector('.payArea .pixQrCode')
    method1.style.display = 'block'

    let method2 = document.querySelector('.payArea .cardAlert')
    method2.style.display = 'none'

    document.querySelector('.finishPay').style.display = 'inline-block'
}

function cardChoice(){
    let method1 = document.querySelector('.payArea .pixQrCode')
    method1.style.display = 'none'

    let method2 = document.querySelector('.payArea .cardAlert')
    method2.style.display = 'block'

    document.querySelector('.finishPay').style.display = 'inline-block'
}

function closePayMethods(){
    document.querySelector('.payModal').style.display = 'none'
}



//Confirm Payment
function openConfirmModal(){
    document.querySelector('.payModal').style.display = 'none'
    document.querySelector('.confirmPayModal').style.display = 'flex'

    let changeContent = setTimeout(()=>{
        document.querySelector('.confirmPayModal .confirmPayModalContainer').innerHTML = 
        '<i class="fa fa-check" style="font-size: 60px; color: green;"></i><h1>Pagamento Aprovado</h1>'
    }, 5000)

    let closeAproveModal = setTimeout(()=>{
        document.querySelector('.confirmPayModal').style.display = 'none'
    }, 8000)
}

function restartCart(){
    document.querySelector('.cart--item').innerHTML = ''
}


