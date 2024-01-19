const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")

addBtn.addEventListener(
    "click",
    function(){
        addNote()          //addNote function ko call kia add button pe click krne pe
    }
)

const saveNotes = () => {
    //textarea of all notes
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];     //array ki form mei data store hua
    notes.forEach(
        (note) =>{
            //textarea of each note gets pushed to variable "data"
            data.push(note.value)
        }
    )
   //console.log(data);

   if(data.length === 0){
    localStorage.removeItem("notes")
   }
   else{
   //array ko string mei convert kar k data local storage mei store hora
   localStorage.setItem("notes",JSON.stringify(data))
  }
}

const addNote = (text = "") => {
    //const note mei "note" class add krdi
    const note = document.createElement("div");
    note.classList.add("note")

    //const note mei html content add kardia 
    note.innerHTML = `<div class="tool">  
                             
    <i class="save fa-solid fa-floppy-disk"></i>
    <i class="trash fa-solid fa-trash"></i>
</div>
<textarea>${text}</textarea>
`;

note.querySelector(".trash").addEventListener(
       //here we have directly combined eventlistener with query selector
       //on clicking icon having class trash below function will be executed
       "click",  
    function() {
        note.remove()
        saveNotes()
    }
)
note.querySelector(".save").addEventListener(
    "click",
    function() {
        saveNotes()
    }
)
note.querySelector("textarea").addEventListener(
    "focusout",
    function () {
        saveNotes()
    }
)
main.appendChild(note);
saveNotes()

}

//self calling function which executes when page loads
(
    function(){
        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        if(lsnotes === null){
              addNote()
        }
        else{
            lsnotes.forEach(
                (lsnote) =>{
                    addNote(lsnote)   //calling addNOte function
                }
            )
     }
        //console.log(lsnotes);
        
        
    }
)
() //calling

