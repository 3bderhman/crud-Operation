let productNameInput = document.getElementById("product-name");
let productPriceInput = document.getElementById("product-price");
let productCategoryInput = document.getElementById("product-category");
let productDescInput = document.getElementById("product-desc");
let callFunctionsInput = document.getElementById("call-functions");
let updateProductInput = document.getElementById("update-product");
let searchProductInput = document.getElementById("search-Product");
let moonElement = document.getElementById("moon");
let sunElement = document.getElementById("sun");

moonElement.addEventListener("click", function() {
    moonElement.style.display = "none";
    sunElement.style.display = "block";
    document.querySelector("body").style.backgroundColor = "rgb(32, 34, 41)";
    let elemnt = document.body.getElementsByTagName("*");
    for (let i = 0; i < elemnt.length; i++) {
        elemnt[i].style.color = "rgb(255, 255, 255)"
    }
})
sunElement.addEventListener("click", function() {
    moonElement.style.display = "block";
    sunElement.style.display = "none";
    document.querySelector("body").style.backgroundColor = "rgb(255, 255, 255)";
    let elemnt = document.body.getElementsByTagName("*");
    for (let i = 0; i < elemnt.length; i++) {
        elemnt[i].style.color = "rgb(32, 34, 41)"
    }})

let num = 0;
let productContainer = [];
if(localStorage.getItem("productscontainer") != null){
    productContainer = JSON.parse(localStorage.getItem("productscontainer"));
    displayProduct();
}
else{
    productContainer = [];  
}

function addProduct() {
    if(vaidProductName() && validProductPrice()){
        let product= {
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value,
        }
        productContainer.push(product);
        localStorage.setItem("productscontainer", JSON.stringify(productContainer));
    }
}
function clearForm() {
    let inputs = document.querySelectorAll(".form-input");
    for(let i=0; i<inputs.length; i++){
        inputs[i].value="";
    }
}
function displayProduct() {
    let trs ="";
    for(let i=0; i<productContainer.length; i++){
        trs+=
        `<tr>
            <th>${i+1}</th>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button onclick = "deleteProduct(${i})" type="button" class="btn btn-outline-danger">Delete</button></td>
            <td><button onclick = "updateProduct(${i})" type="button" class="btn btn-outline-primary">Update</button></td>
        </tr>`
    }
    document.getElementById("dispalyProduct").innerHTML=trs;
}
function vaidProductName() {
    let regex = /^[A-Za-z]{2,10}(\s?[A-Za-z]{3,10})?$/;
    if (regex.test(productNameInput.value) == true) {
        $("#ProductName-alet").addClass("d-none").removeClass("d-block")
        return true;
    }
    else{
        $("#ProductName-alet").addClass("d-block").removeClass("d-none")
        return false;
    }
}
function validProductPrice() {
    let regex = /^.{5,8}$/;
    if (regex.test(productPriceInput.value) == true) {
        $("#prosuctPrice-alet").addClass("d-none").removeClass("d-block")
        return true;
    }
    else{
        $("#prosuctPrice-alet").addClass("d-block").removeClass("d-none")
        return false;
    }
}
function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("productscontainer", JSON.stringify(productContainer));
    displayProduct();
}
function updateProduct(index){
    num = index
    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].category;
    productDescInput.value = productContainer[index].desc;
    callFunctionsInput.classList.add("d-none");
    updateProductInput.classList.remove("d-none")

}
callFunctionsInput.addEventListener("click", function() {
    addProduct();
    clearForm();
    displayProduct();
})
updateProductInput.addEventListener("click", function() {
    let product= {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
    }
    productContainer.splice(num,1,product);
    localStorage.setItem("productscontainer", JSON.stringify(productContainer));
    clearForm();
    displayProduct()
    callFunctionsInput.classList.remove("d-none");
    updateProductInput.classList.add("d-none")
})
searchProductInput.addEventListener("keyup", function() {
    let trs ="";
    let val = searchProductInput.value
    for(let i=0; i<productContainer.length; i++){
        if(productContainer[i].name.toLowerCase().includes(val.toLowerCase())){
            trs+=
                `<tr>
                    <th>${i+1}</th>
                    <td>${productContainer[i].name}</td>
                    <td>${productContainer[i].price}</td>
                    <td>${productContainer[i].category}</td>
                    <td>${productContainer[i].desc}</td>
                    <td><button onclick = "deleteProduct(${i})" type="button" class="btn btn-outline-danger">Delete</button></td>
                    <td><button onclick = "updateProduct(${i})" type="button" class="btn btn-outline-primary">Update</button></td>
                </tr>`
        }
    }
    document.getElementById("dispalyProduct").innerHTML=trs;
})