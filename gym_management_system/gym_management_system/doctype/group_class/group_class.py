# File: gym_management_system/gym_management_system/doctype/group_class/group_class.py
from frappe.model.document import Document
import frappe

class GroupClass(Document):
    pass

@frappe.whitelist()
def send_notification_to_trainer(docname):
    try:
        group_class = frappe.get_doc("Group Class", docname)
        print(docname)
        trainer_email = frappe.get_value("Gym Trainer", group_class.member_trainer, "email")
        print(trainer_email)

        if trainer_email:
            subject = f"Group Class '{group_class.name}' Details"
            message = f"Hello Trainer {group_class.member_trainer}!\n\nGroup Class '{group_class.name}' details:\nClass Type: {group_class.class_type}\nStart Time: {group_class.start_time}\nEnd Time: {group_class.end_time}"

            frappe.sendmail(
                recipients=[trainer_email],
                subject=subject,
                message=message
            )

            frappe.msgprint("Notification sent to Trainer!")
            return True
        else:
            frappe.msgprint("Warning: Trainer email not found. Notification not sent.")
            return False
    except Exception as e:
        frappe.msgprint(f"Error: {str(e)}")
        return False

@frappe.whitelist()
def send_email_to_gym_member(docname, email):
    try:
        group_class = frappe.get_doc("Group Class", docname)
        member_email = frappe.get_value("Gym Member", {"name": group_class.gym_member_name}, "email")

        if member_email:
            subject = f"Group Class '{group_class.name}' Details"
            message = f"Hello Gym Member {group_class.gym_member_name}!\n\nGroup Class '{group_class.name}' details:\nClass Type: {group_class.class_type}\nStart Time: {group_class.start_time}\nEnd Time: {group_class.end_time}"

            frappe.sendmail(
                recipients=[member_email],
                subject=subject,
                message=message
            )

            frappe.msgprint("Notification sent to Gym Member!")
            return True
        else:
            frappe.msgprint("Warning: Gym Member email not found. Notification not sent.")
            return False
    except Exception as e:
        frappe.msgprint(f"Error: {str(e)}")
        return False
