let urlCategory = `http://localhost:8080/api/category/`

let urlCity = 'http://localhost:8080/api/city/'

let urlRoom = `http://localhost:8080/api/rooms/`

let urlImage = `http://localhost:8080/api/images/room/`

let urlReview = `http://localhost:8080/api/reviews/`

let urlBooking = `http://localhost:8080/api/bookings/`

let page = 0;

let user = JSON.parse(localStorage.getItem("user"));

function showImgAvartar() {
    if (user != null) {
        $.ajax({
            url: `http://localhost:8080/api/images/user/${user.id}`,
            type: "GET",
            headers: {
                "Authorization": "Bearer " + user.token,
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            success: function (image) {
                $("#loginAndRegister").addClass("side-panel-trigger");
                $("#loginAndRegister").html(`<i class="fas fa-user"></i>${user.name}`);
                if (image.name == null) {
                    $("#imageAvatar").html(`<img class="mb-3" src="images/logo-preloader.gif" height="80px" width="80px"
                                            style="border-radius: 50%; border: 1px solid black"/>`)
                } else {
                    $("#imageAvatar").html(`<img class="mb-3" src="images/logo-preloader.gif" height="80px" width="80px"
                                            style="border-radius: 50%; border: 1px solid black"/>`)
                }
            }
        });
    }
}

showImgAvartar();

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

function showRoom(room) {
    let content = `<div class="real-estate-item portfolio-item col-12 col-md-6 col-lg-4 col-xl-4">
<div class="real-estate-item-image">
<div class="label badge badge-danger bg-color2">For you</div>
<p>
<img style="width: 100%; cursor: pointer" height="auto" src="demos/real-estate/images/items/1.jpg" alt="Image 1" onclick="roomInfo(${room.id})">
</p>
<div class="real-estate-item-price">${room.price}<span>Leasehold</span></div>
<div class="real-estate-item-info clearfix" data-lightbox="gallery">
<a href="demos/real-estate/images/items/1.jpg" data-toggle="tooltip" title="Images" data-lightbox="gallery-item"><i class="icon-line-stack-2"></i></a>
<a href="demos/real-estate/images/items/3.jpg" class="d-none" data-lightbox="gallery-item"></a>
<a href="#" data-toggle="tooltip" title="Like"><i class="icon-line-heart"></i></a>
</div>
</div>

<div class="real-estate-item-desc p-0">
<h3>${room.city.name}</h3>
<p>
<span>Seminyak Area</span>d
</p>
<a href="#" class="real-estate-item-link"><i class="icon-info"></i></a>
<div class="line" style="margin-top: 15px; margin-bottom: 15px;"></div>
<div class="real-estate-item-features row font-weight-medium font-primary px-3 clearfix">
<div class="col-lg-4 col-6 p-0">Beds: <span class="color">${room.beds}</span></div>
<div class="col-lg-4 col-6 p-0">Baths: <span class="color">${room.baths}</span></div>
<div class="col-lg-4 col-6 p-0">Area: <span class="color">${room.area}</span></div>
<div class="col-lg-4 col-6 p-0">Pool: <span class="text-success"><i class="icon-check-sign"></i></span></div>
<div class="col-lg-4 col-6 p-0">Internet: <span class="text-success"><i class="icon-check-sign"></i></span></div>
<div class="col-lg-4 col-6 p-0">Cleaning: <span class="text-danger"><i class="icon-minus-sign-alt"></i></span></div>
</div>
</div>
</div>`
    return content;
}

function showListRoom() {
    let rooms = JSON.parse(localStorage.getItem("listRoom"));
    let content = "";
    for (let i = 0; i < rooms.length; i++) {
        content += showRoom(rooms[i]);
    }
    $(document).ready(function () {
        $("#showListRoom").append(content)
    })
}

showListRoom();

function searchRoomHotel(page) {
    let city = $("#hotelLocation").val();
    let category = $("#hotelCategory").val();
    let beg = $("#hotelBed").val();
    let bath = $("#hotelBath").val();
    let priceLow = $('#priceHotel').data().from;
    let priceHigh = $('#priceHotel').data().to;
    let areaLow = $("#areaHotel").data().from;
    let areaHigh = $("#areaHotel").data().to;

    $.ajax({
        url: `${urlRoom}findRoom?cityId=${city}
        &categoryId=${category}
        &minAreaRoom=${areaLow}
        &maxAreaRoom=${areaHigh}
        &bedsRoom=${beg}
        &minPriceRoom=${priceLow}
        &maxPriceRoom=${priceHigh}
        &bathsRoom=${bath}&page=${page}`,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + user.token,
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: function (data) {
            localStorage.setItem("listRoom", JSON.stringify(data));
            if (page == 0) {
                $("#showListRoom").html("");
            }
            showListRoom();
        }
    });
}

$(document).ready(function(){
    $("#footer").hide();
    $(window).scroll(function(){
        console.log(page);
        console.log($(window).scrollTop());
        console.log($(document).height()-$(window).height());
        if($(window).scrollTop() > $(document).height()-$(window).height()){
            searchRoomHotel(page += 1);
        }
    });
});

function showImage(image) {
    let content = `<div class="carousel-item active">
                    <img src="demos/real-estate/images/items/${image.name}" class="d-block w-100">
                    </div>`
    return content;
}

function showBookingPresent(booking) {
    let content = `<table class="table">
                    <tr>
                        <td scope="col"><img src="" alt="" width="50px" height="50px"></td>
                        <td scope="col">
                            <p style="color: #1abc9c">${booking.room.city.name}</p>
                            <table style="margin-bottom: 0px">
                                <tr>
                                    <td>Checkin</td>
                                    <td>Checkout</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 12px">${booking.checkIn}</td>
                                    <td style="font-size: 12px">${booking.checkOut}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>`
    return content;
}

function showBookingPast(booking) {
    let content = `<table class="table">
                    <tr>
                        <td scope="col"><img src="" alt="" width="50px" height="50px"></td>
                        <td scope="col">
                            <p style="color: #1abc9c">${booking.room.city.name}</p>
                            <table style="margin-bottom: 0px">
                                <tr>
                                    <td>Checkin</td>
                                    <td>Checkout</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 12px">${booking.checkIn}</td>
                                    <td style="font-size: 12px">${booking.checkOut}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="pb-0"><button class="btn btn-primary" style="background-color: #1abc9c"
                                    onclick="roomInfo(${booking.room.id})">Booking</button></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>`
    return content;
}

function showListBookingHistory() {
    $.ajax({
        url: urlBooking,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + user.token,
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: function (data) {
            let contentPresent = "";
            let contentPast = "";
            let date = new Date()
            let day = date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            let dateNow = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + day;
            for (let i = 0; i < data.content.length; i++) {
                let dateCheckout = data.content[i].checkOut;
                if (dateCheckout.localeCompare(dateNow) > 0) {
                    contentPresent += showBookingPresent(data.content[i]);
                } else {
                    contentPast += showBookingPast(data.content[i]);
                }
            }
            $("#bookingPast").html(contentPast);
            $("#bookingPresent").html(contentPresent);
        }
    })
}





