document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('timeForm');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent default form submission behavior
        event.preventDefault();
        showModal("Your message here");
        // Get values from form inputs
        const officeWorkHours = parseFloat(document.getElementById('officeWork').value);
        const socialMediaHours = parseFloat(document.getElementById('socialMedia').value);
        const fitnessHours = parseFloat(document.getElementById('fitness').value);
        const skincareHours = parseFloat(document.getElementById('skincare').value);
        const lovedOnesHours = parseFloat(document.getElementById('lovedOnes').value);

        // Calculate total hours spent
        const totalHours = officeWorkHours + socialMediaHours + fitnessHours + skincareHours + lovedOnesHours;

        // Display results
        const resultsSection = document.getElementById('results');
        resultsSection.innerHTML = `
            <h2>Your Time Summary</h2>
            <p>Total Hours Spent:</p>
            <p>${totalHours.toFixed(2)} hours</p>
            <p>Thank you for tracking your time!</p>
        `;
    });
});
function checkTimeSpent() {
    // Get values from input fields
    var officeHours = parseFloat(document.getElementById('officeWork').value);
    var lovedOnesHours = parseFloat(document.getElementById('lovedOnes').value);
    var fitnessHours = parseFloat(document.getElementById('fitness').value);
    var skincareHours = parseFloat(document.getElementById('skincare').value);
    var socialMediaHours = parseFloat(document.getElementById('socialMedia').value);

    // Check if conditions for lifestyle maintenance are met
    if (officeHours > 7 && lovedOnesHours < 2 && fitnessHours < 1 && skincareHours < 0.5 && socialMediaHours > 2) {
        // Display a detailed timetable for a healthy lifestyle
        alert("Your lifestyle needs attention!\n\nHere's a suggested timetable for maintaining a healthy lifestyle:\n- Morning: Exercise or Yoga\n- Breakfast: Balanced meal including fruits and protein\n- Work Hours: Stay focused and take short breaks\n- Lunch: Healthy and nutritious meal\n- Afternoon: Spend quality time with loved ones\n- Evening: Skincare routine\n- Dinner: Light and healthy meal\n- Night: Relaxation and hobbies\n\nRemember, a balanced lifestyle leads to a happier and healthier you!");
    }
}
// Get the modal
var modal = document.getElementById("customModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// Function to display the custom modal with a message
function showModal(message) {
  var modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  modal.style.display = "block";
}


