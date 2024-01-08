
	function Ryzen(frm, cdt, cdn, row) {
		var child_table_data = frm.doc.member_subscription_details || [];
		$.each(child_table_data || [], function(index, row) {
			var llll = row.subscription_type;
			console.log(llll);
			frappe.call({
				method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.show',
				args: {
					llll: llll
				},
				callback: function(response) {
					if (response && response.message) {
						var duration_subscription = parseInt(response.message);
						row.end_date = frappe.datetime.add_months(row.start_date, duration_subscription);
						row.amount = 5000;
						row.total_subscription_amount = 5000 * duration_subscription;	
				
					}
					frm.refresh_field('member_subscription_details');
				}
			});
		});
	}
	


frappe.ui.form.on('Member child in membership', {
    subscription_type: Ryzen
});



frappe.ui.form.on('Gym Membership UI', {	


	member_subscription_details_onadd: function(frm, cdt, cdn) {
        // Trigger subscription_type for each row in the 'member_subscription_details' child table
        $.each(frm.doc.member_subscription_details || [], function(index, row) {
            frm.events['subscription_type'](frm, cdt, cdn, row);
        });
    
    },



		// discount
discount: function(frm){
	var cb = frm.doc.d_locker_fee
	if (cb){
		let a = frm.doc.fee 
		let bb = frm.doc.locker_fee
		let b = frm.doc.discount
		let c = (a+bb)-(((a+bb)*b)/100)
		frm.set_value('grand_total', c)
		frm.refresh_field('grand_total');
	}
	else{
		let a = frm.doc.fee 
		let bb = frm.doc.locker_fee
		let b = frm.doc.discount
		let c = ((a)-(((a)*b)/100)) + bb
		frm.set_value('grand_total', c)
		frm.refresh_field('grand_total');

	}

},
locker_fee: function(frm){
	var cb = frm.doc.d_locker_fee
	if (cb){
		let a = frm.doc.fee 
		let bb = frm.doc.locker_fee
		let b = frm.doc.discount
		let c = (a+bb)-(((a+bb)*b)/100)
		frm.set_value('grand_total', c)
		frm.refresh_field('grand_total');
	}
	else{
		let a = frm.doc.fee 
		let bb = frm.doc.locker_fee
		let b = frm.doc.discount
		let c = ((a)-(((a)*b)/100)) + bb
		frm.set_value('grand_total', c)
		frm.refresh_field('grand_total');

	}
},
fee: function(frm){
	var cb = frm.doc.d_locker_fee
	if (cb){
		let a = frm.doc.fee 
		let bb = frm.doc.locker_fee
		let b = frm.doc.discount
		let c = (a+bb)-(((a+bb)*b)/100)
		frm.set_value('grand_total', c)
		frm.refresh_field('grand_total');
	}
	else{
		let a = frm.doc.fee 
		let bb = frm.doc.locker_fee
		let b = frm.doc.discount
		let c = ((a)-(((a)*b)/100)) + bb
		frm.set_value('grand_total', c)
		frm.refresh_field('grand_total');

	}
},

d_locker_fee:function(frm){
	var cb = frm.doc.d_locker_fee
	if (cb){
		let a = frm.doc.fee 
		let bb = frm.doc.locker_fee
		let b = frm.doc.discount
		let c = (a+bb)-(((a+bb)*b)/100)
		frm.set_value('grand_total', c)
		frm.refresh_field('grand_total');
	}
	else{
		let a = frm.doc.fee 
		let bb = frm.doc.locker_fee
		let b = frm.doc.discount
		let c = ((a)-(((a)*b)/100)) + bb
		frm.set_value('grand_total', c)
		frm.refresh_field('grand_total');

	}


},

    refresh: function(frm) {
        frm.fields_dict['locker_allocated'].grid.get_field('locker_id').get_query = function(doc, cdt, cdn) {
            var child_row = locals[cdt][cdn];
            return {
                filters: {
                    status: "Available"
                }
            };
        };
    },


    onload: function(frm) {
        frm.fields_dict['member_subscription_details'].grid.get_field('subscription_type').get_query = function(doc, cdt, cdn) {
            var child_row = locals[cdt][cdn];
            return {
                filters: {
					 member_assign: ""
                }
            };
        };
    },

	// 	refresh: function(frm) {
	// 		let totalSubscriptionAmount = 0;
	// 			frm.doc.member_subscription_details.forEach(function(row) {
	// 			totalSubscriptionAmount += row.total_subscription_amount || 0;
	// 		});
	// 			frm.set_value('fee', totalSubscriptionAmount);
	// },
	// 	refresh: function(frm) {
	// 		let totalLockerFee = 0;
	// 			frm.doc.locker_allocated.forEach(function(row) {
	// 			totalLockerFee += row.locker_fee || 0;
	// 		});
	// 			frm.set_value('locker_fee', totalLockerFee);
	// },



		// locker details update
		before_submit: function(frm) {	
			var membership_route = frappe.get_route()
			// console.log("before call")
			frappe.call({                                                                    
				method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.snow',
				args: {
					arg: membership_route
				},
				callback: function(response) {
					if (response) {
						console.log("locker update worked")
					}
				}
			});
		},


		// // subscription member update
		// after_submit: function(frm) {	 		
		// 	var membership_route = frappe.get_route()
		// 				console.log("before call")
		// 	frappe.call({                                                                    
		// 		method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.rog',
		// 		args: {
		// 			arg: membership_route
		// 		},
		// 		callback: function(response) {
		// 			if (response) {
		// 				console.log("sub update worked")
		// 			}
		// 		}
		// 	});
		// },


});

