const container = document.getElementById("tableContainer");
let propertyFilter = document.getElementById("FilterByProperty");
let locationFilter = document.getElementById("FilterByLocation");
let propertySizeFilter = document.getElementById("FilterBySize");
let priceFilter = document.getElementById("FilterByPrice");
const editModalContent = document.getElementById("editModalContent");

let selectFilters = [propertyFilter,locationFilter,propertyFilter,priceFilter];

const items = [{
    originalId: 1,
    id: 1,
    title: "New Apartment",
    price: 125000,
    bedrooms: 2,
    bathrooms: 2,
    parking:1,
    propertyType: "Apartment",
    address: "6701 South Dixie Highway, Miami, FL, USA",
    area: 1789,
    img: "../images/propertyImages/architecture-g3acadea9c_1920.jpg"
},{
    originalId: 2,
    id: 2,
    title: "Equestrian Villa",
    price: 1599000,
    bedrooms: 4,
    bathrooms: 2,
    parking: 1,
    propertyType: "Villa",
    address: "3385 Pan American Dr, Miami, FL 33133, USA",
    area: 2960,
    img: "../images/propertyImages/residence-g3efd06f54_1920.jpg"
},{
    originalId: 3,
    id: 3,
    title: "Equestrian Family Home",
    price: 670000,
    bedrooms: 4,
    bathrooms: 2,
    parking:1,
    propertyType: "Single Family Home",
    address: "4746 Racine Ave , Chicago, IL 60640, USA",
    area: 1200,
    img: "../images/propertyImages/living-room-g1fd901d2c_1920.jpg"
},{
    originalId: 4,
    id: 4,
    title: "Single Family Home",
    price: 870000,
    bedrooms: 5,
    bathrooms: 3,
    parking: 1,
    propertyType: "Single Family Home",
    address: "7952 Ashland Ave , Chicago, IL 60640, USA",
    area: 3170,
    img: "../images/propertyImages/garlic-g6367d160c_1920.jpg"
},{
    originalId: 5,
    id: 5,
    title: "Modern Apartment",
    price: 970000,
    bedrooms: 1,
    bathrooms: 2,
    parking:1,
    propertyType: "Apartment",
    address: "4396 N Broadway St , Chicago, IL 60640, USA",
    area: 1560,
    img: "../images/propertyImages/reside-gd605ce63d_1920.jpg"
},{
    originalId: 6,
    id: 6,
    title: "Design Place Apartment",
    price: 967000,
    bedrooms: 5,
    bathrooms: 3,
    parking:1,
    propertyType: "Studio",
    address: "Sackett St Broadway , NY 07304, USA",
    area: 3890,
    img: "../images/propertyImages/architecture-gc66e5c789_1920.jpg"
},{
    originalId: 7,
    id: 7,
    title: "Design Apartment Ocean View",
    price: 899000,
    bedrooms: 1,
    bathrooms: 2,
    parking:1,
    propertyType: "Apartment",
    address: "9854 National Blvd #183 , Los Angeles, CA 90034, USA",
    area: 1749,
    img: "../images/propertyImages/san-francisco-g371f4de31_1920.jpg"
},{
    originalId: 8,
    id: 8,
    title: "Gorgeous Villa Bay View",
    price: 990000,
    bedrooms: 2,
    bathrooms: 2,
    parking:1,
    propertyType: "Villa",
    address: "5007 San Pedro St , Los Angeles, CA 90011, USA",
    area: 2150,
    img: "../images/propertyImages/house-ga77f24317_1920.jpg"
},{
    originalId: 9,
    id: 9,
    title: "Relaxing Studio",
    price: 250000,
    bedrooms: 2,
    bathrooms: 2,
    parking:1,
    propertyType: "Studio",
    address: "13701 S Stewart Ave , IL 60827, USA",
    area: 2700,
    img: "../images/propertyImages/furniture-gb474854b7_1920.jpg"
},{
    originalId: 10,
    id: 10,
    title: "Design Apartment",
    price: 876000,
    bedrooms: 3,
    bathrooms: 2,
    parking:1,
    propertyType: "Apartment",
    address: "Quincy St Brooklyn, NY , USA",
    area: 2560,
    img: "../images/propertyImages/home-g214be8d5d_1920.jpg"
}]

// localStorage.clear();

let currentItems = JSON.parse(localStorage.getItem('records')) ? JSON.parse(localStorage.getItem('records')) : items;

function setItems(){
    if(!JSON.parse(localStorage.getItem('records'))){
        localStorage.setItem('records', JSON.stringify(currentItems));
        console.log(JSON.parse(localStorage.getItem('records')));
    }else{
        console.log(JSON.parse(localStorage.getItem('records')));
    }
}

