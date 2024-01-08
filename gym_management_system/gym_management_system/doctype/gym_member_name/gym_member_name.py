# Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
class GymMemberName(Document):
   
  

    def on_submit(doc, method=None):
        gym_trainer = frappe.new_doc("Gym Trainer")
        gym_trainer.append("member_details", {
            "member_name": doc.name,
            "member_full_name": doc.full_name,
            "member_email": doc.email_address,
            "member_phone": doc.contact
        })
        gym_trainer.save()

        
        send_email_confirmation(doc)

def send_email_confirmation(member_doc):
    recipients = [member_doc.email_address]

    message = """Dear {member_name},We received your details. Now you are Member of Our Gym."""

    frappe.sendmail(
        recipients=recipients,
        subject=frappe._('Confirmation Message'),
        message=message.format(member_name=member_doc.full_name),
    )




       











 

	
	
