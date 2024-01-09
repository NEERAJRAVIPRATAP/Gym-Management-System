
	function Ryzen(frm, cdt, cdn, roow) {
		var totalAmount = 0;
		var child_table_data = frm.doc.member_subscription_details || [];
		$.each(child_table_data || [], function(index, row) {
			var llll = row.subscription_type;
			console.log(llll);
			frappe.call({           // getting subscription duration
				method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.show',
				args: {
					llll: llll
				},
				callback: function(response) {
					if (response.message == 0) {
						console.log("Not Found")
					}
					else {
						const membershipString = response.message[1];
						const match = membershipString.match(/\d+$/);
						const integerValue = match ? parseInt(match[0], 10) : null;
						console.log(integerValue);

						var duration_subscription = parseInt(response.message);
						row.end_date = frappe.datetime.add_months(row.start_date, duration_subscription);
						row.amount = integerValue
						row.total_subscription_amount = integerValue * duration_subscription;	
						totalAmount += row.total_subscription_amount;
					}
					frm.set_value('fee', totalAmount);
					frm.refresh_field('fee');
					frm.refresh_field('member_subscription_details');
				}
			});
		});
	}

	
	function moye(frm, cdt, cdn, row) {
		var totalAmount = 0;
		var child_table_data = frm.doc.locker_allocated || [];
	
		$.each(child_table_data || [], function(index, row) {
			totalAmount += row.locker_fee;
		});
			frm.set_value('locker_fee', totalAmount);
			frm.refresh_field('locker_fee');
		frm.refresh_field('locker_allocated');
	}
	


frappe.ui.form.on('Member child in membership', {
    subscription_type: Ryzen
});
frappe.ui.form.on('Locker child in membership', {
    locker_id: moye
});



frappe.ui.form.on('Gym Membership UI', {	

	member_subscription_details_onadd: function(frm, cdt, cdn) {
        $.each(frm.doc.member_subscription_details || [], function(index, row1) {
            frm.events['subscription_type'](frm, cdt, cdn, roow);
        });
    
    },
	locker_allocated_onadd: function(frm, cdt, cdn) {
        $.each(frm.doc.locker_allocated || [], function(index, row) {
            frm.events['locker_id'](frm, cdt, cdn, row);
        });
    
    },

	// refresh: function(frm) {
    //     frm.fields_dict['locker_allocated'].grid.get_field('locker_id').get_query = function(doc, cdt, cdn) {
    //         var child = locals[cdt][cdn];
            
    //         // Add 3 months to the current date and time
    //         var threeMonthsLater = frappe.datetime.now_datetime();
	// 		// frm.set_value('locker_allocated', cdt, 'locker_end_time', threeMonthsLater);
	// 		doc.set_value(cdt, cdn, 'locker_end_time', threeMonthsLater);
    //         return {
    //             default: threeMonthsLater
    //         };
    //     };
    // },


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
		var filters = {
			status: "Available"
		};

		if (frm.doc.locker_type_filter === ''){
			filters.status = "Available"
		}
		if (frm.doc.locker_type_filter === 'Small'){
			filters.locker_type = 'Small';
		}
		if (frm.doc.locker_type_filter === 'Medium'){
			filters.locker_type = 'Medium';
		}
		if (frm.doc.locker_type_filter === 'Large'){
			filters.locker_type = 'Large';
		}

		return {
			filters: filters
		};
	};
},

    onload: function(frm) {
        frm.fields_dict['member_subscription_details'].grid.get_field('subscription_type').get_query = function(doc, cdt, cdn) {
            var child_row = locals[cdt][cdn];
            return {
                filters: {
					 member_assign: "Create New Subscription"
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

		// refresh: function(frm){
		// 	frm.set_query('register_users', () => {  // “link” is field-type name linked to a Table
		// 		return {
		// 			filters: {
		// 				creation: frm.doc.__last_sync_on || frappe.datetime.now_datetime()	
		// 			}
		// 		}
		// 	})
	 
		// }	

			// member ID Subscription  update 
		after_submit: function(frm){
			var membership_route = frappe.get_route()
			// console.log("before call")
			frappe.call({                                                                    
				method: 'gym_management_system.gym_management_system.doctype.gym_membership_ui.gym_membership_ui.Techi',
				args: {
					arg: membership_route
				},
				callback: function(response) {
					if (response) {
						console.log("locker update worked")
						
					}
				}
			});



		}

});

