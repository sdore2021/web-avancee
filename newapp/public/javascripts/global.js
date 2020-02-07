var studentListData = [];
$(document).ready(function () {
    fillHTMLTable();
    $('#studentList table tbody').on('click', 'td a.linkshowstudent', displayStudentData);
    $('#btnAddStudent').on('click', addStudent);
    $('#studentList table tbody').on('click', 'td a.linkdeletestdent', deleteStudent);
});

function fillHTMLTable() {
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON('/users/studentlist', function (data) {
        studentListData = data;//POURQUOI? Vous verrez plus tard!
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowstudent" rel="' + this.username
                + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeletestdent" rel="' + this._id +
                '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#studentList table tbody').html(tableContent);
    });
};

function displayStudentData(event) {
    event.preventDefault();
    console.log(event.target);
    // RETROUVER le username à partir de l’attribut rel de link
    var thisStudentName = event.target.getAttribute('rel');
    //console.log(thisStudentName);
    // RECUPERER l’indice de thisStudentName dans le tableau studentListData
    // sur le tableau studentListData utliser la méthode map
    var arrayPosition = studentListData.map((student, index) => {
        if (thisStudentName === student.username) {
            return index;
        }
    });
    // CONNAISSANT arrayPosition, vous pouvez récupérer l’objet JSON
    arrayPosition = arrayPosition.filter(function (item) {
        return typeof item === 'number';
    })[0];
    var thisStudent = studentListData[arrayPosition];
    //REMPLIR Student Info (dans index.pug)
    $('#studentInfoName').text(thisStudent.username);
    $('#studentInfoAge').text(thisStudent.age);
    $('#studentInfoGender').text(thisStudent.gender);
    $('#studentInfoLocation').text(thisStudent.location);
}

function addStudent(event) {

    if ($('#inputStudentName').val() != '' && $('#inputStudentEmail').val() != ''
        && $('#inputStudentFullname').val() != '' && $('#inputUserAge').val() != ''
        && $('#inputStudentLocation').val() != '' && $('#inputStudentGender').val() != '') {
        var studentName = $('#inputStudentName').val();
        var studentEmail = $('#inputStudentEmail').val();
        var studentFullName = $('#inputStudentFullname').val();
        var studentAge = $('#inputUserAge').val();
        var studentLocation = $('#inputStudentLocation').val();
        var studentGender = $('#inputStudentGender').val();
        var newStudent = {
            'username': studentName, 'email': studentEmail,
            'fullname': studentFullName, 'age': studentAge,
            'location': studentLocation, 'gender': studentGender
        };
        studentListData.push(newStudent);
        $.post('/users/addstudent', newStudent, (data) => {
            console.log(data);
        });
        $('#inputStudentName').val('');
        $('#inputStudentEmail').val('');
        $('#inputStudentFullname').val('');
        $('#inputUserAge').val('');
        $('#inputStudentLocation').val('');
        $('#inputStudentGender').val('');
    }

}

function deleteStudent(event) {
    event.preventDefault();
    console.log(event.target.rel);
    var confirmation = confirm('Are you sure?');
    // CHECK
    if (confirmation === true) {
        // IF ok, delete with JQuery Ajax
        $.ajax({
            type: 'DELETE',
            url: '/users/deletestudent/' + event.target.rel,
            
        }).done(function (response) {
            if (response.msg !== '') {
                console.log(response.msg);
            }
            else {
                alert('Error: ' + response.msg);
            }
            // Update the HTML Table
            fillHTMLTable();
        });

    }
    else {
        return false;
    }
};