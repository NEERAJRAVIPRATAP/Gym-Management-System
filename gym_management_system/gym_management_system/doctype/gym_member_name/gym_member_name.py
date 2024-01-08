# Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GymMemberName(Document):
    # @frappe.whitelist()
    # def set_details(self):
    def on_submit(doc,method=None):
        gym_trainer=frappe.new_doc("Gym Trainer")
        gym_trainer.append("member_details",
                   {
                       "member_name":doc.name,
                       "member_email":doc.email_address,
                       "member_phone":doc.contact
                   })
        gym_trainer.save()
        # a=frappe.get_doc("Gym Member Name",doc.name)
        # print(gym_trainer.name)
        # a.gym_trainer=gym_trainer.name
        # print(a,"========")
        # a.save()

       











 

	
	
