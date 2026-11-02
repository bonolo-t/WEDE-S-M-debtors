// form-validation.js - Part 3

// When page loads
document.addEventListener('DOMContentLoaded', function() {

  // Function to show error - red message under input
  function showError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error'); // find error div inside parent
    if(errorDiv) { // if error div exists
      errorDiv.textContent = message; // set message text
      errorDiv.classList.add('show'); // show error - add show class
    }
    input.classList.add('invalid'); // add invalid class - red border
  }

  // Function to clear error
  function clearError(input) {
    const errorDiv = input.parentElement.querySelector('.error');
    if(errorDiv) {
      errorDiv.textContent = ''; // clear text
      errorDiv.classList.remove('show'); // hide
    }
    input.classList.remove('invalid'); // remove red border
  }

  // Function to check email valid - simple regex
  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // check if email has @ and .
  }

  // Function to check phone valid - SA phone 0 + 9 digits
  function validPhone(phone) {
    return /^0[0-9]{9}$/.test(phone.replace(/\s/g,'')); // remove spaces then check 0 + 9 digits
  }

  // Enquiry Form - S&M Debtors - shows cost and availability after validation
  const enquiryForm = document.getElementById('enquiryForm'); // get enquiry form
  if(enquiryForm) { // if form exists
    enquiryForm.addEventListener('submit', function(e) { // when submit clicked
      e.preventDefault(); // stop normal submit - we do validation first
      let isValid = true; // assume valid

      // Get inputs
      const name = document.getElementById('enq-name');
      const email = document.getElementById('enq-email');
      const phone = document.getElementById('enq-phone');
      const service = document.getElementById('enq-service');
      const msg = document.getElementById('enq-message');

      // Clear previous errors
      [name,email,phone,service,msg].forEach(clearError);

      // Validate each - if invalid - show error - set isValid false
      if(name.value.trim().length < 3) { showError(name, 'Name must be 3 chars'); isValid = false; }
      if(!validEmail(email.value)) { showError(email, 'Enter valid email'); isValid = false; }
      if(!validPhone(phone.value)) { showError(phone, 'SA format 0682115398'); isValid = false; }
      if(!service.value) { showError(service, 'Choose service'); isValid = false; }
      if(msg.value.trim().length < 10) { showError(msg, 'Message min 10 chars'); isValid = false; }

      if(!isValid) return; // stop if not valid

      // If valid - show cost and availability - response related to cost, availability
      const costs = {
        "DEBT REVIEW REMOVAL": "Cost: R12 000. Availability: Removal within 7 days - FAST!",
        "JUDGEMENT REMOVAL": "Cost: R3 500 per judgement. Availability: 14-21 days court process",
        "DEFAULTS ON ACCOUNTS": "Cost: R2 500 per account. Availability: Immediate - 5 days",
        "PRESCRIPTION OF ACCOUNTS": "Cost: R30 000 - R50 000 per account. Availability: Check if prescribable - 7 days",
        "PAYMENT ARRANGEMENT / ITC CLEARANCE": "Cost: R2000. Availability: 7-14 days for ITC clearance"
      };
      const selected = service.value; // selected service
      const costMsg = costs[selected] || "We will contact within 24h"; // get cost message

      // AJAX simulation - setTimeout - better UX - Part 3 requirement
      const responseBox = document.getElementById('enquiryResponse'); // response div
      const submitBtn = enquiryForm.querySelector('button[type=submit]'); // submit button
      submitBtn.textContent = 'Sending...'; // change text to Sending
      submitBtn.disabled = true; // disable button

      setTimeout(function() { // wait 1.2 seconds - simulate server
        responseBox.innerHTML = '<h3>Thank you ' + name.value + '!</h3><p>Enquiry about <strong>' + selected + '</strong> received.</p><p><strong>' + costMsg + '</strong></p><p>Details sent to ' + email.value + '</p>';
        responseBox.style.display = 'block'; // show response
        submitBtn.textContent = 'Submit Enquiry'; // restore button
        submitBtn.disabled = false;
        enquiryForm.reset(); // clear form
      }, 1200); // 1200ms delay
    });
  }

  // Contact Form - general message - compiles into email 
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      const cname = document.getElementById('contact-name');
      const cemail = document.getElementById('contact-email');
      const ctype = document.getElementById('contact-type');
      const cmessage = document.getElementById('contact-message');

      [cname,cemail,ctype,cmessage].forEach(clearError);

      if(cname.value.trim().length < 3) { showError(cname, 'Name required'); isValid = false; }
      if(!validEmail(cemail.value)) { showError(cemail, 'Invalid email'); isValid = false; }
      if(!ctype.value) { showError(ctype, 'Select type'); isValid = false; }
      if(cmessage.value.trim().length < 15) { showError(cmessage, 'Min 15 chars'); isValid = false; }

      if(!isValid) return;

      // Compile email -  compile into email and allow to send
      const emailContent = 'To: info@creditmends.com\nFrom: ' + cemail.value + '\nSubject: ' + ctype.value + '\n\nName: ' + cname.value + '\nMessage: ' + cmessage.value;

      const respBox = document.getElementById('contactResponse');
      const btn = contactForm.querySelector('button[type=submit]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function() {
        respBox.innerHTML = '<h3>Email Ready!</h3><pre style="background:#f5f5f5;padding:10px;white-space:pre-wrap">' + emailContent + '</pre><a href="mailto:info@creditmends.com?subject=' + encodeURIComponent(ctype.value) + '&body=' + encodeURIComponent(cmessage.value) + '" class="btn">Open Email to Send</a>';
        respBox.style.display = 'block';
        btn.textContent = 'Send Message';
        btn.disabled = false;
        contactForm.reset();
      }, 1000);
    });
  }

});