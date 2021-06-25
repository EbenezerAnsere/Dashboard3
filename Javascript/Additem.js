const closeIcon = document.querySelector(".fa-times");
const backdrop = document.querySelector(".backdrop");
const cartDiv = document.querySelector(".productDetails");
const submitButton = document.querySelector("#submitButton");
const saveBtn = document.querySelector("#saveButton");


// deleteImage






//edit items elements
const editCloseIcon = document.querySelector(".EditcancelIcon");
let editBackDrop = document.querySelector(".editbackdrop")
let editProducts = document.querySelector(".edit-product");
const deleteIcon = document.querySelector(".deleteImage");

let values = [];
let count = 1;
let ItemToChange;

closeIcon.addEventListener("click", () => {

    if (backdrop.classList.contains("hide")) {
        backdrop.classList.remove("hide");
        cartDiv.classList.remove("hide")
    } else {
        backdrop.classList.add("hide");
        cartDiv.classList.add("hide")
    }

})


editCloseIcon.addEventListener("click", () => {
    if (editProducts.classList.contains("hide")) {
        editProducts.classList.remove("hide");
    } else {
        editProducts.classList.add("hide")
        editBackDrop.classList.add("hide");
    }
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (backdrop.classList.contains("hide")) {
        backdrop.classList.remove("hide");
        cartDiv.classList.remove("hide")
    }


    //gets the values
    getValues();
})


const getValues = () => {
    const selectFields = document.querySelectorAll(".selectProd");



    selectFields.forEach((elem, index) => {
        console.log(elem.options[elem.selectedIndex].text)
        values.push(elem.options[elem.selectedIndex].text);

    })


    console.log(values)
    localStorage.setItem("productInfo", JSON.stringify(values));

    createProductInfo();
}


const editMethod = (e) => {

    ItemToChange = e.target.parentElement.parentElement;
    editSelect = document.querySelectorAll(".EDIT-DIVCONTAINER select")
    let detailValues = [];

    // creates an array of current Items
    for (elem of ItemToChange.children) {

        detailValues.push(elem.innerText);

    }

    if (detailValues.length > 0) {

        for (items of detailValues) {

            for (select of editSelect) {

                setOptionByValue(select, items)
            }
        }

        function setOptionByValue(select, value) {
            var options = select.options;


            for (var i = 0; i < options.length; i++) {


                if (options[i].text === value) {
                    select.selectedIndex = i;

                }
            }

        }
    }

}


const createProductInfo = () => {
    const tableBody = document.querySelector("tbody");
    const productInfo = JSON.parse(localStorage.getItem("productInfo"));


    const tableRow = document.createElement("tr");

    let editImage = document.createElement("img");
    let deleteImage = document.createElement("img");
    editImage.className = "editImage";
    deleteImage.className = "deleteImage"
    let itemName = document.createElement("td");
    itemName.className = "nameDiv" + `${count}`
    let description = document.createElement("td");
    let quantity = document.createElement("td");
    let price = document.createElement("td");
    let category = document.createElement("td");
    let total = document.createElement("td");

    let productName = document.createElement("span");
    productName.innerText = values[0];


    //holds images link address
    let imageLink = "./images/editIcon.png"
    let deleteImageLink = "./images/deleteIcon.png"

    //sets the source of the img tag
    editImage.src = imageLink;
    deleteImage.src = deleteImageLink


    // itemName.innerText += productName;
    itemName.appendChild(productName);
    description.innerText = values[1];
    quantity.innerText = values[2];
    price.innerText = values[4];
    category.innerText = values[3];
    total.innerText = values[5];


    //appending of table data to elements
    tableRow.appendChild(itemName)
    tableRow.appendChild(description)
    tableRow.appendChild(quantity)
    tableRow.appendChild(category)
    tableRow.appendChild(price)
    tableRow.appendChild(total)


    //appending table tr to table body
    tableBody.appendChild(tableRow);


    const nameColumn = document.querySelector(".nameDiv" + `${count}`);
    nameColumn.insertBefore(editImage, nameColumn.firstChild)
    nameColumn.insertBefore(deleteImage, nameColumn.firstChild)




    values = []
    count++


    const editImageBtn = document.querySelectorAll(".editImage");

    editImageBtn.forEach((elem) => {
        elem.addEventListener("click", (e) => {
            editBackDrop.classList.remove("hide");
            editProducts.classList.remove("hide");

            editMethod(e);

        })
    })


    //add event listener to all icons
    addDeleteEventListener();



}


const addDeleteEventListener = () => {
    const deleteImage = document.querySelectorAll(".deleteImage");

    deleteImage.forEach((image) => {
        image.addEventListener("click", (e) => {
            deleteItem(e)
        })
    })
}


// save button
const saveButton = (e) => {

    editSelect = document.querySelectorAll(".EDIT-DIVCONTAINER select")
    let tableRow = document.querySelector("." + ItemToChange.children[0].className).parentElement;
    console.log(tableRow);
    let newValues = [];

    for (items of editSelect) {
        // console.log(items);
        newValues.push(items.options[items.selectedIndex].text)
    };

    console.log();

    for (let i = 0; i < ItemToChange.children.length; i++) {
        if (i == 0) {
            console.log(ItemToChange.children[i].lastElementChild.innerText)
            ItemToChange.children[i].lastElementChild.textContent = newValues[0];
        } else if (i == 1) {
            ItemToChange.children[i].innerText = newValues[1];
        } else if (i == 2) {
            ItemToChange.children[i].innerText = newValues[2];
        } else if (i == 3) {
            ItemToChange.children[i].innerText = newValues[3];
        } else if (i == 4) {
            ItemToChange.children[i].innerText = newValues[4];
        }
    }

    console.log(newValues)
    console.log(ItemToChange)
    editProducts.classList.add("hide");
    editBackDrop.classList.add("hide");
    // ItemToChange

}

saveBtn.addEventListener("click", (e) => {
    saveButton(e)
})



const deleteItem = (e) => {
    // alert("Hello")
    e.target.parentElement.parentElement.remove();


    cartDiv.classList.add("hide")

    setTimeout(() => {
        cartDiv.classList.remove("hide");
    }, 300)


}