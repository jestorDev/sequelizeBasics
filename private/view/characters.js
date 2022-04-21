


const simba={
    "ID" : 2,
    "name": "Simba",
    "image": "https://static.wikia.nocookie.net/disney/images/3/37/Profile_-_Simba.jpeg",
    "age": 18,
    "weitgh": 200,
    "history": " Simba is the protagonist of Disney's 1994 animated feature film, The Lion King. He is the son of Mufasa and Sarabi, who was destined to rule the Pride Lands, as king. When Mufasa was murdered by his treacherous brother, Scar, Simba was exiled from the Pride Lands after his uncle tricked him into taking the blame for his father's death. He finds refuge in a jungle oasis with Timon and Pumbaa who raise him as his adoptive fathers, but when the Pride Lands fall to disarray during his absence. With the kingdom in peril, Simba is forced to confront his troubled past and take his place in the \"Circle of Life\". ",
    "movies":[
        {
            "title": "The Lion King",
            "image": "https://static.wikia.nocookie.net/disney/images/6/63/The_lion_king_poster.jpg",
            "creation_date": "1994-06-24",
            "rating": "4.6"
        },
        {
            "title": "The Lion King II: Simba's Pride",
            "image": "https://static.wikia.nocookie.net/disney/images/9/9b/The_Lion_King_II-Simba%27s_Pride_poster.jpg",
            "creation_date": "1998-10-27",
            "rating": "3.8"
        }
    ]
}


function rowCharacterComponent(character) {
    return `<tr id="row-${character.ID}">
    <td>${character.name}</td>
    <td><img src="${character.image}"></td>
    <td><a id = "details-${character.ID}" href="#" class="btn btn-info btn-circle btn-lg"
    onclick=getDetails(this.id)>
        <i class="fas fa-info-circle" ></i></a></td>
    <td><a id="update-${character.ID}" href="#" class="btn btn-warning btn-circle btn-lg"
    type="button" data-bs-toggle="modal"  data-bs-target="#exampleModal" 
    >
        <i class="fas fa-exclamation-triangle"></i></a></td>
    <td><a href="#" class="btn btn-danger btn-circle btn-lg">
        <i class="fas fa-trash"></i>
    </a></td>
</tr>
`
}


async function getCharacters() {
    let response = await fetch('/characters');
    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        var characters = await response.json()
        console.log(characters[0]);
        let list = document.getElementById("list")
        let table = ""
        characters.forEach(character=> {            
            table +=rowCharacterComponent(character);
        });

        respo = characters
        list.innerHTML = table
    }
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function   updatecharacter(id){
    console.log("Going to    updatecharacter id : " , id);
}
function   deleteCharacter(id){
console.log("Going to    deleteCharacter id : " , id);
}

function movieListComponent(moviesList) {
    let moviesListComp= ""
    moviesList.forEach(
        movie=> {moviesListComp += movieCardComponent(movie)}
    )
    return moviesListComp
}

function movieCardComponent(movie) {
    return `<div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        ${movie.title}</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                        <div>creation_date: ${movie.creation_date}</div>
                        <div>rating: ${movie.rating}</div>
                        </div>
                    </div>
                    <div class="col-auto">
                    <img class="mt-2" src="${movie.image}">
                    </div>
                </div>
            </div>
        </div>
    </div>`
}


function detailsComponent(character) {

    return `<tr id="details-${character.ID}" > 
    <td style = "text-align:  left;">   
    <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Name: ${character.name}</h6>
                                </div>
                                <div class="card-body">
                                <div>age:<br> ${character.age}</div>
                                <div>weitgh:<br> ${character.weitgh}</div>
                                <div>history:<br> ${character.history}</div>
                                <div> movies:<br>  ${movieListComponent(character.movies)}</div>
                                </div>
                </div>
    </td>
    </tr>`
}

function getDetails(id) {
    console.log("Details of id : " , id);
    
    let characterID  = id.substring(8)
    console.log(simba);
    let actualRow=  document.getElementById("row-"+characterID)
    actualRow.insertAdjacentHTML( "afterend", detailsComponent(simba))
}


function modalCreateEventListen(params) {
    let  modalForm =    document.getElementById('exampleModal')
    modalForm.addEventListener("show.bs.modal",  
    (event) =>{
        let charId = event.relatedTarget.getAttribute('id')
        charId = charId.substring(7)
        console.log("Going to update " , charId);
        if (charId != "-1"){
            //Uptaating
            let characterData = simba
            console.log("-----------MOdal update------------------");
            document.getElementById("exampleModalLabel").textContent= "Update character"
            document.getElementById("form-character-name").value = characterData.name
            document.getElementById("form-character-image").value = characterData.image
            document.getElementById("form-character-age").value =  characterData.age
            document.getElementById("form-character-weigth").value =  characterData.weitgh
            document.getElementById("form-character-history").value =  characterData.history
            document.getElementById("form-character-movies").value = characterData["movies"].map(movie=>movie.title).toString()
        } 
        else{
            document.getElementById("exampleModalLabel").textContent= "New Character"
        }
    }
    )

//          // Button that triggered the modal
//          let button = event.relatedTarget
//          // Extract info from data-bs-* attributes
//          let recipient = button.getAttribute('data-bs-whatever')
//          // If necessary, you could initiate an AJAX request here
//          // and then do the updating in a callback.
//          //
//          // Update the modal's content.
//          let modalTitle = exampleModal.querySelector('.modal-title')
//          let modalBodyInput = exampleModal.querySelector('.modal-body input')
//        
//          modalTitle.textContent = 'New message to ' + recipient
//          modalBodyInput.value = recipient
    
        
}


getCharacters();
modalCreateEventListen()


