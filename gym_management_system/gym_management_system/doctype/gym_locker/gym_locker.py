# Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class GymLocker(Document):
	def autoname(self):
		self.name =make_autoname(self.locker_type + "-" + self.locker_id +"-" +".####")
