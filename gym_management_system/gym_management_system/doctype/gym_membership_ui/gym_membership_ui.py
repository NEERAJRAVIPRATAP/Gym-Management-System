# Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GymMembershipUI(Document):
	pass

import frappe

@frappe.whitelist()
def get_username_from_email(user_doc):
    username = frappe.get_value("Gym Member Name", {"name": user_doc}, "full_name" )
    
    moc = frappe.get_doc("Gym Member Name", user_doc )
    s = moc.get("gym_subscription_details")
    for i in s:
        x = i.get('subscription_type')   
        y = i.get('start_date')
        z = i.get('end_date')         
    t = moc.get("gym_locker_details")
    for i in t:
        p = i.get("gym_subscription")
        q = i.get("id") 
    trainer = moc.get('gym_trainer')
    return username,x, y, z, p, trainer, q





# @frappe.whitelist()
# def snow(abc, xyz):
#     # bb = str(xyz)
#     doc = frappe.get_doc('Locker Data', abc)
#     doc.locker_owner = xyz
#     doc.save()
#     if doc.save():
#         return 1
#     else:
#         return 0
    


