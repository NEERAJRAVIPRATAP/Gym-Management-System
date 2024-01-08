# Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
# For license information, please see license.txt

from frappe.utils import getdate
import re
import frappe
from frappe import _
from frappe.model.document import Document

class GymTrainer(Document):

	def validate(self):
		
		dob = getdate(self.dob)
		current_date = getdate()
		age_in_years = current_date.year - dob.year - ((current_date.month, current_date.day) < (dob.month, dob.day))
		self.age =  age_in_years

	
@frappe.whitelist()
def Set_Memeber_list(abc):
	
	doc_records = frappe.get_doc('Gym Trainer', abc)
	
	member_list = doc_records.get('member_details')
	member_name = []
	for record in member_list:
		member_name.append(record.get('member_name'))

	member_name = member_name[0]
	
	member_doc = frappe.get_doc('Gym Member Name', member_name)
	member_doc.gym_trainer = abc

	return member_doc
		





		


	
		




		



	



