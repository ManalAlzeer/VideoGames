// fetch and store
const dataArray = [];
fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
		"x-rapidapi-key": "39429e16bcmsh5f6d0ffb04872cep1f59bejsn6a4f583d3e72"
	}
}).then(function(response) {
  return response.json()})
  .then(function (json) { 
    const result = json

    // display cards
    for (let i = 0; i < 12; i++) {
        dataArray.push(result[i])

        const jsontitle = result[i].title;
        const jsonimg = result[i].thumbnail;
        const jsondesc = result[i].short_description;
        const jsonid = result[i].id

        const cards = document.querySelector(".cards")
        const card = document.createElement("div")
        card.className = "card"

        const img =document.createElement("img")
        const h3 = document.createElement("h4")
        const p =document.createElement("p")
        const btn = document.createElement("button");
        btn.id = "view";
        btn.value = jsonid;
        btn.innerText = "View";

        img.src = jsonimg;
        h3.innerText = jsontitle;
        p.innerText = jsondesc;

        card.append(img);
        card.append(h3);
        card.append(p);
        card.append(btn);

        cards.append(card);
    }

    // view buttons
    viewButtons();   
})

// search bar
const srch = document.querySelector("#search")
const hiden = document.querySelector(".cards")
const hiden2 = document.querySelector(".cardsSearsh")
srch.addEventListener("change" ,function() {
    if(srch.value !=""){
        let x = srch.value;
        console.log(x);
        hiden2.innerHTML=""
        for (let i = 0; i < dataArray.length; i++) {
            if(x === dataArray[i].title){
                hiden.style.display = "none";
                hiden2.style.display = "";
                
                const jsontitle = dataArray[i].title;
                const jsonimg = dataArray[i].thumbnail;
                const jsondesc = dataArray[i].short_description;
                const jsonid = dataArray[i].id
        
                const cards = document.querySelector(".cardsSearsh")
                const card = document.createElement("div")
                card.className = "card"
        
                const img =document.createElement("img")
                const h3 = document.createElement("h4")
                const p =document.createElement("p")
                const btn = document.createElement("button");
                btn.id = "view";
                btn.value = jsonid;
                btn.innerText = "View";

                img.src = jsonimg;
                h3.innerText = jsontitle;
                p.innerText = jsondesc;
        
                card.append(img);
                card.append(h3);
                card.append(p);
                card.append(btn);
        
                cards.append(card);
        
        
                }
        
            }  
    }
    else{
        hiden.style.display = "";
        hiden2.style.display = "none"
    }

    viewButtons();
    
});

// get mathced data from array
function matchdata(id) {
    for (let i = 0; i < dataArray.length; i++) {
        if(id == dataArray[i].id){
            return dataArray[i]
        }
    }
}

// 'View' buttons method 
function viewButtons() {
    // View buttons
    const buttinview = document.querySelectorAll("#view")
    buttinview.forEach(function(elem) {
        elem.addEventListener("click", function(){
            let selected = matchdata(this.value);
            // Modal
            const modal = document.querySelector("#myModal");
            var span = document.querySelector(".close");
            modal.style.display = "block";

            const info = document.querySelector(".card-info");
            info.innerHTML="";
    
            const img =document.createElement("img")
            const h3 = document.createElement("h4")
            const desc =document.createElement("p")
            const supdiv =document.createElement("div")
            supdiv.className="details";

            const platform =document.createElement("p")
            const genre =document.createElement("p")
            const release =document.createElement("p")
            const publisher =document.createElement("p")



            img.src = selected.thumbnail;
            h3.innerText = selected.title;
            desc.innerText = selected.short_description;
            platform.innerText = "Platform: " + selected.platform;
            genre.innerText = "Genre: " + selected.genre;
            release.innerText = "release date: " + selected.release_date;
            publisher.innerText = "publisher: " + selected.publisher;



            info.append(img);
            info.append(h3);
            info.append(desc);
            supdiv.append(platform);
            supdiv.append(genre);
            supdiv.append(publisher);
            supdiv.append(release);
            info.append(supdiv);
    

            span.onclick = function() {
                modal.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        });
    }); 
}

// filter bar
const filter = document.querySelectorAll("#sort")
let filtring1 = document.querySelectorAll('input[name="Platform"]');
let filtring2 = document.querySelectorAll('input[name="Genre"]');
let selectedPlatform ="";
let selectedGenre = "";
const hiden3 = document.querySelector(".cardsFilter")
filter.forEach(function(elem) {
    elem.addEventListener("click", function(){
        for (let i = 0; i < filtring1.length; i++) {
            if(filtring1[i].checked == true){
                console.log(filtring1[i].value);
                selectedPlatform = filtring1[i].value;
            } 
        }
        for (let i = 0; i < filtring2.length; i++) {
            if(filtring2[i].checked == true){
                console.log(filtring2[i].value);
                selectedGenre = filtring2[i].value;
            } 
        }

        hiden3.innerHTML=" ";
        for (let i = 0; i < dataArray.length; i++) {
            if((dataArray[i].platform.startsWith(selectedPlatform)) && (dataArray[i].genre === selectedGenre)){
                hiden.style.display = "none";
                hiden2.style.display = "none";
                console.log(dataArray[i].platform + " -  " + dataArray[i].title + "   " + dataArray[i].genre);
                const jsontitle = dataArray[i].title;
                const jsonimg = dataArray[i].thumbnail;
                const jsondesc = dataArray[i].short_description;
                const jsonid = dataArray[i].id
        
                const cards = document.querySelector(".cardsFilter")
                const card = document.createElement("div")
                card.className = "card"
        
                const img =document.createElement("img")
                const h3 = document.createElement("h4")
                const p =document.createElement("p")
                const btn = document.createElement("button");
                btn.id = "view";
                btn.value = jsonid;
                btn.innerText = "View";

                img.src = jsonimg;
                h3.innerText = jsontitle;
                p.innerText = jsondesc;
              
                card.append(img);
                card.append(h3);
                card.append(p);
                card.append(btn);
                cards.append(card);
        
                }        
            } 
             
            viewButtons();
    });
});
    

//  mobile filter navbar
const mobilefilter = document.querySelector(".icon")
mobilefilter.addEventListener("click", function(){
    const filterbar = document.querySelector("#myLinks")
    if(filterbar.style.display === "block"){
        filterbar.style.display = "none";
    } else {
        filterbar.style.display = "block";
    }
})



// join Us buttons
const buttinview = document.querySelectorAll("#joinUs")
buttinview.forEach(function(elem) {
    elem.addEventListener("click", function(){
        // Modal
        const modal = document.querySelector("#myModal2");
        var span = document.querySelector(".close2");
        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    });
}); 
