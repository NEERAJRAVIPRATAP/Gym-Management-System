// File: gym_management_system/gym_management_system/doctype/group_class/public/js/group_class.js
frappe.ui.form.on('Group Class', {
    after_save: function(frm) {
        frappe.msgprint("Assigned Class to Trainer");
        promptAndSendEmail(frm);
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

function promptAndSendEmail(frm) {
    frappe.prompt([
        {
            fieldtype: 'Data',
            label: 'Email Address',
            fieldname: 'email',
            reqd: true
        }
    ], function(values) {
        // Send email and show progress message
        console.log("check error !")
        console.log(frm,values);
        // console.log(email);
        sendEmailToGymMember(frm, values.email); // Corrected variable name
    }, 'Enter Gym Member Email', 'Submit');
}

function sendEmailToGymMember(frm, gymMemberEmail) {
    console.log(frm,values.email)
    showProgressIndicator(frm, 'Sending email to Gym Member...');
    frappe.call({
        method: 'gym_management_system.gym_management_system.doctype.group_class.group_class.send_email_to_gym_member',
        args: {
            docname: frm.doc.name,
            email: gymMemberEmail
        },
        callback: function(r) {
            frm.dashboard.hide_progress();
            if (r.message) {
                frm.msgprint('Mail sent to Gym Member!');
            }
        }
    });
}

function showProgressIndicator(frm, message) {
    frm.dashboard.show_progress(__('Sending Email'), 0.5);
    frappe.call({
        method: 'gym_management_system.gym_management_system.doctype.group_class.group_class.send_email_to_gym_member',
        args: {
            // Add any additional arguments as needed
        },
        callback: function(r) {
            frm.dashboard.hide_progress();
            frm.msgprint(message);
        }
    });
}
