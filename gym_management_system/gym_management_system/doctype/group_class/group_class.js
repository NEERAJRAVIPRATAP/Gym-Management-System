// gym_management_system/gym_management_system/doctype/group_class/public/js/group_class.js

frappe.ui.form.on('Group Class', {
    refresh: function(frm) {
        // Add a custom button to the form
        frm.add_custom_button(__('Notify Trainer'), function() {
            

            // Call a function to handle the button click
            notifyTrainer(frm);
        });
    },
    before_save: function(frm) {
        // Add logic to send notification to Trainer before saving
        sendNotificationToTrainer(frm);
    },
    before_submit: function(frm) {
        // Add logic to send notification to Trainer and Member before submission
        sendNotificationToTrainer(frm);
        sendNotificationToMember(frm);
    }
});

function notifyTrainer(frm) {
    // Add logic to get the email address and trigger notification
    frm.call({
        method: 'gym_management_system.gym_management_system.doctype.group_class.group_class.notify_trainer',
        args: {
            docname: frm.doc.name
        },
        callback: function(r) {
            if (r.message) {
                // Display the email address in a pop-up
                frappe.msgprint(`Trainer Email: ${r.message}`, __('Notify Trainer'));
            }
        }
    });
}

function sendNotificationToTrainer(frm) {
    // Add logic to send notification email to trainer before saving or submitting
    frm.call({
        method: 'gym_management_system.gym_management_system.group_class.group_class.send_notification_to_trainer',
        args: {
            docname: frm.doc.name
        },
        callback: function(r) {
            console.log(r)
            if (r.message) {
                frappe.msgprint(r.message);
            }
        }
    });
   
}

function sendNotificationToMember(frm) {
    // Add logic to send notification email to member before submission
    if (frm.doc.member_email) {
        frm.call({
            method: 'gym_management_system.gym_management_system.doctype.group_class.group_class.send_notification_to_member',
            args: {
                docname: frm.doc.name
            },
            callback: function(r) {
                if (r.message) {
                    frappe.msgprint(r.message);
                }
            }
        });
    }
}
