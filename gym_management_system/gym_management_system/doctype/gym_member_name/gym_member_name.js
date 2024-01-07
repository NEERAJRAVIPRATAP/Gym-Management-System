// Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Member Name', {
 

	validate: function (frm)
	{
		
	   frm.set_value("full_name",frm.doc.first_name+" "+frm.doc.last_name) 	
	},
	before_submit: function (frm) {
        
		frappe.call({
			
			method: "gym_management_system.gym_management_system.doctype.gym_member_name.gym_member_name.new_document",
			args: {
				msg:"hi "
			},
			
			callback: function (r) {
				if (r.message) {
					frappe.msgprint(r.message);
				}
			}
		})

	}
/*

	before_save: function (frm)
	{
		frm.call({
			
			method: "execute",
			
			callback: function (r) {
				if (r.message) {
					frappe.msgprint(r.message);
				}
			}
		})
	}
*/




	/*before_save: function (frm) {
        frm.add_custom_button('Click me Button', function() {
            var doc_name = frm.doc.name;
            console.log(doc_name);
            frappe.call({
                method: 'gym_management_system.gym_management_system.doctype.gym_trainer.gym_trainer.Set_Memeber_list',
                args: {
                    abc: doc_name,
                },
                callback: function(response) {
                    frappe.msgprint(response.message);
                }
            });
        });
    }*/
		
	
	
});
	

	
    

