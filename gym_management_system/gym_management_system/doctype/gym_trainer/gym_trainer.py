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

		# member_id = self.user_details[0].get('member_id')
		# full_name = self.user_details[0].get('user_name')
		# member_email = self.user_details[0].get('user_email')
		# member_phone = self.user_details[0].get('user_phone')

		# doc = frappe.new_doc('Gym Membership UI')
		# doc.user_name = full_name
		# doc.register_users = member_id
		# doc.member_id = member_id
		# doc.user_phone = member_phone
		# doc.user_email = member_email
		# d =	doc.save()
		# frappe.throw(str(d))


# @frappe.whitelist()
# def Set_Memeber_list(abc):
# 	doc_records = frappe.get_doc('Gym Trainer', abc)

# 	doc_memebership = frappe.new_doc('Gym Membership UI',abc)

# 	i = doc_records.get('user_details')
# 	for record in i:
# 		doc_memebership.full_name = record.get('user_name')
# 		doc_memebership.member_email = record.get('user_email')
# 		# doc_memebership.member_phone = record.get('user_phone')
		
# 	doc_memebership.save()

# 	return doc_memebership
		
@frappe.whitelist()
def Set_Memeber_list(abc):
		abcd = abc
	# doc_records = frappe.get_doc('Gym Trainer', abc)

	# doc_memebership = frappe.new_doc('Zym Member Name',abc)

	# i = doc_records.get('member_details')
	# for record in i:
	# 	doc_memebership.full_name = record.get('member_name')
	# 	doc_memebership.member_email = record.get('member_email')
	# 	# doc_memebership.member_phone = record.get('user_phone')
		
	# doc_memebership.save()

	# return doc_memebership
		
		
		# try:
		# 	data = frappe.db.sql("""  
        #      	select * from `tabTrainer Member List` where name = %s;
 		# 		""",abcd, as_dict=1)
		# 	return data
		# except Exception as e:
		# 	frappe.log_error(frappe.get_traceback(), _("Failed to save record"))
		# 	frappe.db.rollback()
		# 	return _("Failed to save record: {0}".format(str(e)))





		


	
		




		



	



