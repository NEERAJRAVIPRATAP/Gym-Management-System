import frappe
from frappe.model.document import Document
class GymMembershipUI(Document):
    
    def before_submit(self):
        doc = frappe.get_doc("Gym Membership UI", self.name)   # Gym-Member-Name Child- Subscription
        addresss = self.register_users
        table_get = doc.get('member_subscription_details')
        for row in table_get:
            x = row.get('subscription_type')
            y = row.get('start_date')
            a = row.get('end_date')
            # z = row.get('total_subscription_amount')  set from doctype
            moc = frappe.get_doc('Gym Member Name', addresss)
            child_row = moc.append('gym_subscription_details')
            child_row.name = self.name + x
            child_row.membership_id = self.name
            child_row.membership_plan = x
            child_row.start_date = y
            child_row.end_date = a
            # child_row.amount = z
            moc.save()
            

        locker_allocated = doc.get('locker_allocated')  # Gym Locker Update
        for row in locker_allocated:
            x = row.get('locker_id')
            y = row.get('locker_type')
            a = row.get('locker_start_time')
            b = row.get('locker_end_time')
            z = row.get('locker_fee')
            mocc = frappe.get_doc('Gym Locker', x)
            mocc.start_date = a
            mocc.end_date = b
            mocc.gym_member = addresss
            mocc.status = "Occupied"
            mocc.save()
      
        for row in locker_allocated:            # Gym Member Name child - locker
            xx = row.get('locker_id')
            mocccc = frappe.get_doc('Gym Member Name', addresss)
            child_row = mocccc.append('gym_locker_details')
            child_row.id = xx
            mocccc.save()



from frappe.exceptions import DoesNotExistError         # subscription duration
@frappe.whitelist()
def show(llll):
    if (llll):
        try:
            doc = frappe.get_doc('Gym Subscription', llll)
            x = doc.duration_subscription
            y = doc.amount
            return x, y
        except frappe.DoesNotExistError:
            frappe.msgprint(f"Gym Subscription with ID {llll} not found.")
            return 0
    elif (not llll):
        return "Empty String"

