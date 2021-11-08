let urlCategory = `http://localhost:8080/api/category/`

let urlCity = 'http://localhost:8080/api/city/'

let urlRoom = `http://localhost:8080/api/rooms/`

let urlImage = `http://localhost:8080/api/uploading-files/room/`

let urlReview = `http://localhost:8080/api/reviews/`

let urlBooking = `http://localhost:8080/api/bookings/`

let user = JSON.parse(localStorage.getItem("user"));

function showUser() {
    $(document).ready(function () {
        if (user == null) {
            $("#showLoginAndRegister").html(`<a id="loginAndRegister" onclick="showLoginAndRegister()" style="color: #fff">Login/Register</a>`);
            $("#logout").hide();
        } else {
            $("#showLoginAndRegister").html(`<a id="loginAndRegister" onclick="showListBookingHistory()" style="color: #fff"><i class="fas fa-user"></i>${user.name}</a>`);
            $("#logout").show();
        }
    })
}

showUser();

$(document).ready(function () {
    $("#logout").click(function () {
        localStorage.clear();
        user = localStorage.getItem("user");
        showUser();
    })
})

function showLoginAndRegister() {
    window.location.href = "http://localhost:63343/Codegym-Case-M4-FE/user/login/login.html";
}


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
                                    <p><span>${roomRating.address}</span></p>
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



function roomInfo(id) {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    $.ajax({
        url: urlImage + id,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + user.token,
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: function (data) {
            $("#roomId").val(id);
            let content = "";
            for (let i = 0; i < data.length; i++) {
                if (i == 0) {
                    content += `<div class="carousel-item active">
                    <img src="demos/real-estate/images/items/${data[i].name}" class="d-block w-100">
                    </div>`
                } else {
                    content += `<div class="carousel-item">
                    <img src="demos/real-estate/images/items/${data[i].name}" class="d-block w-100">
                    </div>`
                }
                $("#roomCityName").html(`<i class="fas fa-caravan mr-2" style="color: #1abc9c"></i>${data[i].room.city.name}`);
                $("#priceRoom").html(data[i].room.price)
            };
            $("#showListImageRoom").html(content);
            $.ajax({
                url: urlReview + `rating/${id}`,
                type: "GET",
                headers: {
                    "Authorization": "Bearer " + user.token,
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                success: function (result) {
                    $("#roomRating").html(result.avg);
                    $("#roomRatingCount").html(result.count)
                }
            })
        }
    });
    myModal.show();
}

function showBookingRoom() {
    var myModal = new bootstrap.Modal(document.getElementById('bookingRoom'))
    myModal.show();
}

$(document).ready(function(){
    $("#adults").blur(function(){
        let adults = $("#adults").val();
        let checkIn = $("#checkin").val();
        let checkOut = $("#checkout").val();
        if (adults == "" || adults < 0) {
            $(this).css("border-color", "red");
        } else {
            $(this).css("border-color", "#ccc");
        }
        if (adults != "" && adults > 0 && checkIn != "" && checkOut != "") {
            $("#buttonCreateBookingRoom").removeClass("disabled");
        }
    });
    $("#checkin").blur(function(){
        let adults = $("#adults").val();
        let checkIn = $("#checkin").val();
        let checkOut = $("#checkout").val();
        if (checkIn == "") {
            $(this).css("border-color", "red");
        } else {
            $(this).css("border-color", "#ccc");
        }
        if (adults != "" && adults > 0 && checkIn != "" && checkOut != "") {
            $("#buttonCreateBookingRoom").removeClass("disabled");
        }
    });
    $("#checkout").blur(function(){
        let adults = $("#adults").val();
        let checkIn = $("#checkin").val();
        let checkOut = $("#checkout").val();
        if (checkOut == "") {
            $(this).css("border-color", "red");
        } else {
            $(this).css("border-color", "#ccc");
        }
        if (adults != "" && adults > 0 && checkIn != "" && checkOut != "") {
            $("#buttonCreateBookingRoom").removeClass("disabled");
        }
    });
});

function createBookingRoom() {
    let adults = $("#adults").val();
    let children = $("#children").val();
    let checkIn = $("#checkin").val();
    let checkOut = $("#checkout").val();
    let roomId = $("#roomId").val();
    let booking = {
        adults: adults,
        children: children,
        checkIn: checkIn,
        checkOut: checkOut,
        room: {
            id: roomId
        }
    }
    $.ajax({
        url: urlBooking,
        type: "POST",
        headers: {
            "Authorization": "Bearer " + user.token,
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        data: JSON.stringify(booking),
        success: function (bookingRoom) {
            showRoomRating();
        }
    })
}

