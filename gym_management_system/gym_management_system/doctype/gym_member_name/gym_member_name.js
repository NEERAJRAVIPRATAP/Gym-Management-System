frappe.ui.form.on('Gym Member Name', {
    validate: function (frm) {
        if (frm.doc.last_name === null) {
            frm.set_value("full_name", frm.doc.first_name)
        }
        else {
            frm.set_value("full_name", frm.doc.first_name + " " + frm.doc.last_name);
        }
    },

    after_save:function(frm){
        frappe.new_doc('Gym Membership UI')
    }
});

