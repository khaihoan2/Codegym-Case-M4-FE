let userApi = "http://localhost:8080/api/users/";

let uploadingFileApi = "http://localhost:8080/api/uploadingFiles/";

let currentUser = JSON.parse(localStorage.getItem("user"));

let userTablePageContent =
    `<!-- Content Wrapper. Contains page content -->
        <div class="wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Users</h1>
                        </div>
                    </div>
                </div><!-- /.container-fluid -->
            </section>

            <!-- Main content -->
            <section class="content">

                <!-- Default box -->
                <div class="card">
                    <div class="card-header">
                    
                    <button type="button" class="btn btn-success btn-sm" id="btn-create" onclick="showCreateForm()"
<!--                    data-target="#modal-user-create"-->
                    >
                   <i class="fas fa-plus-circle"></i> Add new
                </button>
                <div class="card-tools">
<!--                               Enter search tool here-->
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <table class="table table-striped projects">
                            <thead>
                            <tr>
                                <th style="width: 10%">
                                    #
                                </th>
                                <th style="width: 20%">
                                    Name
                                </th>
                                <th style="width: 20%">
                                    Username
                                </th>
                                <th style="width: 20%">
                                    Email
                                </th>
                                <th>
                                    Phone
                                </th>
                                <th style="width: 30%">
                                </th>
                            </tr>
                            </thead>
                            <tbody id="user-table-body">
                            
                            <!-- .......... -->
                            
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->

            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->`

function getAllUser() {
    $.ajax({
        url: userApi,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token,
        },
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.content.length; i++) {
                content += getUser(data.content[i]);
            }
            $("#user-table-body").html(content);
        }
    }).fail(function () {
        window.location.href = '/login/login.html';
    })
}


function getUser(user) {
    return `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td class="project-actions text-right">
                <a class="btn btn-primary btn-sm" id="btn-user-view" onclick="showViewForm(${user.id})">
                    <i class="fas fa-folder">
                    </i>
                    View
                </a>
                <a class="btn btn-info btn-sm" id="btn-edit" onclick="showEditForm(${user.id})">
                    <i class="fas fa-pencil-alt">
                    </i>
                    Edit
                </a>
                <a class="btn btn-danger btn-sm" id="btn-delete" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash">
                    </i>
                    Delete
                </a>
            </td>
        </tr>`;
}

function showViewForm(id) {
    $.getJSON(userApi + id, {}, function (user) {
        let myModal = new bootstrap.Modal(document.getElementById("modal-user-view"));
        myModal.show();
        $("#nameInfo").text(user.name);
        $("#phoneInfo").text(user.phone);
        $("#usernameInfo").text(user.username);
        $("#emailInfo").text(user.email);
        $("#addressInfo").text(user.address);
        $("#avatarInfo").text("");
    })
}

function showCreateForm() {
    let myModal = new bootstrap.Modal(document.getElementById("modal-user-create"));
    $("#idChecker").val("");
    $("#name").val("");
    $("#phone").val("");
    $("#username").val("");
    $("#password").val("");
    $("#email").val("");
    $("#address").val("");
    $("#multipartFiles").val("");
    myModal.show();
}

function showEditForm(id) {
    let myModal = new bootstrap.Modal(document.getElementById("modal-user-create"));
    $("#idChecker").val(id);
    $.getJSON(userApi + id, {}, function (user) {
        $("#name").val(user.name);
        $("#phone").val(user.phone);
        $("#username").val(user.username);
        $("#password").val("");
        $("#email").val(user.email);
        $("#address").val(user.address);
        myModal.show();
    })
}

//--------------Create and Edit-------------//
function saveUser(type, url) {
    let name = $("#name").val();
    let phone = $("#phone").val();
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val();
    let address = $("#address").val();
    // let avatar = $("#avatar").val(). ;

    let newUser = {
        name: name,
        phone: phone,
        username: username,
        password: password,
        email: email,
        address: address
    }
    $.ajax({
        url: url,
        type: type,
        headers: {
            "Authorization": "Bearer " + currentUser.token,
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        data: JSON.stringify(newUser),
        success: function (result) {
            getAllUser();
        }
    })
}


//-------------------Delete------------------//
function deleteUser(id) {
    $.ajax({
        url: userApi + id,
        type: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + currentUser.token,
        },
        success: function (result) {
            getAllUser();
        }
    }).fail(function () {

    })
}

$(document).ready(function () {
    // Submit form to create new user
    $("#btn-save-user").click(function () {
        let idChecker = $("#idChecker").val();
        if (idChecker === "") {
            saveUser("POST", userApi);
        } else {
            saveUser("PUT", userApi + idChecker)
        }
    })
})
