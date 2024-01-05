// // Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
// // For license information, please see license.txt

frappe.ui.form.on('Gym Trainer', {

    zumba: function(frm) {
        updateTotal(frm);
    },
    yoga: function(frm) {
        updateTotal(frm);
    },
    cross_fit: function(frm) {
        updateTotal(frm);
    },
    cardio: function(frm) {
        updateTotal(frm);
    },
    weight_lifting: function(frm) {
        updateTotal(frm);
    },


    before_save: function(frm){
        var doc_name = frm.doc.name
        console.log(doc_name)
        frappe.call({
            method: 'gym_management_system.gym_management_system.doctype.gym_trainer.gym_trainer.Set_Memeber_list',
            args: {
                abc: doc_name,

            },
            callback: function(response) {
                console.log(response)
            }

        })
}

   
});


function updateTotal(frm) {
    var total = 0;

    if (frm.doc.zumba == 1) {
        total += frm.doc.zumba_fee;
    }
    if (frm.doc.yoga == 1) {
        total += frm.doc.yoga_fee;
    }
    if (frm.doc.cross_fit == 1) {
        total += frm.doc.cross_fit_fee;
    }
    if (frm.doc.cardio == 1) {
        total += frm.doc.crdio_fee;
    }
    if (frm.doc.weight_lifting == 1) {
        total += frm.doc.weight_lifting_fee;
    }

    frm.set_value('total', total);
}
