
$(document).ready(function(){

         /* Phone Form */
         $("#contactForm").validator().on("submit", function(event) {
         //$("#contactForm").on("submit", function(event) {
         //$("#contactForm").submit(function(event) {

         	if (event.isDefaultPrevented()) {
                 // handle the invalid form...
                 contactFormError();
                 contactSubmitMSG(false, "Please fill all fields!");
             } else {

                event.preventDefault();
                contactSubmitForm(fullname, phone, email, message);

             }
             console.log("Submit");
             //return false;
         });

         function contactSubmitForm(fullname) {
             // initiate variables with form content
            var url = window.location.href;
            console.log("Submit Contact via POST");
            var name = $("#fullname").val();
     		var email = $("#email").val();
     		var phone = $("#phone").val();
            var message = $("#message").val();
            if (message.length === 0) {
                message = $("#message").attr('placeholder');
            }
             //var select = $("#rselect").val();
             var terms = $("#rterms").val();

             $.ajax({
                 type: "POST",
                 url: "https://us-central1-mobispread.cloudfunctions.net/contact",
                 //data: "name=" + name + "&email=" + email + "&phone=" + phone + "&select=" + select + "&terms=" + terms,
                 data: "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message + "&product=chandys"  + "&url=" + url,
                 success: function(data) {
                     if (data.success == true) {
                         contactFormSuccess();
                     } else {
                         contactFormError();
                         contactSubmitMSG(false, data.message);
                     }
                 },
                error: function(data) {
                    contactFormError();
                    contactSubmitMSG(false, data.statusText);
                }
             });
     	}

         function contactFormSuccess() {
             $("#contactForm")[0].reset();
             contactSubmitMSG(true, "");
             $("input").removeClass('notEmpty'); // resets the field label after submission
             $("textarea").removeClass('notEmpty'); // resets the field label after submission
         }

         function contactFormError() {
             $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                 $(this).removeClass();
             });
             $("#phoneResponseData").hide();
     	}

         function contactSubmitMSG(valid, msg) {
             if (valid) {
                 var msgClasses = "h4 text-center tada animated";
             } else {
                 var msgClasses = "h4 text-center";
             }
             $("#contactMsgSubmit").removeClass().addClass(msgClasses).text(msg);
         }
         
         $('#WAButton').floatingWhatsApp({
             phone: '+15612719502', //WhatsApp Business phone number International format-
             headerTitle: 'Chat with us on WhatsApp!', //Popup Title
             popupMessage: 'Hello, how can i help you?', //Popup Message
             showPopup: true, //Enables popup display
             buttonImage: '<img src="images/whatsapp.svg" />', //Button Image
            //headerColor: 'crimson', //Custom header color
            //backgroundColor: 'crimson', //Custom background button color
            position: "right"
        });
});
