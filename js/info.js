const name = document.getElementById('name');
const narx = document.getElementById('narx');
const izoh = document.getElementById('izoh');

document.addEventListener('DOMContentLoaded', function(){
    let id = window.location.href.substring(window.location.href.search('id=') + 3)
    console.log(id);
    if (id) {
        fetch(`https://auth-rg69.onrender.com/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                name.innerHTML = data.name;
                narx.innerHTML = data.price;
                izoh.innerHTML = data.description;
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
})