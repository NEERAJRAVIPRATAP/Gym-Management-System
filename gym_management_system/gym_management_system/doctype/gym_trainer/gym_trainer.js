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
