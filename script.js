// console.log("This is my note app.")
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e)
{   
    // console.log("Button Clicked");
    let addTxt = document.getElementById("addTxt");
    // console.log(addTxt.value);
    if (addTxt.value == "") {
        alert("Note cann't be empty");
    }
    else {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        // console.log(typeof notesObj);
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        // console.log(notesObj);

        showNotes();
    }
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    // console.log(typeof notes);
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element , index) {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id = "${index}" onclick = "deleteNote(this.id) "  class="btn btn-primary">Delete Note</button>
        </div>
      </div>
        `;
    });

    let noteEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteEle.innerHTML = html;
    }
    else {
        noteEle.innerHTML = `Nothing to show!!`;
    }
}


function deleteNote(index) {
    // console.log("I'm deleting", index);
    
    let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
    // console.log(typeof notesObj);
    notesObj.splice(index, 1); // to delete a index in object
    // console.log(notesObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // console.log(localStorage);
    showNotes();
}

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener('input', function () {
    let inputVal = searchTxt.value.toLowerCase();
    // console.log("searched", inputVal);
    let notCards = document.getElementsByClassName("noteCard");
    Array.from(notCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
     //   console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
           // console.log("Match")
            element.style.display = "block";
        }
        else {
            element.style.display = "none";     
        }
    });
})