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

        callback: function (response) {
            if (response.message && response.message.length > 0) {
                console.log(response.message[0]);
                var data = response.message[0];
                var start_time = data.start_time;
                var end_time = data.end_time;
                var class_type = data.class_type;
                frappe.msgprint(`Dear Member ${frm.doc.full_name}, Your class type is ${class_type}. It will start on ${start_time} and end on ${end_time}`);
            } else {
                console.error("Response message is empty or not in the expected format.");
            }
        }
    });
}