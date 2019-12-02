/*
John Kratz
john_kratz@student.uml.edu
91.61 GUI Programming I
11/14/19
*/


function table(matrix) {

    // convert the users input to a Number, the user is only allowed to enter integers
    var startH = Number(document.getElementById('startHorizontal').value);
    var startV = Number(document.getElementById('startVertical').value);
    var endH = Number(document.getElementById('endHorizontal').value);
    var endV = Number(document.getElementById('endVertical').value);

    $('#warning_msg').empty();

    // check to make sure numbers are read correctly
    console.log("Start Horizontal: ", startH, "End Horizontal: ", endH, "Start Vertical: ", startV, "End Vertical: ", endV);

    // swap the numbers if the user input for startV is greater than the endV
    if (startV > endV) {
      $('#warning_msg').append("<p class='warning_class'> Swap Start Vertical with End Vertical </p>");
        var temp = startV;
        startV = endV;
        endV = temp;
    }

    // swap the numbers if user input startH is greater than endH
    if (startH > endH) {
      $('#warning_msg').append("<p class='warning_class'> Swap Start Horizontal with End Horizontal </p>");
        var temp = startH;
        startH = endH;
        endH = temp;
    }

    // ignore negatives
    var columns = Math.abs(endV - startV);
    var rows = Math.abs(endH - startH);

    var num = "";

    // Put an marker on the top left corner of the table
    num += '<table>';
    num += '<tr><td></td>';

    // loop that fills the horizontal boxes on the first row
    for (var x = startH; x <= endH; x++) {
        num += '<td>' + x + '</td>';
    }
    num += '</tr>';

    var vertical = startV;

    // this loop fills the elements in each column from the second row
    for (var y = 0; y <= columns; y++) {
        num += '<tr><td>' + vertical + '</td>';

        for (z = 0; z <= rows; z++) {
            num += '<td>' + matrix['row' + y][z] + '</td>';
        }
        vertical++;

        num += '</tr>';
    }

    num += '</table>';

    // loads the table into HW6.html file
    $("#table").html(num);
}

function buildTable() {

    // convert the users input to a Number the user is only allowed to enter integers
    var startH = Number(document.getElementById('startHorizontal').value);
    var startV = Number(document.getElementById('startVertical').value);
    var endH = Number(document.getElementById('endHorizontal').value);
    var endV = Number(document.getElementById('endVertical').value);

    // check the numbers to see if they are read correctly
    console.log("Start Horizontal: ", startH, "End Horizontal: ", endH, "Start Vertical: ", startV, "End Vertical: ", endV);

    // validation of the users inputs
    if (startH < -10000 || endH > 10000 || startV < -10000 || endV > 10000) {
        alert("Input is invalid");
        return;
    }

    // swap the number if user input startV greater than endV
    if (startV > endV) {
        var temp = startV;
        startV = endV;
        endV = temp;
    }

    // swap the number if user input startH greater than endH
    if (startH > endH) {
        var temp = startH;
        startH = endH;
        endH = temp;
    }

    var matrix = {};

    // ignore negatives
    var columns = Math.abs(endV - startV);
    var rows = Math.abs(endH - startH);

    var vertical = startV;
    var horizontal = startH;


    // This loop will calculate the number at a certain index by using a number in horizontal * a number in vertical
    // I got the algorithm from this link https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
    for (var x = 0; x <= columns; x++) {
        var temp = [];

        for (var y = 0; y <= rows; y++) {
            var num = horizontal * vertical;
            temp[y] = num;
            horizontal++;
        }
        // save the row
        matrix["row" + x] = temp;
        // reset each step
        horizontal = startH;
        // increment the vertical index
        vertical++;
    }

    // call the table function to complete the matrix
    table(matrix);

    return false;
}

// jQuery Validation function
function validation() {
 $("#mult_form").validate({
 // Rules for validating the form.
 rules: {
 startHorizontal: {
 number: true,
 min: -10000,
 max: 10000,
 required: true
 },
 endHorizontal: {
 number: true,
 min: -10000,
 max: 10000,
 required: true
 },
 startVertical: {
 number: true,
 min: -10000,
 max: 10000,
 required: true
 },
 endVertical: {
 number: true,
 min: -10000,
 max: 10000,
 required: true
 }
 },

 // Prompt message if violate the rules
 messages: {
 startHorizontal: {
 number: "Error: Please enter a valid number between (-10000 ~ 10000)",
 min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -10000",
 max: "Error: The number you have entered is too big. Please enter a number less than or equal to 10000",
 required: "Error: This field is required. Please enter a valid number between (-10000 ~ 10000)"
 },
 endHorizontal: {
 number: "Error: Please enter a valid number between (-10000 ~ 10000)",
 min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -10000",
 max: "Error: The number you have entered is too big. Please enter a number less than or equal to 10000",
 required: "Error: This field is required. Please enter a valid number between (-10000 ~ 10000)"
 },
 startVertical: {
 number: "Error: Please enter a valid number between (-10000 ~ 10000)",
 min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -10000",
 max: "Error: The number you have entered is too big. Please enter a number less than or equal to 10000",
 required: "Error: This field is required. Please enter a valid number between (-10000 ~ 10000)"
 },
 endVertical: {
 number: "Error: Please enter a valid number between (-10000 ~ 10000)",
 min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -10000",
 max: "Error: The number you have entered is too big. Please enter a number less than or equal to 10000",
 required: "Error: This field is required. Please enter a valid number between (-10000 ~ 10000)"
 }
 },

 // get call when user click submitted
 submitHandler: function() {
 buildTable();
 return false;
 },

 invalidHandler: function() {
 // Nothing happen when the user try to submit form with error(s)
 $("#warning_msg").empty();
 $("#table").empty();
 },
 // insert div to the error to make it looks better
 errorElement: "div",
 errorPlacement: function(error, element) {
 error.insertAfter(element);
 },
 onkeyup: function(element, event) {
 auto_submit();
 }
 });
}
