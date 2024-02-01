const name = document.getElementById('name');
const price = document.getElementById('price');
const izoh = document.getElementById('izoh');
const but = document.getElementById('but');
const form = document.getElementById('form');
const box = document.getElementById('box');
const edit = document.getElementById('edit');

function createCard(phone) {
    return `
    <div class="card"  data-id = "data_${phone.id}">

        <h2 id="link">${phone.name}</h2>
        <h5>${phone.price}</h5>
        <span>${phone.description}</span>

        <div class="btn">

            <button id="del">Delete</button>
            

        </div>
    </div>
    `
}

document.addEventListener('DOMContentLoaded', function() {

    fetch("https://auth-rg69.onrender.com/api/products/all", {
        method: "GET"
    })

    .then((res) => res.json())
    .then(data => {

        if (data.length) {
            data.forEach(phone => {
                let card = createCard(phone);
                box.innerHTML += card;
                
            });

            const del = document.querySelectorAll('#del');
            if (del.length) {
                del.forEach(a => {
                    a && a.addEventListener('click', function() {
                        let id = this.parentNode.parentNode.getAttribute('data-id').substring(5);
                        if (id) {
                            let isDelete = confirm('Rostanham ochirmoqchimisz?');
                            if (isDelete) {

                                fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
                                    method: "DELETE"
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        console.log(data);
                                        if (data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
                                            window.location.reload();
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })

                            }
                        }
                        // let id = this?.parentNode?.getAttribute('data-id').substring(5);
                        // console.log(id);
                        // if (id) {
                        //     console.log('salom');
                        // }
                    })
                })
            }

            const info = document.querySelectorAll('#link');
            console.log(info);
            if (info.length) {
                info.forEach(item => {
                    item && item.addEventListener('click', function() {
                        console.log('salom');

                        let id = this.parentNode.getAttribute('data-id').substring(5);
                        if (id) {
                            let as = window.location.href;
                            console.log(as);
                            let domain = as.search('index');
                            let finnId = as.substring(0, domain)
                            console.log(finnId);
                            window.location.assign(`${finnId}./page/info.html?id=${id}`)
                        }

                    })
                })
            }
        }

    })
    .catch(err => {
        console.log(err);
    })
})

function validate(name, price) {

    if (!name.value) {
        alert('name bosh');
        name.focus();
        return false;
    }

    if (name.value.trim().length < 3) {
        alert('name 3 ta belgidan katta bolishi kerak');
        name.focus();
        return false;
    }

    if (!Number(price.value)) {
        alert('narxni kiritish shart');
        name.focus();
        return false;
    }

    return true
}

but && but.addEventListener('click', function(e) {

    e.preventDefault()

    console.log('gandon');

    if (validate(name, price)) {
        console.log('qalesz');

        let phone = {
            name: name.value,
            price: price.value,
            description: izoh.value,
            status: "active",
            category_id: "2"
        }
        console.log('alik');
        fetch("https://auth-rg69.onrender.com/api/products", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(phone)
        })
            .then((res) => res.json())
            .then(data => {
                if (data.id) {
                    let card = createCard(phone);
                    box.innerHTML += card;
                    window.location.reload();
                    form.reset();
                }
            })
            .catch(err => {
                console.log(err);
            })

    } else {
        console.log('yaxshi');
    }
});

// if (del.length) {
//     del.forEach(a => {
//         a && a.addEventListener('click', function() {
//             let id = this?.parentNode?.getAttribute('data-id').substring(5);
//             if (id) {
//                 let isDelete = confirm('Rostanham ochirmoqchimisz?');
//                 if (isDelete) {
//                     console.log('salom');
//                     // fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
//                     //     method: "DELETE"
//                     // })
//                     // .then(res => res.json())
//                     // .then(data => {
//                     //     if (data.messaga == "Mahsulot muvaffaqiyatli o'chirildi") {
//                     //       window.location.reload();
//                     //     }
//                     // })
//                     // .catch(err => {
//                     //     console.log(err);
//                     // })
//                 }
//             }
//         })
//     })
// }


