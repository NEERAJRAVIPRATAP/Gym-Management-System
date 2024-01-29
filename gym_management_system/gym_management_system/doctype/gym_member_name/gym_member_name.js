frappe.ui.form.on('Gym Member Name', {

    validate: function (frm) {
        if (frm.doc.last_name === undefined || frm.doc.last_name === null) {
            frm.set_value("full_name", frm.doc.first_name)
        }
        else {
            frm.set_value("full_name", frm.doc.first_name + " " + frm.doc.last_name);
        }
		
    },
     /*refersh: function (frm) {
         if (cur_frm.doc.__islocal === 0 && cur_frm.doc.__islocal === undefined) 
         {
             frm.add_custom_button(__('Assign Class'), function () {
                
                 frappe.set_route("group-class")
             }); 
         }
     }
         
  
 
     
 });*/

 refresh: function (frm) {
    console.log("after_save function called");
    if (!frm.__islocal) {
        console.log("Record is not local");
        frm.add_custom_button(__('Assign Class'), function () {
            console.log("Assign Class button clicked");
            frappe.set_route("group-class");
        });
    }
}

});