setItems();

function createTable(curItems){
    container.innerHTML = '';
    curItems.forEach(e => {
        container.innerHTML += `<tr>
        <th>${e.id}</th>
        <td><img src="${e.img}" class="img-fluid"></td>
        <td>${e.title}</td>
        <td>${e.price}</td>
        <td>${e.bedrooms}</td>
        <td>${e.bathrooms}</td>
        <td>${e.parking}</td>
        <td>${e.propertyType}</td>
        <td>${e.address}</td>
        <td>${e.area} sq.feet</td>
        <td>
        <div class="d-flex justify-content-between align-items-center">

            <i onclick="editModal(${e.originalId})" class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#EditModal"></i>
            <i onclick="checkDelete(${e.originalId})" data-bs-toggle="modal" data-bs-target="#ConfirmModal" class="fa-solid fa-trash"></i>
        </div>
        </td>
    </tr>`
    });
}

let deleteID;

function checkDelete(id){
    deleteID = id;
}
function clearDelete(){
    deleteID = undefined;
}

createTable(currentItems);

function deleteItem(id){
    let curStorage = JSON.parse(localStorage.getItem('records'));
    curStorage.splice((id-1),1);
    for(let i = 0; i<curStorage.length;i++){
        curStorage[i].id = i+1;
        curStorage[i].originalId = i+1;
    }
    localStorage.clear();
    localStorage.setItem('records',JSON.stringify(curStorage));
    currentItems = curStorage;
    selectFilters.forEach(e => {
        e.selectedIndex = 0;
    });
    createTable(curStorage);
}

function filterAll(){
    
    let filteredProperties, filteredLocations,filteredSizes,filteredPrices;

    if(propertyFilter.value == "Any"){
        filteredProperties = currentItems;
    }else{
        filteredProperties = currentItems.filter( x=>{
            return x.propertyType == propertyFilter.value;
        })
    }
    
    if(locationFilter.value == "Any"){
        filteredLocations = currentItems;
    }else{
        filteredLocations = currentItems.filter( x=>{
            return ~x.address.indexOf(locationFilter.value)
        })
    }
    
    if(propertySizeFilter.value == "Any"){
        filteredSizes = currentItems;
    }else{
        filteredSizes = currentItems.filter( x=>{
            return x.bedrooms <= propertySizeFilter.value;
        })
    }
    if(priceFilter.value == "Any"){
        filteredPrices = currentItems;
    }else{
        filteredPrices = currentItems.filter( x=>{
            return x.price <= priceFilter.value;
        })
    }
    const allFilters = [filteredProperties, filteredLocations ,filteredSizes ,filteredPrices];

    let values = allFilters.filter(x =>{
        return x.length != currentItems.length;
    });

    if(values.length == 0){
        for(let i = 0; i<currentItems.length;i++){
            currentItems[i].id = i+1;
        }
        createTable(currentItems);
    }else{
        let arrayOfArrays = [];
    
        for(let i = 0; i<values.length;i++){
            arrayOfArrays.push(values[i].length);
        }
    
        const minValueIndex = (arrayOfArrays.indexOf(Math.min(...arrayOfArrays)));
        const maxValueIndex = (arrayOfArrays.indexOf(Math.max(...arrayOfArrays)));
    
        let filter = values[maxValueIndex].filter(x =>{
            return values[minValueIndex].includes(x);
        })
    
        for(let i = 0; i<filter.length;i++){
            filter[i].id = i+1;
        }
        createTable(filter);
    }
}

function createNewItem(e){
    e.preventDefault();
    let form = new FormData(document.forms.AddForm);
    let newItem;
    if(~form.get('Address').indexOf(form.get("Location"))){
        newItem = {
            originalId: currentItems.length+1,
            id: currentItems.length+1,
            title: form.get('Name'),
            price: form.get('Price'),
            bedrooms: form.get('Bedrooms'),
            bathrooms: form.get('Bathrooms'),
            parking: form.get('Parking'),
            propertyType: form.get('Property-Type'),
            address: form.get('Address') ,
            area: form.get('Area'),
            img: "../images/mountains-g3d56cdc58_1920.jpg"
        };
    }else{
        newItem = {
            originalId: currentItems.length+1,
            id: currentItems.length+1,
            title: form.get('Name'),
            price: form.get('Price'),
            bedrooms: form.get('Bedrooms'),
            bathrooms: form.get('Bathrooms'),
            parking: form.get('Parking'),
            propertyType: form.get('Property-Type'),
            address: form.get('Address') + ' ' + form.get("Location") ,
            area: form.get('Area'),
            img: "../images/mountains-g3d56cdc58_1920.jpg"
        };
    }
    currentItems.push(newItem);
    createTable(currentItems);
    document.getElementById("closeModalButton").click();
    localStorage.setItem('records', JSON.stringify(currentItems));
    console.log(newItem);
}

