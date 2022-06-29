const container = document.getElementById("ListingID");

function localStorageInfo(){
    return JSON.parse(localStorage.getItem('records'));
}

function getInfo(){
    let localInfo = localStorageInfo();

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