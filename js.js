let url = "https://striveschool-api.herokuapp.com/api/product/"
let dataBase

// listeners
let homePage = document.getElementById('homePage')
let backPage = document.getElementById('backOffice')
function home(){
    homePage.classList.remove('d-none')
    backPage.classList.add('d-none')
}
function post() {
    homePage.classList.add('d-none')
    backPage.classList.remove('d-none')
}
// OnLOAD
window.onload = ()=>{
    loadData()
}

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
    } catch (err) {
        console.log(err);
    }
};


// CARD LOADING HOME PAGE

function loadCard(datas) {
    homePage.innerHTML =""
    datas.forEach(elem => {
        homePage.innerHTML +=`
    <div class="col-6 col-md-3">
        <div class="card h-100">
            <img src="${elem.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${elem.name}</h5>
                <p class="card-text">${elem.brand}</p>
                <p class="card-text">${elem.description}</p>
                <strong class="card-text">${elem.price}</strong>
                </div>
                <a href="#" class="btn btn-light">Buy</a>
        </div>
    </div>
        `
    });
}