let urlCategory = `http://localhost:8080/api/category/`

let urlCity = 'http://localhost:8080/api/city/'

let urlRoom = `http://localhost:8080/api/rooms/`

let user = JSON.parse(localStorage.getItem("user"));

function category(category) {
    let content = `<option value="${category.id}">${category.name}</option>`;
    return content;
}

function showCategory() {
    $.ajax({
        url: urlCategory,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + user.token,
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: function (data) {
            let content = `<option value="">Any</option>`;
            for (let i = 0; i < data.length; i++) {
                content += category(data[i]);
            }
            $(".showCategory").html(content);
        }
    });
}

showCategory();

function city(city) {
    let content = `<option value="${city.id}">${city.name}</option>`;
    return content;
}

function showCity() {
    $.ajax({
        url: urlCity,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + user.token,
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: function (data) {
            let content = `<option value="">Any</option>`;
            for (let i = 0; i < data.length; i++) {
                content += category(data[i]);
            }
            $(".showCity").html(content);
        }
    });
}

showCity();

function showRoomRating(roomRating, cityName) {
    let content = `<div class="oc-item">
                            <div class="real-estate-item">
                                <div class="real-estate-item-image">
                                    <div class="badge badge-success">Hot Deal</div>
                                    <a onclick="roomInfo(${roomRating.id})">
                                        <img src="demos/real-estate/images/items/2.jpg" alt="Image 2">
                                    </a>
                                    <div class="real-estate-item-price">
                                        ${roomRating.price}<span>bi-annually</span>
                                    </div>
                                    <div class="real-estate-item-info clearfix">
                                        <a href="#"><i class="icon-line-stack-2"></i></a>
                                        <a href="#"><i class="icon-line-heart"></i></a>
                                    </div>
                                </div>

                                <div class="real-estate-item-desc">
                                    <h3>${cityName}</h3>
                                    <span>Seminyak Area</span>

                                    <a href="#" class="real-estate-item-link"><i class="icon-info"></i></a>

                                    <div class="line" style="margin-top: 15px; margin-bottom: 15px;"></div>

                                    <div class="real-estate-item-features font-weight-medium clearfix">
                                        <div class="row no-gutters">
                                            <div class="col-lg-4 p-0">Beds: <span class="color">${roomRating.beds}</span></div>
                                            <div class="col-lg-4 p-0">Baths: <span class="color">${roomRating.baths}</span></div>
                                            <div class="col-lg-4 p-0">Area: <span class="color">${roomRating.area}</span></div>
                                            <div class="col-lg-4 p-0">Pool: <span class="text-success"><i
                                                    class="icon-check-sign"></i></span></div>
                                            <div class="col-lg-4 p-0">Internet: <span class="text-success"><i
                                                    class="icon-check-sign"></i></span></div>
                                            <div class="col-lg-4 p-0">Rating: <span class="text-success">${roomRating.avgRating}
                                            <i class="far fa-star"></i></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
    return content;
}

function showTopRoomRating() {
    $("#showTopRoomRating").html("");
    $.ajax({
        url: urlRoom + "rating",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + user.token,
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.content.length; i++) {
                $.ajax({
                    url: urlCity + data.content[i].cityId,
                    type: "GET",
                    headers: {
                        "Authorization": "Bearer " + user.token,
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    success: function (city) {
                        content += showRoomRating(data.content[i], city.name);
                        $("#showTopRoomRating").append(content);
                    }
                });
                content = "";
            }
        }
    });
}

showTopRoomRating();

function searchRoomArea() {
    let city = $("#homestayLocation").val();
    let category = $("#homestayCategory").val();
    let beg = $("#homestayBed").val();
    let bath = $("#homestayBath").val();
    let priceLow = $('#priceHomestay').data().from;
    let priceHigh = $('#priceHomestay').data().to;
    let areaLow = $("#areaHomestay").data().from;
    let areaHigh = $("#areaHomestay").data().to;
}

