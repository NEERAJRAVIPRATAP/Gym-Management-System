import frappe
from frappe.model.document import Document
class GymMembershipUI(Document):
    pass


from frappe.exceptions import DoesNotExistError         # subscription duration
@frappe.whitelist()
def show(llll):
    try:
        doc = frappe.get_doc('Gym Subscription', llll)
        x = doc.duration_subscription
        return x
    except frappe.DoesNotExistError:
        frappe.msgprint(f"Gym Subscription with ID {llll} not found.")
        return 0
    
    
import ast      # locker updation
@frappe.whitelist()
def snow(arg):
    name = ast.literal_eval(arg)
    doc = frappe.get_doc("Gym Membership UI", name[2])
    register_users = doc.get('register_users')
    locker_allocated = doc.get('locker_allocated')
    for row in locker_allocated:
        x = row.get('locker_id')
        y = row.get('locker_type')
        a = row.get('locker_start_time')
        b = row.get('locker_end_time')
        z = row.get('locker_fee')
        print(f"Processing locker_id: {x}, locker_type: {y}, start_time: {a}, end_time: {b}, locker_fee: {z}")
        moc = frappe.get_doc('Gym Locker', x)
        moc.start_date = a
        moc.end_date = b
        moc.gym_member = register_users
        moc.status = "Occupied"
        moc.save()
    return "Worked", 18
        
# import ast        # subscription member update
# @frappe.whitelist()
# def rog(arg):
#     name = ast.literal_eval(arg)
#     register_users = doc.get('register_users')
#         x = row.get('subscription_type')
#         moc = frappe.get_doc('Gym Subscription', x)
#         moc.member_assign = register_users
#         moc.save()
#     return "subs update worked"




  


