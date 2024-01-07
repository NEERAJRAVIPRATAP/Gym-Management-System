// File: gym_management_system/gym_management_system/doctype/group_class/public/js/group_class.js
frappe.ui.form.on('Group Class', {
    after_save: function(frm) {
        frappe.msgprint("Assigned Class to Trainer");
    },
    after_insert: function(frm) {
        notifyTrainer(frm);
    },
    on_submit: function(frm) {
        frappe.msgprint("Mail sent to trainer & member");
    },
});

function notifyTrainer(frm) {
    frappe.call({
        method: 'gym_management_system.gym_management_system.doctype.group_class.group_class.send_notification_to_trainer',
        args: {
            docname: frm.doc.name
        },
        callback: function(r) {
            if (r.message) {
                frm.msgprint("Notification sent to Trainer!");
            }
        }
    });
}
