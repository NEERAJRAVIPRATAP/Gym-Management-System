// Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Locker', {
	// refresh: function(frm) {

	// }

	locker_type:function(frm){
		if (frm.doc.locker_type==='Small'){
			frm.set_value('locker_fee',500)
		}
		else if (frm.doc.locker_type==='Medium'){
			frm.set_value('locker_fee',1000)
		}
		else if (frm.doc.locker_type==='Large'){
			frm.set_value('locker_fee',1500)
		}
	}
});
