frappe.ui.form.on('Gym Member Name', {
    validate: function (frm) {
        if (frm.doc.last_name === undefined || frm.doc.last_name === null) {
            frm.set_value("full_name", frm.doc.first_name);
        } else {
            frm.set_value("full_name", frm.doc.first_name + " " + frm.doc.last_name);
        }
    },

    refresh: function (frm) {
        if (!frm.__islocal) {
            frm.add_custom_button(__('Assign Class'), function () {
                let d = new frappe.ui.Dialog({
                    title: 'Assign Class',
                    fields: [
                        {
                            label: 'Link to Assign Class',
                            fieldname: 'assign_class',
                            fieldtype: 'Link',
                            options: 'Group Class'
                        },
                    ],
                    size: 'small',
                    primary_action_label: 'Submit',
                    primary_action(values) {
                        fetch_data(frm);
                        d.hide();
                    }
                });

                d.show();
            });
        }
    }
});


function fetch_data(frm) {
    frappe.call({
        method: 'gym_management_system.gym_management_system.doctype.gym_member_name.gym_member_name.fetch_and_set_data',
        args: {
            self: frm.doc.name
        },
        callback: function(response) {
            console.log(response.message[0])

        }
    });
    
}
