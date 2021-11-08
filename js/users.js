let userApi = "http://localhost:8080/api/users/";

let uploadingFileApi = "http://localhost:8080/api/uploadingFiles/";

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
                    
                    <button type="button" class="btn btn-success btn-sm" id="btn-create"
                    data-toggle="modal" data-target="#modal-user-create">
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
                                <th style="width: 5%">
                                    #
                                </th>
                                <th style="width: 30%">
                                    Name
                                </th>
                                <th style="width: 30%">
                                    Email
                                </th>
                                <th>
                                    Phone
                                </th>
                                <th style="width: 20%">
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
            'Authorization': 'Bearer ' + currentUser.jwt,
        },
        success: function (data){
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += getUser(data[i]);
            }
            $("#user-table-body").html(content);
        }
    }).fail(function (){
        window.location.href = '/login/login.html';
    })
}

function getUser(user) {
    return `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td class="project-actions text-right">
                <a class="btn btn-primary btn-sm" id="btn-user-view">
                    <i class="fas fa-folder">
                    </i>
                    View
                </a>
                <a class="btn btn-info btn-sm" id="btn-edit">
                    <i class="fas fa-pencil-alt">
                    </i>
                    Edit
                </a>
                <a class="btn btn-danger btn-sm" id="btn-delete">
                    <i class="fas fa-trash">
                    </i>
                    Delete
                </a>
            </td>
        </tr>`;
}

function showCreateForm() {
    let myModal = new bootstrap.Modal($("#modal-user-create"));
    $("#name").val("");
    $("#phone").val("");
    $("#username").val("");
    $("#password").val("");
    $("#email").val("");
    $("#address").val("");
    $("#multipartFiles").val("");
    $("#checkCreateOrEdit").val("create");
    myModal.show();
}

function showEditForm(id){
    let myModal = new bootstrap.Modal($('#modal-user-create'));
    $("#checkCreateOrEdit").val(id);
    $.getJSON(userApi + id, {}, function (user){
        $("#name").val(user.name);
        $("#phone").val(user.phone);
        $("#username").val(user.username);
        $("#password").val(user.password);
        $("#email").val(user.email);
        $("#address").val(user.address);
        $("#multipartFiles").val("");
        $("#checkCreateOrEdit").val("create");
        myModal.show();
    })
}