const itemsArray = localStorage.getItem("items")? JSON.parse(localStorage.getItem("items")) :
[]

//on clicking enter button createitem function called
document.querySelector("#enter").addEventListener("click",() => {
    const item = document.querySelector("#item")
    createItem(item)
})

function displayItems(){
    let items=""
    for(let i=0 ; i<itemsArray.length ; i++){
        items += `<div class="item">
        <li class="list">
        <div class="input-controller">
        
        <input type="checkbox" />
            <textarea style="color: black;" >${itemsArray[i]}</textarea>
            
            <div class="edit-controller">
                <i class="deleteBtn fa-solid fa-trash"></i>
                <i class="editBtn fa-solid fa-pen-to-square"></i>
            </div>
        </div>
        <div class="update-controller">
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>

        </div>
        </li>
    </div>
    `
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()

}
    
function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db,i) => {
        db.addEventListener("click", () => {deleteItem(i)})
    })
}

function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb,i) => {
        eb.addEventListener("click", () => {
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        } )
    })
}

function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb,i) => {
        sb.addEventListener("click",() => {
            updateItem(inputs[i].value , i)
        })
    })
}

function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb,i) => {
        cb.addEventListener("click",() => {
            updateController[i].style.display = "none"
            inputs[i].disabled = true
        })
    })
}

function updateItem(text,i){
    itemsArray[i] = text
    localStorage.setItem("items",JSON.stringify(itemsArray))
    Location.reload()
}

 function deleteItem(i){
    itemsArray.splice(i,1)
    localStorage.setItem("items",JSON.stringify(itemsArray))
    location.reload()

}

function createItem(item){
    if(item.value === ''){
        alert("you must write something")
    }
    else{
    itemsArray.push(item.value)
    localStorage.setItem("items",JSON.stringify(itemsArray))
    location.reload()
    }
}


function displayDate(){
    let date = new Date()
    date= date.toDateString()
    //console.log(date);
    document.querySelector("#date").innerHTML = date
}

/*(
   function(){
    displayDate()
   } 
)
()
*/
//Another way to write self calling function:
window.onload = function () {
    displayDate()
    displayItems()
} 

