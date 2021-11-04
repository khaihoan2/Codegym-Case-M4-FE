let userApi = "http://localhost:8080/api/users/"

let userTablePage =
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
                            <tbody id="user-table">
                            
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

function showUserTable() {
    $.getJSON(userApi, {}, function (users) {
        let content = "";
        for (let i = 0; i < users.length; i++) {
            content += showUserRow(users[i]);
        }
        $("#user-table").html(content);
    })
}

function showUserRow(user) {
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

function createUser() {
    let myModal = new bootstrap.Modal($("#modalCreate"));
    $("#name").val("");
    $("#content").val("");
    $("#multipartFiles").val("");
    $("#checkCreateOrEdit").val("create");
    myModal.show();
}

function viewUser() {

}

function editUser() {

}

function deleteUser() {

}