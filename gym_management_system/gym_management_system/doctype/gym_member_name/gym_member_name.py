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
'''from frappe import _

def on_update(doc, method):
    # Fetch data from the gym_member_name record
    member_name = doc.name
    age = doc.age
    email = doc.email
    contact = doc.contact

    # Update gym_trainer child table records
    update_gym_trainer(member_name, age, email, contact)

def update_gym_trainer(member_name, age, email, contact):
    # Fetch gym_trainer records related to the gym_member_name
    trainers = frappe.get_all('Gym Trainer', filters={'member_name': member_name}, fields=['name'])

    for trainer in trainers:
        trainer_doc = frappe.get_doc('Gym Trainer', trainer.name)
        # Update the child table records
        for child in trainer_doc.get('child_table_field'):
            if child.member_name == member_name:
                child.age = age
                child.email = email
                child.contact = contact

        # Save the changes to the trainer document
        trainer_doc.save()'''