
var tutorRequest;

function submitTutorForm(){
     $( document ).ready( function() {


        console.log("tutorForm"); 

        /* attach a submit handler to the form */
        $(document).on("submit","#uploadTutor",function(event){
        
        //$("#uploadTutor").submit(function(event) {

            console.log("uploadTutor");
            /* stop form from submitting normally */
            event.preventDefault();

            // Abort any pending request
            if (tutorRequest) {
                tutorRequest.abort();
            }
                            

            /* get some values from elements on the page: */
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            var serializedData = $form.serialize();                     

                
            /* Send the data using ajax */
            tutorRequest = $.ajax({
                url: "php/createtutor.php",
                type: "post",
                data: serializedData
            });


            /* Put the results in a div */
            tutorRequest.done(function (data){
                var returnData = JSON.parse(data); //returns an array of Json object
                console.log (returnData);

                var response = returnData[0];
                var ID = response["ID"];
                var EditKey = response["EditKey"];
                console.log (ID);
                console.log (EditKey);
        

                $( "#tutorReturnID" ).html(ID);
                $( "#tutorEditKey" ).html(EditKey);      

                //call the custom alert message function
                //alertMsg.render('Submitted','OK');  
                sfuExplorer.alert('Submitted','SFU Exploerer');

            });


            // Callback handler that will be called on failure
            tutorRequest.fail(function (jqXHR, textStatus, errorThrown){
                // Log the error to the console
                console.error(
                    "The following error occurred: "+
                    textStatus, errorThrown
                );
            });


            // Callback handler that will be called regardless
            // if the request failed or succeeded
            tutorRequest.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);

            });

        });
    });

    //return false to avoid form from submitting normally
    return false;
}