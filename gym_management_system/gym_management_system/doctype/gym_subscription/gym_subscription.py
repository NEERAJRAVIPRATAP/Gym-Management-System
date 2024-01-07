# Copyright (c) 2024, Nestorbird_Trainee_Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document



class TestGymSubscription(Document):
	pass
	

@frappe.whitelist()
def get_subscription_info(subscription_type):
	amount_range = {
		'Weight_lifting': (2000,5000),
		'Zumba': (4000,9000),
		'Yoga': (3000,8000),
		'Cross-Fit': (6000,11000),
		'Cardio': (3500,8500),
		'Strength-Fitness': (5500,10500)
	}
	amount_range= amount_range.get(subscription_type,[0,0])
	
	

	return{
		'min_amount': amount_range[0],
		'max_amount': amount_range[1]
	}
@frappe.whitelist()
def calculate_subscription_amount(subscription_type, duration):
    amount_ranges = {
        'Weight_Lifting': [2000, 5000],
        'Zumba': [4000, 9000],
        'Yoga': [3000, 8000],
        'Cross-Fit': [6000, 11000],
        'Cardio': [3500, 8500],
        'Strength-Fitness': [5500, 10500]
    }

    amount_range = amount_ranges.get(subscription_type, [0, 0])

    if duration == '30 Days':
        return {'min_amount': amount_range[0] * 30, 'max_amount': amount_range[0] * 30}
    elif duration == '45 Days':
        return {'min_amount': amount_range[0] + (amount_range[1] - amount_range[0]) / 3,
                'max_amount': amount_range[0] + (amount_range[1] - amount_range[0]) / 3 * 2}
    elif duration == '60 Days':
        return {'min_amount': amount_range[0] + (amount_range[1] - amount_range[0]) / 3 * 2,
                'max_amount': amount_range[1]}
    elif duration == '120 Days':
        return {'min_amount': amount_range[1] * 2, 'max_amount': amount_range[1] * 2}
    else:
        return {'min_amount': 0, 'max_amount': 0}

