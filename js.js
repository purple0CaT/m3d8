let url = "https://striveschool-api.herokuapp.com/api/product/"
let dataBase
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
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    };

    