# Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GymMemberName(Document):
    pass
@frappe.whitelist()
def new_document(msg):
   return "Hi this message from frappe_call"
   
   
   
   ''' doc = frappe.new_doc('Gym Trainer')
    doc.append("member_details",
                   {
                       "member_email": email_address,
                       "member_phone": contact
                   })
    
    doc.insert()'''



       











 

	
	
