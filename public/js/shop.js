//alert('ok');

var products= [  {
    "image": "https://i.imgur.com/qEjTqCe.jpg ",
    "name":"Basic Black TShirt",
    "description":"  Clothes for Developer",
    "category":"menclothes",
    "price":"11.00"
     }
  ,
  {
    "image": "https://i.imgur.com/a0jtBHP.jpg ",
    "name":"Basic White TShirt",
    "description":"Clothes for Developer",
    "category":"womenclothes",
    "price":"10.00"
    }
,
{
  "image": "https://i.imgur.com/i6kBrLd.jpg ",
  "name":"Basic yellow TShirt",
  "description":"Clothes for Developer",
  "category":"womenclothes",
  "price":"20.00"
  }
,
{
  "image": "https://i.imgur.com/9FDgBXi.jpg ",
  "name":"White TShirt",
  "description":"Clothes for Developer",
  "category":"womenclothes",
  "price":"15.00"
  }
,
{
  "image": "https://i.imgur.com/0mwG8qa.jpg",
  "name":"Basic Blue TShirt",
  "description":"Clothes for Developer",
  "category":"womenclothes",
  "price":"13.00"
  }
,
{
  "image": "https://i.imgur.com/MS5axgP.jpg ",
  "name":"Basic Black TShirt",
  "description":"Clothes for Developer",
  "category":"menclothes",
  "price":"1.00"
  }
];
  var cart = {
    items: [],
    total: 0,
    numberItems: 0
  }

function buildDom() {
  //alert('1')
  var productRow = document.getElementById('product-row');
  productRow.innerHTML= "";
//alert('2')
for(var i=0; i < products.length; i++){

var div= document.createElement("div");
div.setAttribute("class","col-sm-4");

var heading= document.createElement("h1");
var name = document.createTextNode(products[i].name);
heading.appendChild(name);


var p = document.createElement("p");
var description = document.createTextNode(products[i].description);
p.appendChild(description);

var image= document.createElement("img");
image.setAttribute("src",products[i].image);

var dollarsign = document.createTextNode("$");
var price =  document.createTextNode("$" + products[i].price);
//alert(i);

var cartButton = document.createElement("button");
    cartButton.setAttribute('class', 'fa fa-shopping-cart');
    cartButton.setAttribute('index', i);
    cartButton.setAttribute('onclick','getProductsInfo(this.getAttribute("index"))');

var wishListButton = document.createElement("button");
        wishListButton.setAttribute('index',i);
        wishListButton.setAttribute('onclick','handleClick','addToWishList(this.getAttribute("index"))');
        wishListButton.setAttribute("class","fa fa-heart");


div.appendChild(heading);
div.appendChild(image);
div.appendChild(p);
div.appendChild(price);
div.appendChild(cartButton);
div.appendChild(wishListButton);
productRow.appendChild(div);


}//end of For
}//function end buildDOM

window.onload = buildDom();



function getProductsInfo(index){
  var quantity=1;
  var product = {
    Id:index,
    name:products[index].name,
    description:products[index].description,
    price:products[index].price,
    quantity: quantity,
    amount: products[index].price
  };
 var productInCart = false;
 for (var i = 0; i < cart.items.length; i++) {
     if (cart.items[i].Id === index) {
       alert("same product added");
       productInCart = true;
     cart.items[i].quantity = cart.items[i].quantity + 1;

  }//end of if
 } // end of for
  if(!productInCart){
     cart.items.push(product);
   }//end of if

//alert(cart.items.length);
//alert(JSON.stringify(cart.items));
buildCart();

cartTotal();

}// end of function

