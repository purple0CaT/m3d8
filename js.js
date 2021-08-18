let url = "https://striveschool-api.herokuapp.com/api/product/"
let dataBase

// listeners
let homePage = document.getElementById('homePage')
let backPage = document.getElementById('backOffice')
function home(){
    homePage.classList.remove('d-none')
    backPage.classList.add('d-none')
    loadData()
}
function post() {
    homePage.classList.add('d-none')
    backPage.classList.remove('d-none')
    itemList()
}




// OnLOAD
window.onload = ()=>{
    loadData()
}

// DATA LOAD
const loadData = async ()=>{
    try {
        let response = await fetch(url, {
            method: "GET",
            headers:{
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjcwZDJkNTI2MjAwMTViNmRjOTkiLCJpYXQiOjE2MjkyODgyMDUsImV4cCI6MTYzMDQ5NzgwNX0.jHNmjWp6j4MxM-iiSgDtKjZAZdf8sa1Xpvjsm8l4wuc"
            }
        }
        );
        let data = await response.json();
        dataBase = data

        loadCard(dataBase)
        itemList()
    } catch (err) {
        console.log(err);
    }
};


// CARD LOADING HOME PAGE

function loadCard(datas) {
    homePage.innerHTML =""
    datas.forEach(elem => {
        homePage.innerHTML +=`
    <div class="col-6 col-md-3 my-2">
        <div class="card h-100">
            <img src="${elem.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${elem.name}</h5>
                <p class="card-text">${elem.brand}</p>
                <p class="card-text">${elem.description}</p>
                <strong class="card-text">${elem.price} £</strong>
                </div>
                <a href="#" class="btn btn-light">Buy</a>
        </div>
    </div>
        `
    });
}

// POST DATA
let postData = {
    name: `${document.getElementById('name').value}`,
    brand: `${document.getElementById('brand').value}`,
    description: `${document.getElementById('description').value}`,
    imageUrl: `${document.getElementById('imageUrl').value}`,
    price: `${document.getElementById('price').value}`
}

// POST FUNCTION
const submitData = async(event)=>{
    event.preventDefault()
    let postData = {
        name: document.getElementById('name').value,
        brand: document.getElementById('brand').value,
        description: document.getElementById('description').value,
        imageUrl: document.getElementById('imageUrl').value,
        price: document.getElementById('price').value
    }
    try {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjcwZDJkNTI2MjAwMTViNmRjOTkiLCJpYXQiOjE2MjkyODgyMDUsImV4cCI6MTYzMDQ5NzgwNX0.jHNmjWp6j4MxM-iiSgDtKjZAZdf8sa1Xpvjsm8l4wuc"
            }
        })

        if (response.ok) {
            const respEvent = await response.json()
            alert("Added to catalouge. ID: " + respEvent._id)

            itemList()
        } else {
            if (response.status >= 400 && response.status < 500) {
                throw new Error("User generated error, verify the data that you are sending!")
            } else if (response.status >= 500 && response.status < 600) {
                throw new Error("Server generated error, contact the admin to fix this problem.")
            }
        }
    } catch (err) {
        console.log(err);
    }
};


// create all catalogue

function itemList() {
    let allItems = document.getElementById('allItems')

    allItems.innerHTML=''
    dataBase.forEach(item => {
        allItems.innerHTML += `
        <div class="col-12 mb-1 d-flex justify-content-between align-items-center">
            <p class="m-0 p-0">${item.name}</p>
            <button class="btn btn-danger" value=${item._id} onclick="deleteItem(this.value)">Delete</button>
        </div>
        `
    })
}


const deleteItem = async(val)=>{
    try {
        let response = await fetch(url+val, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjcwZDJkNTI2MjAwMTViNmRjOTkiLCJpYXQiOjE2MjkyODgyMDUsImV4cCI6MTYzMDQ5NzgwNX0.jHNmjWp6j4MxM-iiSgDtKjZAZdf8sa1Xpvjsm8l4wuc"
            }
        })
        alert(`Item deleted`)
        loadData()
    } catch (err) {
        console.log(err);
    }
}