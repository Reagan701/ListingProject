const container = document.getElementById("ListingID");
let propertyFilter = document.getElementById("FilterByProperty");
let locationFilter = document.getElementById("FilterByLocation");
let propertySizeFilter = document.getElementById("FilterBySize");
let priceFilter = document.getElementById("FilterByPrice");
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

let localInfo = localStorageInfo() ? localStorageInfo() : items ;

function localStorageInfo(){
    return JSON.parse(localStorage.getItem('records'));
}

function getInfo(){

    localInfo.forEach(e => {
        container.innerHTML += `
        <div class="my-2 col-md-4">
            <div class="imgContainer">
                <img class="w-100 img-fluid" src="${e.img}" alt="${e.title} image">
                <div class="preHover">
                            
                </div>
                <div class="content">
                    <div class="row">
                        <div class="col-md-12">
                            <button class="btn btn-secondary">For Rent</button>
                                <p>${e.title}</p>
                                <p>$ ${e.price}</p>
                                <div class="d-flex gap-3">
                                    <i class="fa-solid fa-bed"> ${e.bedrooms}</i>
                                    <i class="fa-solid fa-shower"> ${e.bathrooms}</i>
                                    <i class="fa-solid fa-car"> ${e.parking}</i>
                                    <i class="fa-solid fa-chart-area"> ${e.area} sq. ft</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
}

getInfo();
function createHTML(array){
    container.innerHTML = '';
    array.forEach(e => {
        container.innerHTML += `
        <div class="my-2 col-md-4">
            <div class="imgContainer">
                <img class="w-100 img-fluid" src="${e.img}" alt="${e.title} image">
                <div class="preHover">
                            
                </div>
                <div class="content">
                    <div class="row">
                        <div class="col-md-12">
                            <button class="btn btn-secondary">For Rent</button>
                                <p>${e.title}</p>
                                <p>$ ${e.price}</p>
                                <div class="d-flex gap-3">
                                    <i class="fa-solid fa-bed"> ${e.bedrooms}</i>
                                    <i class="fa-solid fa-shower"> ${e.bathrooms}</i>
                                    <i class="fa-solid fa-car"> ${e.parking}</i>
                                    <i class="fa-solid fa-chart-area"> ${e.area} sq. ft</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
}

function filterAll(){
    let currentItems = localStorageInfo();
    
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
        createHTML(currentItems);
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
        createHTML(filter);
    }
}