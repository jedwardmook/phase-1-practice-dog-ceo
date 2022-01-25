console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", function(){
    let dogImageContainer = document.getElementById('dog-image-container');
    let dogUL = document.querySelector("#dog-breeds")
    //console.log(dogImageContainer);


    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(function(response){
        //console.log(response);
        return response.json();
    })
        .then(function(data) {
            let arrOfDogs = data.message;
            arrOfDogs.forEach(function(url){
            //dogImageContainer.innerHTML += makeImageTagString(url)
                dogImageContainer.append(makeImgTagElement(url))
        })
    });
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(response => {
            let dogBreeds = Object.keys(response.message)
            dogBreeds.forEach((breed) => {
                dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
            })
        })
    dogUL.addEventListener("click", function(e){
        if (e.target.dataset.info === "breed"){
            //console.log(e.target);
            e.target.style.color = "orange"
        }
    })

    let dogSelect = document.getElementById('breed-dropdown');
    dogSelect.addEventListener('change',function(e){
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then (response => {
            let dogBreeds = Object.keys(response.message)
            let filteredArray = dogBreeds.filter(breed => {
                return breed.startsWith(e.target.value)
            })

            dogUL.innerHTML = ""
            filteredArray.forEach((breed) => {
                dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
            })
        })

    })
})

//function makeImageTagString(url){
    //return `<img src="${url}"/>`
//}


function makeImgTagElement(url){
    let imgTag = document.createElement('img')
    imgTag.src = url
    return imgTag
}