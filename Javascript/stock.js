const submitButton = document.querySelector(".submitBtn");
let productsContainer = [];
let product = {
    name: "",
    description: "",
    quantity: "",
    category: "",
    price: ""
}
submitButton.addEventListener("click", (e) => {

    e.preventDefault();
    const inputValues = document.querySelectorAll("input");


    for (let i = 0; i < inputValues.length; i++) {

        if (i === 0) {
            product.name = inputValues[i].value;
        } else if (i === 1) {
            product.description = inputValues[i].value;
        } else if (i === 2) {
            product.quantity = inputValues[i].value;
        } else if (i === 3) {
            product.category = inputValues[i].value;
        } else if (i === 4) {
            product.price = inputValues[i].value;
        }

    }


    validate(product)



})


const validate = (elements) => {
    if (elements.name == "" || elements.description == "" || elements.quantity == "" || elements.category == "" || elements.price == "") {
        alert("Sorry fields cannot be empty");



    } else {
        productsInLocalStorage = JSON.parse(localStorage.getItem("products"))
        console.log(productsInLocalStorage)
        if (productsInLocalStorage != null) {
            console.log(productsInLocalStorage)

            productsInLocalStorage.push(elements);
            localStorage.setItem("products", JSON.stringify(productsInLocalStorage))

        } else {

            productsContainer.push(elements)
            localStorage.setItem("products", JSON.stringify(productsContainer))

        }


    }

    resetForm();
}



const resetForm = () => {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((elem) => {
        elem.value = ""
    })
}