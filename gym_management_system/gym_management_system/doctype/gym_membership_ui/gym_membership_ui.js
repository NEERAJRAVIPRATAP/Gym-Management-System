// Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Member child in membership', {
	subscription_type: function(frm, cdt, cdn) {
		var child_table = frm.fields_dict['member_subscription_details'];
		var child_table_data = child_table.get_value();
		var llll;  // Declare llll outside of $.each to make it accessible in the entire function

		$.each(child_table_data || [], function(index, row) {
			llll = row.subscription_type;
			console.log(llll);
			});
			console.log(llll);
		frappe.call({
			method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.show',
			args: {
				llll: llll
			},
			callback: function(response) {
				if (response && response.message) {
					
					// frappe.ui.form.on('Gym Membership UI', {	
					// subscription_type: function(frm){
						frm.add_child('member_subscription_details', {
								duration: response.message
						})
					// }
					// });


					frm.refresh_field('member_subscription_details');
				}
			}
		});
	},
});


frappe.ui.form.on('Gym Membership UI', {	
	register_users: function(frm) {
		var user_doc = frm.doc.register_users;
		frappe.call({
			method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.get_username_from_email',
			args: { user_doc: user_doc },
			callback: function(response) {
				if (response.message) {
					frm.set_value('full_name', response.message[0]);
					frm.set_value('email_id', response.message[1]);
					frm.set_value('phone_no', response.message[2]);
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
		duration: function(frm){
			z = frappe.get.get_doc()

			var aa = parseInt(z)
			if (aa){
				var today = frappe.datetime.get_today();
				let futureDate = frappe.datetime.add_months(today, aa);
					frm.add_child('member_subscription_details', {
								start_date: today,
								end_date: futureDate
				})
			}	
		},


// validate: function(frm) {
// 	frappe.call({
// 		method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.snow',
// 		args: {
// 			abc: frm.doc.locker_allocate,
// 			xyz: frm.doc.register_users
// 		},
// 		callback: function(response) {
// 			if (response == 0) {
// 				frappe.validated = false
// 				frappe.msgprint("Locker Already alloted");
// 			}
// 			if (response == 1 ){
// 				frappe.msgprint("Locker Alloted")
// 			}
// 		}
// 	});
// },



		// discount
discount: function(frm){
	let a = frm.doc.fee 
	let b = frm.doc.discount
	let bb = frm.doc.locker_fee
	let c = (a+bb)-(((a+bb)*b)/100)
	frm.set_value('grand_total', c)
	// frm.refresh_field('grand_total');

},
// subscription_type: function(frm){
// 	frm.add_child('member_subscription_details', {
// 			duration: llll
// 	})
// }

	

});
	

	



	


