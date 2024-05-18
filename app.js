const form = document.querySelector("form");
const input = document.querySelector("input");
const addBtn = document.querySelector(".add-btn");
const alertDOM = document.querySelector(".alert");
const ul = document.querySelector("ul.items");
let editFlag = false;
let clikcedListItem;

function loadFromLocalStorage(){
    if(JSON.parse(localStorage.getItem("items"))){
        let items = JSON.parse(localStorage.getItem("items"));
        ul.innerHTML = items.map(item => {
            return `<li data-id="${item.Id}">
                        <span>${item.value}</span>
                        <div>
                            <a href="#" class="edit-btn">
                                <i class="fa-solid fa-edit"></i>
                            </a>
                            <a href="#" class="remove-btn">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </div>
                    </li>`;
        }).join("");

        const editBtns = document.querySelectorAll(".edit-btn");
        const removeBtns = document.querySelectorAll(".remove-btn");

        editBtns.forEach(editBtn => {
            editBtn.addEventListener("click", function(e){
                e.preventDefault();
                const value = e.currentTarget.parentElement.previousElementSibling.textContent;
                input.value = value;
                input.focus();
                addBtn.textContent = "edit"
                editFlag = true; 
                clikcedListItem = e.currentTarget.parentElement.parentElement;
            })
        })

        removeBtns.forEach(removeBtn => {
            removeBtn.addEventListener("click", function(e){
                e.preventDefault();
                const li = e.currentTarget.parentElement.parentElement;
                const Id = li.dataset.id;
                const value = e.currentTarget.parentElement.previousElementSibling.textContent;
                removeItemFromLocalStorage(value, Id)
                e.currentTarget.parentElement.parentElement.remove();
            })
        })
    }
}

window.addEventListener("DOMContentLoaded", loadFromLocalStorage);

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    submitForm();
})

function submitForm(){
    const value = input.value;
    if(!value){
        alertDOM.classList.add("show");
        setTimeout(() => {
            alertDOM.classList.remove("show");
        }, 3000);
    }else if(!editFlag){

        const Id = new Date().getTime();

        const li = document.createElement("li");
        li.setAttribute("data-id", Id);
        li.innerHTML =  `<span>${value}</span>
                        <div>
                            <a href="#" class="edit-btn">
                                <i class="fa-solid fa-edit"></i>
                            </a>
                            <a href="#" class="remove-btn">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </div>`;
        ul.appendChild(li);

        input.value = "";

        //Save in localStorage:
        if(JSON.parse(localStorage.getItem("items"))){
            let items = JSON.parse(localStorage.getItem("items"));
            addItemToLocalStorage(items, value, Id);
        }else{
            let items = [];
            addItemToLocalStorage(items, value, Id);
        }

        const editBtns = document.querySelectorAll(".edit-btn");
        const removeBtns = document.querySelectorAll(".remove-btn");

        editBtns.forEach(editBtn => {
            editBtn.addEventListener("click", function(e){
                e.preventDefault();
                const value = e.currentTarget.parentElement.previousElementSibling.textContent;
                input.value = value;
                input.focus();
                addBtn.textContent = "edit"
                editFlag = true; 
                clikcedListItem = e.currentTarget.parentElement.parentElement;
            })
        })

        removeBtns.forEach(removeBtn => {
            removeBtn.addEventListener("click", function(e){
                e.preventDefault();
                const li = e.currentTarget.parentElement.parentElement;
                const Id = li.dataset.id;
                const value = e.currentTarget.parentElement.previousElementSibling.textContent;
                removeItemFromLocalStorage(value, Id)
                e.currentTarget.parentElement.parentElement.remove();
            })
        })
        
    }else if(editFlag){
        clikcedListItem.querySelector("span").textContent = value;
        input.value = "";
        addBtn.textContent = "add"
        editFlag = false;
        const Id = clikcedListItem.dataset.id;
        editItemInLocalStorage(value, Id);
    }
}

function addItemToLocalStorage(items, value, Id){
    items.push({
        Id : Id,
        value : value
    })
    localStorage.setItem("items", JSON.stringify(items));
}

function removeItemFromLocalStorage(value, Id){
    let items = JSON.parse(localStorage.getItem("items"));
    items = items.filter(item => item.Id != Id && item.value != value);
    localStorage.setItem("items", JSON.stringify(items));
}

function editItemInLocalStorage(value, Id){
    let items = JSON.parse(localStorage.getItem("items"));
    items.map(item => {
        if(item.Id == Id){
            item.value = value;
        }
    });
    localStorage.setItem("items", JSON.stringify(items));
}