function editModal(id){
    let curStorage = JSON.parse(localStorage.getItem('records'));
    createEditModal(curStorage[id-1]);
}

function createEditModal(element){
    editModalContent.innerHTML = "";
    editModalContent.innerHTML += `
    <div>
    <label class="form-label" for="Img">Img</label>
    <input id="imgValue" value="${element.img}" disabled class="form-control" name="Img" type="text">
    </div>
    <div>
    <label class="form-label" for="ID">ID</label>
    <input id="idValue" value="${element.originalId}" disabled class="form-control" name="ID" type="number">
    </div>
    <div>
    <label class="form-label" for="Name">Name</label>
    <input value="${element.title}" class="form-control" name="Name" type="text">
    </div>
<div>
    <label class="form-label" for="Price">Price</label>
    <input value="${element.price}" class="form-control" name="Price" type="number">
</div>
<div>
    <label class="form-label" for="Bedrooms">Bedrooms</label>
    <input value="${element.bedrooms}" class="form-control" name="Bedrooms" type="number">
</div>
<div>
    <label class="form-label" for="Bathrooms">Bathrooms</label>
    <input value="${element.bathrooms}" class="form-control" name="Bathrooms" type="number">
</div>
<div>
    <label class="form-label" for="Parking">Parking</label>
    <input value="${element.parking}" class="form-control" name="Parking" type="number">
</div>
<div>
    <label class="form-label" for="Property-Type">Property-Type</label>
    <select id="editProperty" class="form-control" name="Property-Type">
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="SingleFamilyHome">Single Family Home</option>
        <option value="Studio">Studio</option>
    </select>
</div>
<div>
    <label class="form-label" for="Address">Address</label>
    <input value="${element.address}" class="form-control" name="Address" type="text">
</div>
<div>
    <label class="form-label" for="Area">Area</label>
    <input value="${element.area}" class="form-control" name="Area" type="number">
</div>
<div>
    <label class="form-label" for="Location">Location</label>
    <select id="editLocation" class="form-control" name="Location">
        <option value="FL">Florida</option>
        <option value="IL">Illinois</option>
        <option value="CA">California</option>
        <option value="NY">New York</option>
    </select>
</div>
<button type="submit" data-bs-dismiss="modal" class="w-25 mx-auto mt-3 btn btn-primary">
    Button
</button>`

let editLocation = document.getElementById("editLocation").options;
for(let i = 0;i<editLocation.length;i++){
    if(~element.address.indexOf(editLocation[i].value)){
        document.getElementById("editLocation").value = editLocation[i].value
    }
}
document.getElementById("editProperty").value = element.propertyType;

}

function editItem(e){
    e.preventDefault();
    let form = new FormData(document.forms.editModalContent);
    
    let curStorage = JSON.parse(localStorage.getItem('records'));
    let newItem;
    if(~curStorage[document.getElementById("idValue").value].address.indexOf(form.get("Location"))){
        newItem = {
            originalId: document.getElementById("idValue").value,
            id: document.getElementById("idValue").value,
            title: form.get('Name'),
            price: form.get('Price'),
            bedrooms: form.get('Bedrooms'),
            bathrooms: form.get('Bathrooms'),
            parking: form.get('Parking'),
            propertyType: form.get('Property-Type'),
            address: form.get('Address'),
            area: form.get('Area'),
            img: document.getElementById("imgValue").value
        };
    }else{
        newItem = {
            originalId: document.getElementById("idValue").value,
            id: document.getElementById("idValue").value,
            title: form.get('Name'),
            price: form.get('Price'),
            bedrooms: form.get('Bedrooms'),
            bathrooms: form.get('Bathrooms'),
            parking: form.get('Parking'),
            propertyType: form.get('Property-Type'),
            address: form.get('Address') + ' ' + form.get("Location") ,
            area: form.get('Area'),
            img: document.getElementById("imgValue").value
        };
    }

    curStorage.splice(document.getElementById("idValue").value-1,1,newItem);

    for(let i = 0; i<curStorage.length;i++){
        curStorage[i].id = i+1;
        curStorage[i].originalId = i+1;
    }
    localStorage.clear();
    localStorage.setItem('records',JSON.stringify(curStorage));
    currentItems = curStorage;
    createTable(currentItems);
    
}

function confirmDelete(){

}