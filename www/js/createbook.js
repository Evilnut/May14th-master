
var bookRequest;

function submitBookForm(){
    $( document ).ready( function() {


        console.log("bookForm"); 

        /* attach a submit handler to the form */
        $(document).on("submit","#uploadBook",function(event){
        
        //$("#uploadTutor").submit(function(event) {

            console.log("uploadBook");
            /* stop form from submitting normally */
            event.preventDefault();

            // Abort any pending request
            if (bookRequest) {
                bookRequest.abort();
            }
                            

            /* get some values from elements on the page: */
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            var serializedData = $form.serialize();                     

                
            /* Send the data using ajax */
            bookRequest = $.ajax({
                url: "php/createbook.php",
                type: "post",
                data: serializedData
            });


            /* Put the results in a div */
            bookRequest.done(function (data){
                var returnData = JSON.parse(data); //returns an array of Json object
                console.log (returnData);

                var response = returnData[0];
                var ID = response["ID"];
                var EditKey = response["EditKey"];
                console.log (ID);
                console.log (EditKey);
        

                $( "#bookReturnID" ).html(ID);
                $( "#bookEditKey" ).html(EditKey);      

                //call the custom alert message function
                //alertMsg.render('Submitted','OK');  
                sfuExplorer.alert('Submitted','SFU Exploerer');

            });


            // Callback handler that will be called on failure
            bookRequest.fail(function (jqXHR, textStatus, errorThrown){
                // Log the error to the console
                console.error(
                    "The following error occurred: "+
                    textStatus, errorThrown
                );
            });


            // Callback handler that will be called regardless
            // if the request failed or succeeded
            bookRequest.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);

            });

        });
    });

    //return false to avoid form from submitting normally
    return false;
}