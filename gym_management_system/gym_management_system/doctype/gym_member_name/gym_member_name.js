frappe.ui.form.on('Gym Member Name', {
 

	validate: function (frm)
	{
		if (frm.doc.middle_name == null)
		{
			frm.set_value("full_name",frm.doc.first_name+" "+frm.doc.last_name)
		}
		else if (frm.doc.last_name == null)
		{
			frm.set_value("full_name",frm.doc.first_name+" "+frm.doc.middle_name)
		}
		else if (frm.doc.middle_name == null && frm.doc.last_name == null)
		{
			frm.set_value("full_name",frm.doc.first_name)
		}
		else {
			frm.set_value("full_name",frm.doc.first_name+" "+frm.doc.middle_name+" "+frm.doc.last_name)
		}
	  	
	},
	/*before_save: function (frm) {
        
		frm.call({
			
			method: "send_email_notification",
			
			callback: function (r) {
				if (r.message) {
					frappe.msgprint(r.message);
				}
			}
		})

	},


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

	after_save: function(frm) {
        frappe.new_doc('Gym Membership UI');
    }
	
	
});

