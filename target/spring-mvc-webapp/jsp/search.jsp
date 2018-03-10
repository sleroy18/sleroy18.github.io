<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Hello Controller Page</title>
        <!-- Bootstrap core CSS -->
        <link href="${pageContext.request.contextPath}/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="${pageContext.request.contextPath}/css/starter-template.css" rel="stylesheet">

        <!-- SWC Icon -->
        <link rel="shortcut icon" href="${pageContext.request.contextPath}/img/icon.png">

    </head>
    <body>
        <div class="container">
            <h1>Search DVD Library</h1>
            <hr/>
            <div class="navbar">
                <ul class="nav nav-tabs">
                    <li role="presentation"><a href="${pageContext.request.contextPath}/home">Home</a></li>
                    <li role="presentation" class="active"><a href="${pageContext.request.contextPath}/search">Hello Controller</a></li>
                </ul>    
            </div>
            <div class="col-md-6">
                <table id="contactTable" class="table table-hover table-striped">
                    <tr>
                        <th width="40%">DVD Title</th>
                        <!--<th width="30%">Release Year</th>-->
                        <th width="15%"></th>
                        <th width="15%"></th>
                    </tr>
                    <!-- This is where our contacts will be.  We will populate this with JS -->
                    <tbody id="contentRows"></tbody>
                </table>
            </div>
            <div class="col-md-6">
                <!-- Add contact form -->
                <h2>Search for DVD</h2>
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="search-dvd-title" 
                               class="col-md-4 control-label">Title:</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="search-dvd-title" placeholder="Title" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="search-dvd-year" 
                               class="col-md-4 control-label">Release Year:</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="search-dvd-year" placeholder="Release Year" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="search-dvd-mpaa-rating" 
                               class="col-md-4 control-label">MPAA Rating:</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="search-dvd-mpaa-rating" placeholder="MPAA Rating" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="search-dvd-director" 
                               class="col-md-4 control-label">Director:</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="search-dvd-director" placeholder="Director" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="search-dvd-studio" 
                               class="col-md-4 control-label">Studio:</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="search-dvd-studio" placeholder="Studio" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="search-dvd-user-rating" 
                               class="col-md-4 control-label">User Rating:</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="search-dvd-user-rating" placeholder="User Rating" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-offset-4 col-md-8">
                            <button type="submit"
                                    id="search-button"
                                    class="btn btn-default">
                                Search for Contacts
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal fade" id="detailsModal" tabindex="-1" role="dialog"
             aria-labelledby="detailsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title" id="detailsModalLabel">DVD Details</h4>
                    </div>
                    <div class="modal-body">
                        <h3 id="dvdId"></h3>
                        <table class="table table-bordered">
                            <tr>
                                <th>DVD Title:</th>
                                <td id="dvd-title"></td>
                            </tr>
                            <tr>
                                <th>DVD Year</th>
                                <td id="dvd-year"></td>
                            </tr>
                            <tr>
                                <th>DVD MPAA Rating</th>
                                <td id="dvd-mpaa-rating"></td>
                            </tr>
                            <tr>
                                <th>DVD Director</th>
                                <td id="dvd-director"></td>
                            </tr>
                            <tr>
                                <th>DVD studio</th>
                                <td id="dvd-studio"></td>
                            </tr>
                            <tr>
                                <th>DVD User-Rating</th>
                                <td id="dvd-user-rating"></td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog"
             aria-labelledby="editDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title" id="editDetailsModalLabel">DVD Edit</h4>
                    </div>
                    <div class="modal-body">
                        <h2>Edit DVD</h2>
                        <div id="validationErrorsEdit" class="warning bg-danger"></div>
                        <form class="form-horizontal" role="form">
                            <input type="hidden" id="edit-dvd-id" />

                            <div class="form-group">
                                <label for="edit-dvd-title" 
                                       class="col-md-4 control-label">DVD Title</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="edit-dvd-title" placeholder="DVD" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="edit-dvd-year" 
                                       class="col-md-4 control-label">DVD Release Year</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="edit-dvd-year" placeholder="Year" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="edit-dvd-mpaa-rating" 
                                       class="col-md-4 control-label">DVD MPAA Rating</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="edit-dvd-mpaa-rating" placeholder="MPAA" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="edit-dvd-director" 
                                       class="col-md-4 control-label">DVD Director</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="edit-dvd-director" placeholder="Director" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="edit-dvd-studio" 
                                       class="col-md-4 control-label">DVD Studio</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="edit-dvd-studio" placeholder="Studio" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="edit-dvd-user-rating" 
                                       class="col-md-4 control-label">DVD User-Rating</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="edit-dvd-user-rating" placeholder="User-Rating" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-offset-4 col-md-8">
                                    <button type="submit"
                                            id="edit-button"
                                            class="btn btn-default"
                                            data-dismiss="">
                                        Edit DVD
                                    </button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="${pageContext.request.contextPath}/js/jquery-1.11.3.min.js"></script>
        <script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>

    </body>
</html>

