# gym_management_system/gym_management_system/doctype/group_class/group_class.py

import frappe
from frappe.model.document import Document

class GroupClass(Document):
    def on_submit(self):
        self.update_gym_members_status()
        self.send_notification_to_trainer_and_member()

    def update_gym_members_status(self):
        # Example: Update Gym Members status when the form is submitted
        for member in self.gym_meber_name:
            member.update_status("Active")

    def send_notification_to_trainer_and_member(self):
        # Retrieve the email address of the Gym Trainer (Member Trainer)
        trainer_email = frappe.get_value("Gym Trainer", self.member_trainer, "email")

        # Check if email address is available
        if trainer_email:
            # Example: Send a notification to the Gym Trainer
            frappe.sendmail(
                recipients=[trainer_email],
                subject=f"Group Class '{self.name}' Submitted",
                message=f"Group Class '{self.name}' has been submitted successfully."
            )
        else:
            frappe.msgprint("Warning: Trainer email not found. Notification not sent.")

        # Check if member email is available
        if self.member_email:
            # Example: Send a notification to the Member
            frappe.sendmail(
                recipients=[self.member_email],
                subject=f"Group Class '{self.name}' Notification",
                message=f"Group Class '{self.name}' details:\nClass Type: {self.class_type}\nStart Time: {self.start_time}\nEnd Time: {self.end_time}"
            )

@frappe.whitelist()
def notify_trainer(docname=None):
    print(docname,"=====")
    # Retrieve the email address of the Gym Trainer (Member Trainer)
    if docname:
        group_class = frappe.get_doc("Group Class", docname)
        print(group_class)
        trainer_email = frappe.get_value("Gym Trainer", docname.member_trainer, "email")
        print(trainer_email)
        return trainer_email if trainer_email else None
    else:
        frappe.throw("Error: Missing document name for notify_trainer.")

@frappe.whitelist()
def send_notification_to_trainer(docname=None):
    # Add server-side logic to send notification email to trainer before saving or submitting
    if docname:
        group_class = frappe.get_doc("Group Class", docname)
        trainer_email = frappe.get_value("Gym Trainer", group_class.member_trainer, "email")
        
        # Check if email address is available
        if trainer_email:
            return f"Notification sent to Trainer: {trainer_email}"
        else:
            return "Warning: Trainer email not found. Notification not sent."
    else:
        frappe.throw("Error: Missing document name for send_notification_to_trainer.")

@frappe.whitelist()
def send_notification_to_member(docname=None):
    # Add server-side logic to send notification email to member before submission
    if docname:
        group_class = frappe.get_doc("Group Class", docname)
        
        # Check if member email is available
        if group_class.member_email:
            frappe.sendmail(
                recipients=[group_class.member_email],
                subject=f"Group Class '{group_class.name}' Notification",
                message=f"Group Class '{group_class.name}' details:\nClass Type: {group_class.class_type}\nStart Time: {group_class.start_time}\nEnd Time: {group_class.end_time}"
            )
            return f"Notification sent to Member: {group_class.member_email}"
        else:
            return "Warning: Member email not found. Notification not sent."
    else:
        frappe.throw("Error: Missing document name for send_notification_to_member.")
