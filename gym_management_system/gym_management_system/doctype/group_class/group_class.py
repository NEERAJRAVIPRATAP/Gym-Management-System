from frappe.model.document import Document
import frappe

class GroupClass(Document):
    pass

@frappe.whitelist()
def send_notification_to_trainer(docname):
    try:
        group_class = frappe.get_doc("Group Class", docname)
        trainer_email = frappe.get_value("Gym Trainer", group_class.member_trainer, "email")

        if trainer_email:
            subject = f"Group Class '{group_class.name}' Details"
            message = f"Hello Trainer {group_class.member_trainer}!\n\nGroup Class '{group_class.name}' details:\nClass Type: {group_class.class_type}\nStart Time: {group_class.start_time}\nEnd Time: {group_class.end_time}"

            frappe.sendmail(
                recipients=[trainer_email],
                subject=subject,
                message=message
            )

            frappe.msgprint("Notification sent to Trainer!")

            # Update Gym Member List in Group Class DocType
            update_gym_member_list(group_class)

            return True
        else:
            frappe.msgprint("Warning: Trainer email not found. Notification not sent.")
            return False
    except Exception as e:
        frappe.msgprint(f"Error: {str(e)}")
        return False

def update_gym_member_list(group_class):
    # Add the trainer to the Gym Member List in the Group Class DocType
    if group_class.member_trainer not in group_class.gym_member_list:
        group_class.append("gym_member_list", {
            "trainer": group_class.member_trainer
        })

    group_class.save(ignore_permissions=True)
