window.addEventListener('load', (event) => {
    renderDetails();
});
const renderDetails = () => {
    let products = JSON.parse(localStorage.getItem("products"));

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



        let counter = 0;
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