function buildCart(){
  var cartItems= cart.items;
  var table = document.getElementById('tableRow');

//alert(cart.items.length + "this is in build cart");

  while(table.children.length){
  table.removeChild(table.children[0]);
}
    for(var key in cartItems){
      var item =cart.items[key];
      var row = document.createElement('tr');

      var productNameCell = document.createElement('td');
      var productName = document.createTextNode(item.name);
  productNameCell.appendChild(productName);

      var descriptionCell = document.createElement('td');
      var description = document.createTextNode(item.description);
  descriptionCell.appendChild(description);

      var priceCell = document.createElement('td');
      var price = document.createTextNode('$' + item.price);
  priceCell.appendChild(price);

      var quantityCell = document.createElement('td');
      var quantity = document.createTextNode(item.quantity);
  quantityCell.appendChild(quantity);

        var increaseButtonCell = document.createElement("td");
        var increaseButton= document.createElement('button');
        var increaseButtonText = document.createTextNode('+');
        increaseButton.setAttribute('class','btn btn-success');
        increaseButton.appendChild(increaseButtonText);
        increaseButton.setAttribute('index', cartItems[key].Id);
        increaseButton.setAttribute('onclick',"increaseQuantity(this.getAttribute('index'))");
        increaseButtonCell.appendChild(increaseButton);

        var decreaseButtonCell = document.createElement("td");
        var decreaseButton= document.createElement("button");
        var decreaseButtonText = document.createTextNode("-");
        decreaseButton.setAttribute("class","btn btn-success");
        decreaseButton.appendChild(decreaseButtonText);
        decreaseButton.setAttribute('index', cartItems[key].Id);
        decreaseButton.setAttribute('onclick',"decreaseQuantity(this.getAttribute('index'))");
        decreaseButtonCell.appendChild(decreaseButton);

        var removeButtonCell = document.createElement("td");
        var removeButton= document.createElement("button");
        var removeButtonText = document.createTextNode("Remove From Cart");
        removeButton.setAttribute("class","btn btn-danger");
        removeButton.appendChild(removeButtonText);
        removeButton.setAttribute('index', cartItems[key].Id);
        removeButton.setAttribute('onclick',"removeItem(this.getAttribute('index'))");
        removeButtonCell.appendChild(removeButton);


              var amountCell = document.createElement('td');
              var amount = document.createTextNode('$' + item.amount);
          amountCell.appendChild(amount);

        row.appendChild(productNameCell);
        row.appendChild(descriptionCell);
        row.appendChild(priceCell);
        row.appendChild(amountCell)
        row.appendChild(quantityCell);
        row.appendChild(increaseButtonCell);
        row.appendChild(decreaseButtonCell);
        row.appendChild(removeButtonCell);

        table.appendChild(row);
  }//end of for loop
  cartTotal();

}//end of buildCart function



function decreaseQuantity(index) {
    for (var i = 0; i < cart.items.length; i++) {
        if (cart.items[i].Id === index) {
            cart.items[i].quantity--;
            cart.items[i].amount = cart.items[i].quantity * cart.items[i].price;
            if (cart.items[i].quantity <= 0) {
                removeItem(index);
            } //end of if
        } //end of if
    } // end of for
    //productTotal();
    cartTotal();
  buildCart();
} // end of func changeQuantity

function increaseQuantity(index) {
    for (var i = 0; i < cart.items.length; i++) {
        if (cart.items[i].Id === index) {
            cart.items[i].quantity++;
            cart.items[i].amount = cart.items[i].quantity * cart.items[i].price;
            //alert(cart.items[i].amount)
            if (cart.items[i].quantity <= 0) {
                removeItem(index);
            } //end of if
        } //end of if
    } // end of for
    //buildCart();
   //productTotal();
   cartTotal();

    buildCart();
} // end of func changeQuantity



function removeItem(index){
for (var i = 0; i < cart.items.length; i++) {
    if (cart.items[i].Id === index) {
        document.getElementById("tableRow").innerHTML = "";
        cart.items.splice(i,1);
    }
}
if (cart.items.length == 0) {
    document.getElementById("tableRow").value = 0;

}
alert(cart.items.length+"These are the total items in the cart.");
//productTotal();
cartTotal();
buildCart();
} // end of func



function cartTotal() {
  var cartamount = 0;

for(var i = 0 ; i < cart.items.length; i++){
   cartamount+=  parseFloat(cart.items[i].amount);

}//end of for
cart.total = cartamount;
alert(cart.total +  "THIS IS THE TOTOL OF ALL ITEMS IN THE CART");
document.getElementById('subTotal').innerHTML = cartamount;
var checkoutInput = document.getElementById('checkoutinput');
checkoutInput.value = cart.total;
alert(checkoutInput.value + "this is the checkoutInput")
//cart.total = cartamount


}//func end





