module.export = {
	'Show all stories': {
		'description': 'Use this endpoint to display all stories.',
		'url': '/api/stories/',
		'method': 'GET',
		'required': null,
		'options': {
			'limit': '20',
			'page': '1',
			'entities': 'false'
		}
	},

	'Show one story': {
		'description': 'Use this endpoint to display all stories.',
		'url': '/api/stories/:id',
		'method': 'GET',
		'required': null,
		'options': {
			'limit': '20',
		}
	},

	'Create a story': {
		'description': 'Use this endpoint to create a story.',
		'url': '/api/stories/:id',
		'method': 'GET',
		'required': {
			'content': 'string',
			'content': 'string',
		},
		'options': {
			'limit': '20',
		}
	},

	'Remove a story': {
		'description': 'Use this endpoint to remove a story.',
		'url': '/api/stories/:id',
		'method': 'GET',
		'required': {

		},
		'options': {
			'limit': '20',
		}
	},

	'Update a story': {
		'description': 'Use this endpoint to display all stories.',
		'url': '/api/stories/:id',
		'method': 'GET',
		'options': {
			'limit': '20',
		}
	},

	'Show stories options': {
		'description': 'Use this endpoint to display all stories.',
		'url': '/api/stories/:id',
		'method': 'GET',
		'options': {
			'limit': '20',
		}
	},
};
