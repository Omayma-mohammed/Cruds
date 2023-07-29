let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescrInput = document.getElementById("productDescription");
let btnAdding = document.getElementById("btnAdd");
let inputs = document.getElementsByClassName('form-control');
let currentIndex = 0;
let products =[]; 
if(JSON.parse(localStorage.getItem('dataList'))!= null){
    products =JSON.parse(localStorage.getItem('dataList'));
    desplayData();
}

//////// 
 btnAdding.onclick = function (){
    if (btnAdding.innerHTML =='Add Product') {
        addingData();
    } else {
        updateData();
        if ( btnAdding.innerHTML == 'Update Data') {
            btnAdding.innerHTML ='Add Product';
        }
    }
     desplayData();  
    claerData() 
 }
 //////Adding function /////
 function addingData(){ 
    let product ={
    name :productNameInput.value,
    price :productPriceInput.value,
    category:productCategoryInput.value,
    desc:productDescrInput.value
   }
   products.push(product);
   localStorage.setItem("dataList",JSON.stringify(products));
}
 //////Desplay function /////
 function desplayData(){
    let rowsTable='';
    for(let i=0; i< products.length; i++){
     rowsTable +=` <tr>
     <td>${i} </td>  
     <td>${products[i].name}</td>  
     <td> ${ products[i].price}</td>  
     <td> ${ products[i].category}</td>  
     <td> ${ products[i].desc}</td>  
     <td> <button class="btn" onclick ='getdata(${i})'>
     <i class="fa-solid fa-pencil fs-4"></i>
     </button></td>
     <td> <button class="btn" onclick ='deletedata(${i})'>
     <i class="fa-regular fa-trash-can fs-4"></i>
     </button></td>
     </tr>`
    }
    document.getElementById("tableBody").innerHTML=rowsTable;
 } 
 //// Clearing function /////
 function claerData(){
    for (let i = 0; i < inputs.length; i++) {
     inputs[i].value = '';
    }
  }
 //// search function /////
 function search(searchTxt){
    let rowsTable='';
    for(let i=0; i< products.length; i++){
        if(products[i].name.toLowerCase().includes(searchTxt.toLowerCase())||
        products[i].category.toLowerCase().includes(searchTxt.toLowerCase())){
            rowsTable +=` <tr>
            <td>${i}  </td>  
            <td>${products[i].name.replace(searchTxt,`<span class ="text-info">${searchTxt}</span>`)}</td>
            <td> ${products[i].price}</td>  
            <td> ${products[i].category.replace(searchTxt,
                `<span class="text-info">${searchTxt}</span>`)}
            </td>  
            <td> ${products[i].desc}</td>  
            <td> <button class="btn" onclick ='getdata(${i})'>
            <i class="fa-solid fa-pencil fs-4"></i>
            </button></td>
            <td> <button class="btn" onclick ='deletedata(${i})'>
            <i class="fa-regular fa-trash-can fs-4"></i>
            </button></td>
            </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=rowsTable;
 }

 //// deleting function /////
 function deletedata(index){
   products.splice(index,1);
   desplayData();
   localStorage.setItem("dataList",JSON.stringify(products)) 
 }
 // getData function /////
 function getdata(index){
    currentIndex = index;
    let currentProduct = products[index];
    productNameInput.value = currentProduct.name;  
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescrInput.value = currentProduct.desc;
    btnAdding.innerHTML = 'Update Data';
 }
 ///Updating function
 function updateData(){
    let product = {
        name :productNameInput.value,
        price :productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescrInput.value
 }
 products[currentIndex]=product;
 localStorage.setItem("dataList",JSON.stringify(products)) 
}

/// Rejacx productNameInput && productPriceInput
productNameInput.onkeyup = function (){
    let nameRejax = /^[A-Za-z]{2,10}[0-9]?[0-9]?$/;
     if (nameRejax.test(productNameInput.value)) {
         productNameInput.classList.add('is-valid');
         productNameInput.classList.remove('is-invalid');
     } else {
        productNameInput.classList.add('is-invalid');
     }
}
productPriceInput.onkeyup = function (){
    let priceRejax = /^[0-9]{2,6}$/;
     if (priceRejax.test(productPriceInput.value)) {
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid');
     } else {
        productPriceInput.classList.add('is-invalid');
     }
};
