const container = document.getElementById("tableContainer");
const propertyFilter = document.getElementById("FilterByProperty");
const locationFilter = document.getElementById("FilterByLocation");
const propertySizeFilter = document.getElementById("FilterBySize");
const priceFilter = document.getElementById("FilterByPrice");
const items = [{
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
let currentlyFiltered = items;

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
    <th >${e.id}</th>
        <td><img src="${e.img}" class="img-fluid"></  td>
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
            <i class="fa-solid fa-square-plus"></i> <i onclick="deleteItem(${e.id})" class="fa-solid fa-trash"></i>
        </div>
        </td>
    </tr>`
    });
}

createTable(currentItems);

function deleteItem(id){
    let curStorage = JSON.parse(localStorage.getItem('records'));
    curStorage.splice((id-1),1);
    for(let i = 0; i<curStorage.length;i++){
        curStorage[i].id = i+1;
    }
    localStorage.clear();
    localStorage.setItem('records',JSON.stringify(curStorage));
    currentItems = curStorage;
    createTable(curStorage);
}

let previousFilter = items;

function filterByPrice(e){
    if(e.target.value =="Any"){
        return createTable(previousFilter);
    }else{
        let filteredResult = currentItems.filter(x =>{
            return x.price <= e.target.value;
        });
        previousFilter = currentItems;
        currentItems = filteredResult;
        createTable(filteredResult);
    }
}

function filterByLocation(e){
    if(e.target.value == "Any"){
        currentItems = items;
        return createTable(currentItems);
    }else{
        let filteredResult = currentlyFiltered.filter(x =>{
            return ~x.address.indexOf(e.target.value);
        });
        currentItems = filteredResult;
        createTable(filteredResult);
    }
}

function filterByPropertySize(e){
    if(e.target.value =="Any"){
        currentItems = items;
        return createTable(currentItems);
    }
    let filteredResult = currentItems.filter(x =>{
        return x.bedrooms <= e.target.value;
    });
    currentItems = filteredResult;
    createTable(filteredResult);
}

function filterByPropertyType(e){
    if(e.target.value =="Any"){
        currentItems = items;
        return createTable(currentItems);
    }
    let filteredResult = currentItems.filter(x =>{
        return x.propertyType == e.target.value;
    });
    currentItems = filteredResult;
    createTable(filteredResult);
}