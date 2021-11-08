

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