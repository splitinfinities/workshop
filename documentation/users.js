module.export = {
	'Show all users': {
		'description': 'Use this endpoint to display all users.',
		'url': '/api/users/',
		'method': 'GET',
		'required': null,
		'options': {
			'limit': '20',
			'page': '1'
		}
	},

	'Show one user': {
		'description': 'Use this endpoint to display all users.',
		'url': '/api/users/:id',
		'method': 'GET',
		'required': null,
		'options': {
			'limit': '20',
		}
	},

	'Create a user': {
		'description': 'Use this endpoint to create a user.',
		'url': '/api/users/:id',
		'method': 'GET',
		'required': {
			'first_name': 'string',
			'last_name': 'string',
			'email': 'string',
			'password': 'string',
		},
		'options': {
			'limit': '20',
		}
	},

	'Remove a user': {
		'description': 'Use this endpoint to remove a user.',
		'url': '/api/users/:id',
		'method': 'GET',
		'required': {

		},
		'options': {
			'limit': '20',
		}
	},

	'Update a user': {
		'description': 'Use this endpoint to display all users.',
		'url': '/api/users/:id',
		'method': 'GET',
		'options': {
			'limit': '20',
		}
	},

	'Show users options': {
		'description': 'Use this endpoint to display all users.',
		'url': '/api/users/:id',
		'method': 'GET',
		'options': {
			'limit': '20',
		}
	},
};
