// Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Membership UI', {	
	register_users: function(frm) {
		var user_doc = frm.doc.register_users; // Replace with the actual fieldname

		// Make an asynchronous request to the server to get the username
		frappe.call({
			method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.get_username_from_email',
			args: { user_doc: user_doc },
			callback: function(response) {
				if (response.message) {
					frm.set_value('full_name', response.message);
				} else {
					frm.set_value('full_name', '');
					frappe.msgprint(__("No user found with the email address: {0}", [user_doc]));
				}
			}
		});
	},
		
		// Plan end date
		membership_plan: function(frm){
			var a = parseInt(frm.doc.membership_plan)
			if (a){
				var today = frappe.datetime.get_today();
				let futureDate = frappe.datetime.add_months(today, a);
				frm.set_value('start_date', today);
				frm.set_value('end_date', futureDate);
			}
				let zz = parseInt(frm.doc.membership_plan)
		},

		// Filter the Locker for avialable 
		refresh : function(frm){
			frm.set_query('locker_allocate', () => { 
				return {
					filters: {
						locker_owner: ''
					}
				}
			})
		},

		// Locker End date
		locker_allocate: function(frm){
			var aa = parseInt(frm.doc.membership_plan)
			if (aa){
				var today = frappe.datetime.get_today();
				let futureDate = frappe.datetime.add_months(today, aa);
				frm.set_value('locker_end_date', futureDate);
			}	
		},


validate: function(frm) {
	frappe.call({
		method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.snow',
		args: {
			abc: frm.doc.locker_allocate,
			xyz: frm.doc.register_users
		},
		callback: function(response) {
			if (response == 0) {
				frappe.validated = false
				frappe.msgprint("Locker Already alloted");
			}
			if (response == 1 ){
				frappe.msgprint("Locker Alloted")
			}
		}
	});
},

discount: function(frm){
	let a = frm.doc.fee 
	let b = frm.doc.discount
	let c = a-((a*b)/100)
	frm.set_value('grand_total', c)
	// frm.refresh_field('grand_total');

}

	});
	


	


