# .py file Group class :-
# File: gym_management_system/gym_management_system/doctype/group_class/group_class.py
from frappe.model.document import Document
import frappe

class GroupClass(Document):
    def before_submit(self):
        print("before submit work")
        try:
            # group_class = frappe.get_doc("Group Class", self.name)
            trainer = self.member_trainer
            trainer_email = frappe.get_value("Gym Trainer", trainer, "email")   
            subject = "Group Class Details"
            message = "Hello Trainer"            
            if trainer_email:
                frappe.sendmail(
                    recipients=[trainer_email],
                    subject=subject,
                    message=message
        )     
                
        except Exception as e:
            frappe.msgprint(f"Error: {str(e)}")
            return {'success': False}
        # tnvn mpvq vdow umiu 
        
        
# def send_email_to_gym_members(group_class):
#     try:
#         # Get Gym Members from the child table
#         gym_members = frappe.get_all("Class Assign Member", filters={"parent": group_class.name}, pluck="gym_member")        
#         for gym_member in gym_members:
#             # Get Gym Member's email
#             member_email = frappe.get_value("Gym Member", {"name": gym_member}, "email_address")            
#             if member_email:
#                 # Send email to Gym Member
#                 subject = f"Group Class '{group_class.name}' Details"
#                 message = f"Hello Gym Member {gym_member}!\n\nGroup Class '{group_class.name}' details:\nClass Type: {group_class.class_type}\nStart Time: {group_class.start_time}\nEnd Time: {group_class.end_time}"                
#             frappe.sendmail(
#                     recipients=[member_email],
#                     subject=subject,
#                     message=message
#                 )       
#             frappe.msgprint("Mail sent to Gym Members!")
#         return {'success': True}
#     except Exception as e:
#         frappe.msgprint(f"Error sending email to Gym Members: {str(e)}")
#         return {'success': False}
