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
	



