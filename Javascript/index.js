let itemsCount = [];


window.addEventListener('load', (event) => {
    renderDetails();
    showproductCount();
    showCategory();
});
const renderDetails = () => {
    let products = JSON.parse(localStorage.getItem("products"));
    let counter = 0;

    let tableBody = document.querySelector("tbody");



    products.forEach(element => {
        let status = element.quantity;
        let statusStyle;
        if (status >= 1 && status <= 20) {
            statusStyle = "out-of-stock"

        } else if (status == 0) {
            statusStyle = "almost-of-stock"
        }
        let columns = '<td>  <img class = "deleteImage" src = "./images/deleteIcon.png"> ' + element.name + ' </td> <td>  ' + element.description + '  </td> <td>  ' + element.category + ' </td>    <td>' + element.price + '</td><td> <p> ' + element.quantity + ' </p><div class = "status"  id="' + statusStyle + '"></div></td >'

        let tableRow = document.createElement("tr");
        tableRow.innerHTML = columns;
        tableBody.appendChild(tableRow);
    });

    //Delete functionality added

    const deleteImageButton = document.querySelectorAll(".deleteImage");


    deleteImageButton.forEach(element => {
        element.addEventListener("click", (e) => {
            deleteProduct(e);
        })
    })


    const deleteProduct = (e) => {
        let prod = e.target.parentElement.parentElement;




        let itemsInStock = JSON.parse(localStorage.getItem("products"));
        console.log(itemsInStock)
        itemsInStock.forEach((item) => {
            console.log(item.name)
            console.log(prod.children[0].innerText)
            console.log(item.name.toString() === prod.children[0].innerText.toString())
            if (item.name.trim() === prod.children[0].innerText.trim()) {
                prod.remove();
                itemsInStock.splice(counter, 1);
            }

            counter++;
            console.log(counter)
        })


        console.log(itemsInStock);
        localStorage.setItem("products", JSON.stringify(itemsInStock))
    }






}

const showproductCount = () => {

    let itemsInStock = JSON.parse(localStorage.getItem("products"));

    let itemsCount = itemsInStock.length;
    const categoryDiv = document.querySelector(".group-container");
    categoryDiv.children[0].children[0].children[0].innerText = itemsCount;
    categoryDiv.children[2].children[0].children[0].innerText = itemsCount;
}


const showCategory = () => {
    const categoryDiv = document.querySelector(".group-container");
    let itemsInStock = JSON.parse(localStorage.getItem("products"));


    // console.log(itemsInStock);
    itemsInStock.forEach((item) => {
        console.log(item.category);
        if (itemsCount.length < 0) {

            alert(item.category);
            itemsCount.push(item.category);
        } else {

            if (checkCategory(item.category) == null) {
                itemsCount.push(item.category);
            }
        }
    })

    console.log(categoryDiv.children[0].children[0].children[0].innerText);


    categoryDiv.children[1].children[0].children[0].innerText = itemsCount.length;
}



const checkCategory = (category) => {
    itemsCount.forEach((item, index) => {
        console.log(item)
        if (item === category) {
            return category;
        }
    })


    return null;

}