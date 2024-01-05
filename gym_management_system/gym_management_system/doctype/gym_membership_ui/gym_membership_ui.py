# Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GymMembershipUI(Document):
	pass
# your_custom_module/your_custom_script.py
import frappe

@frappe.whitelist()
def get_username_from_email(user_doc):
    username = frappe.get_value("Gym Member Name", {"name": user_doc}, "first_name" )
    ea = frappe.get_value("Gym Member Name", {"name": user_doc}, 'email_address' )
    ct = frappe.get_value("Gym Member Name", {"name": user_doc}, 'contact' )
    return username, ea ,ct

@frappe.whitelist()
def snow(abc, xyz):
    # bb = str(xyz)
    doc = frappe.get_doc('Locker Data', abc)
    doc.locker_owner = xyz
    doc.save()
    if doc.save():
        return 1
    else:
        return 0
    
@frappe.whitelist()
def show(llll):
    doc = frappe.get_doc('Gym Subscription', llll)
    x = doc.duration_subscription
    y = doc.max_amount
    return x