/*function productTotal() {
var itemTotal = 0;
//get total quantity/number of products in the cart to push to the global cart object
var totalQuantity = 0;
var cartLength = cart.items.length;  // apply coupon code
var rounded = itemTotal.toFixed(2);
cart.total = rounded;
buildCart();
// if there are no cart items
if (cartLength == 0) {
    itemTotal = 0;
    //better way?
    document.getElementById('subTotal').innerHTML = "";
}
//total number of cart quantities
for (var i = 0; i < cart.items.length; i++) {
    totalQuantity += cart.items[i].quantity;
    cart.numberItems = totalQuantity;
    displayCartQuantity();
}

} // end of func  */




//filter function
/*<script>
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
</script> */

/*function productTotal(){
  var itemTotal=0;
  var totalQuantity=0;
  var subTotal=0;
  var cartLength=cart.items.length;
 // alert("The cart lenght is" + cartLength);


  for(var i in cart.items){
    itemTotal += cart.items[i].total;
    cart.total = itemTotal;
  }//end of for

//total number of cart quantities
for(var i=0;i<cart.items.length;i++){
  totalQuantity += cart.items[i].Quantity;
  cart.numberItems=totalQuantity;
  displayCartQuantity();
}//end of for


}//end of function productTotal
*/

function sortCategoryFunction(category){
  var categories=[];
  var checkBox=document.getElementsByClassName("sortByCategory");

  for(c=0;c<checkBox.length;c++){
    if(checkBox[c].checked){
      //var x=checkBox[i].getAttribute("value");
      categories.push(checkBox[c].getAttribute("value"));
    }
  }
  var products = document.getElementsById('product-row');
     if (categories.length == 0) {
         for (var i = 0; i < products.length; i++) {
             products[i].style.display = 'block';
         }
     } else {
         for (var k = 0; k < products.length; k++) {
             var categoryVar = products[k].getAttribute('category'),
                 displayMode = 'none';
             for (var j = 0; j < categories.length; j++) {
                 if (categories[j] === category) {
                     displayMode = 'block';
                     break;
                 }
             }
             products[i].style.display = displayMode;
         }
     } // end of of else






  /*for(k=0;k<categories.length;k++)
  {
    var item=categories[k];
    console.log("This is the selected item category" + item);
    for(j=0;j<products.length;j++)
    {
        if(products[j].category === item)
        {
          selectedProducts.push(products[j]);
          console.log(selectedProducts.length);
        }
    }
  }*/
  console.log(selectedProducts);
  buildDom();
}

//List View
document.getElementById("list-view").onclick=function listView(){
  alert("Hello List");
  var row = document.getElementById('product-row');
  row.style.display= "inline";
  row.style.width="100%";
};

//Grid View
document.getElementById("grid-view").onclick=function gridView(){
  alert("Hello Grid");
  var row = document.getElementById('product-row');
  row.style.display= "";
  row.style.width="100%";
};//End of Grid View and List View

/////////////////////////////////////////////////////////

 function selectFunction(){
     var selectEl = document.getElementById('sortByChoice');
     var option = selectEl.options[selectEl.selectedIndex].value;
  if(option == "Low To High"){
      products.sort(ascendingOrder);
    }
 else if(selectEl.selectedIndex=== 1){
   alert("High To Low");
 products.sort(descendingOrder);
 }
 else{
 products.sort(alphabeticalOrder);
 }

 buildDom();
 } // end of function

 function ascendingOrder(a, b) {
    for (var i = 0; i < products.length; i++) {
        return parseFloat(a.price) - parseFloat(b.price);
    }
} //end of function

function descendingOrder(a, b) {
  for (var i = 0; i < products.length; i++){
        return parseFloat(b.price) - parseFloat(a.price);
    }
  }
function alphabeticalOrder(a, b) {
  for (var i = 0; i < products.length; i++){
    if (a.name > b.name){
      return 1;
    }
    if (a.name < b.name){
      return -1;
    }
    return 0;
  }
} // end of function



//localStorage.setItem("myCart", "cart");


function paypalCheckout(){
}
