# Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.utils import nowdate

class GymLocker(Document):
	def autoname(self):
		self.name =make_autoname(self.locker_type + "-" + self.locker_id +"-" +".####")


def schedular():
	locker_list = frappe.db.sql("""SELECT name from `tabGym Locker` WHERE end_date < '{current_date}' """.format(current_date=nowdate()),as_dict=1)
	for locker_data in locker_list:
		frappe.db.set_value("Gym Locker", locker_data.name, {'status':'Available'})
