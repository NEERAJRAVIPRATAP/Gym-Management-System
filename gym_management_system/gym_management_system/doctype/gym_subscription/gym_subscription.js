frappe.ui.form.on('Gym Subscription', {
    refresh: function(frm) {
        frm.fields_dict['subscription_type'].get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    // Add any additional filters if needed
                }
            };
        };

        frm.fields_dict['duration'].get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    // Add any additional filters if needed
                }
            };
        };

        frm.fields_dict.subscription_type.$input.on('change', function() {
            set_subscription_amount(frm);
            get_subscription_info(frm);
        });

        frm.fields_dict.duration.$input.on('change', function() {
            callBackendForAmount(frm);
        });

        set_subscription_amount(frm);
    },

    subscription_type: function(frm) {
        callBackendForAmount(frm);
    },

    duration: function(frm) {
        frm.set_value('duration', frm.doc.duration);
        callBackendForAmount(frm);
        get_subscription_info(frm);
    }
});

function set_subscription_amount(frm) {
    const subscription_type = frm.doc.subscription_type;
    const amount_ranges = {
        'Weight-Lifting': 5000,
        'Zumba': 4000,
        'Yoga': 3000,
        'Cross-Fit': 6000,
        'Cardio': 3500,
        'Strength-Fitness': 5500
    };
    frm.set_value('amount_01', amount_ranges[subscription_type] || 0);
}

function get_subscription_info(frm) {
    frappe.call({
        method: 'gym_management_system.gym_management_system.doctype.gym_subscription.gym_subscription.get_subscription_info',
        args: {
            subscription_type: frm.doc.subscription_type
        },
        callback: function(response) {
            const subscriptionInfo = response.message;
            frm.set_value('min_amount', subscriptionInfo.min_amount || 0);
            frm.set_value('max_amount', subscriptionInfo.max_amount || 0);
        }
    });
}

function callBackendForAmount(frm) {
    var subscriptionType = frm.doc.subscription_type;
    var duration = frm.doc.duration_subscription;

    frappe.call({
        method: 'gym_management_system.gym_management_system.doctype.gym_subscription.gym_subscription.calculate_subscription_amount',
        args: {
            subscription_type: subscriptionType,
            duration: duration
        },
        callback: function(response) {
            var amountDetails = response.message;
            frm.set_value('min_amount', amountDetails.min_amount);
            frm.set_value('max_amount', amountDetails.max_amount);
        }
    });
}
