const container = document.getElementById("ListingID");
let propertyFilter = document.getElementById("FilterByProperty");
let locationFilter = document.getElementById("FilterByLocation");
let propertySizeFilter = document.getElementById("FilterBySize");
let priceFilter = document.getElementById("FilterByPrice");
let localInfo = localStorageInfo();

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