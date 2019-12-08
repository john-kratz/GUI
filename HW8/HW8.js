/*
John Kratz
john_kratz@student.uml.edu
91.61 GUI Programming I
11/14/19
*/

var tabIndex = 1;

// Tab Widgets function
function tab_widget() {
  // modified and make the tab
  var tabCount = $("#tabs li").length + 1;
  console.log("Current tab count is: " + tabCount);

  if(tabCount > 15) {
    alert("Could not make more than 15 tabs.");
    return false;
  }

  // will init jQuery tabs.
  $( "#tabs" ).tabs();


  var startH = Number(document.getElementById('startHorizontal').value);
  var startV = Number(document.getElementById('startVertical').value);
  var endH = Number(document.getElementById('endHorizontal').value);
  var endV = Number(document.getElementById('endVertical').value);

  tabIndex++;

  // Create the title bar
  var title = "<li class='tab'><a href='#tab-" + tabIndex + "'>" + startH +
              " to " + endH + " by " + startV + " to " + endV + "</a>" +
              "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

  // Add a new Title bar.
  $( "div#tabs ul" ).append( title );

  // Add the current table.
  $( "div#tabs" ).append('<div id="tab-' + tabIndex + '">' + $("#table").html() + '</div>');

  // Refresh the tabs div
  $( "#tabs" ).tabs("refresh");

  // Make the new tab active
  $( "#tabs" ).tabs("option", "active", -1);

  // remove tabs
  $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
      var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelID ).remove();

      try {
        $( "#tabs" ).tabs("refresh");
      }
      catch (e) {

      }

     // refresh to reset page
      if( $('div#tabs ul li.tab').length == 0) {
        try {
          $("#tabs").tabs("destroy");
        }
        catch (e) {

        }

        return false;   // This may prevent default behavior from occurring.
      }
  });
}

/*
    Code that makes the slider appear for the parameters
*/
function slider() {

  // Slider from https://jqueryui.com/slider/
    // This is Start_Horizon_Slider
  $("#sliderStartHorizontal").slider({
    min: -10,
    max: 10,
    slide: function(event, ui) {
      $("#startHorizontal").val(ui.value);
      auto_submit();
    }
  });
  $("#startHorizontal").on("keyup", function() {
    $("#sliderStartHorizontal").slider("value", this.value);
    auto_submit();
  });

  // Horizontal End Slider
  $("#sliderEndHorizontal").slider({
    min: -10,
    max: 10,
    slide: function(event, ui) {
      $("#endHorizontal").val(ui.value);
      auto_submit();
    }
  });
  $("#endHorizontal").on("keyup", function() {
    $("#sliderEndHorizontal").slider("value", this.value);
    auto_submit();
  });

  // Vertical Start Slider
  $("#sliderStartVertical").slider({
    min: -10,
    max: 10,
    slide: function(event, ui) {
      $("#startVertical").val(ui.value);
      auto_submit();
    }
  });
  $("#startVertical").on("keyup", function() {
    $("#sliderStartVertical").slider("value", this.value);
    auto_submit();
  });

  // Vertical End Slider
  $("#sliderEndVertical").slider({
    min: -10,
    max: 10,
    slide: function(event, ui) {
      $("#endVertical").val(ui.value);
      auto_submit();
    }
  });
  $("#endVertical").on("keyup", function() {
    $("#sliderEndVertical").slider("value", this.value);
    auto_submit();
  });
}

// auto_submit function
function auto_submit() {
  if( $("form#mult_form").valid() == true ) {
    $("form#mult_form").submit();
  }
}

function buildTable() {

    // convert the users input to a Number the user is only allowed to enter integers
    var startH = Number(document.getElementById('startHorizontal').value);
    var startV = Number(document.getElementById('startVertical').value);
    var endH = Number(document.getElementById('endHorizontal').value);
    var endV = Number(document.getElementById('endVertical').value);

    $('#warning_msg').empty();
// swap the num if user input start_hor greater than end_hor

    // swap the number if user input startV greater than endV
    if (startV > endV) {
        // alert user about the swap
        $('#warning_msg').append("<p class='warning_class'> Swap Start Vertical with End Vertical </p>");
        var temp = startV;
        startV = endV;
        endV = temp;
    }

    // swap the number if user input startH greater than endH
    if (startH > endH) {
        // alert user about the swap
        $('#warning_msg').append("<p class='warning_class'> Swap Start Horizontal with End Horizontal </p>");
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

  // Now we can fill in the table.
  // w3schools is helpful: http://www.w3schools.com/html/html_tables.asp
  var content = "";

  // Opening table tags.
  content += "<table>";

  // First row, and put an empty spot in the top left corner.
  content += "<tr><td></td>";

  // Now fill out the rest of the first row.
  for (var a = startH; a <= endH; a++) {
    content += "<td>" + a + "</td>";
  }

  // Close the first row.
  content += "</tr>";

  // Print out the left most column using this variable.
  var vert = startV;

  // Fill in each row after the first.
  for (var x = 0; x <= columns; x++) {
    // Set the left most column first.
    content += "<tr><td>" + vert + "</td>";

    // Add in all the multiplication for this row.
    for (var y = 0; y <= rows; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }
    vert++;

    // Close each row.
    content += "</tr>";
  }

  // Ending table tags.
  content += "</table>";

  // Now the content gets loaded into the HTML page.
  $("#table").html(content);

  // Stop the form from refreshing.
  return false;
}

// jQuery Validation function
function validation() {
 $("#mult_form").validate({
 // Rules for validating the form.
 rules: {
 startHorizontal: {
 number: true,
 min: -10,
 max: 10,
 required: true
 },
 endHorizontal: {
 number: true,
 min: -10,
 max: 10,
 required: true
 },
 startVertical: {
 number: true,
 min: -10,
 max: 10,
 required: true
 },
 endVertical: {
 number: true,
 min: -10,
 max: 10,
 required: true
 }
 },

 // Prompt message if violate the rules
 messages: {
 startHorizontal: {
 number: "Error: Please enter a valid number between (-10 ~ 10)",
 min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -10",
 max: "Error: The number you have entered is too big. Please enter a number less than or equal to 10",
 required: "Error: This field is required. Please enter a valid number between (-10 ~ 10)"
 },
 endHorizontal: {
 number: "Error: Please enter a valid number between (-10 ~ 10)",
 min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -10",
 max: "Error: The number you have entered is too big. Please enter a number less than or equal to 10",
 required: "Error: This field is required. Please enter a valid number between (-10 ~ 10)"
 },
 startVertical: {
 number: "Error: Please enter a valid number between (-10 ~ 10)",
 min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -10",
 max: "Error: The number you have entered is too big. Please enter a number less than or equal to 10",
 required: "Error: This field is required. Please enter a valid number between (-10 ~ 10)"
 },
 endVertical: {
 number: "Error: Please enter a valid number between (-10 ~ 10)",
 min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -10",
 max: "Error: The number you have entered is too big. Please enter a number less than or equal to 10",
 required: "Error: This field is required. Please enter a valid number between (-10 ~ 10)"
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
