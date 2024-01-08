// Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Member Name', {
	validate: function (frm) {
		if (frm.doc.last_name === null) {
			frm.set_value("full_name", frm.doc.first_name)
		}
		else {
			frm.set_value("full_name", frm.doc.first_name + " " + frm.doc.last_name);
		}
		
	},

 

});






