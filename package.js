Package.describe({
	name: 'jkuester:autoform-faicon',
	summary: 'Font awesome select',
	description: 'Select fontawesome icons in your autoform',
	version: '0.0.2',
	git: 'https://github.com/jankapunkt/meteor-autoform-faicon.git'
});

Package.onUse(function (api) {
	api.versionsFrom('METEOR@1.6');

	api.use([
		'check',
		'ecmascript',
		'underscore',
		'http',
		'reactive-var',
		'templating@1.3.2',
		'fortawesome:fontawesome@4.7.0',
		'aldeed:autoform@6.2.0',
		'aldeed:template-extension@4.0.0'
	]);

	api.addFiles([
		'autoform-faicon.css',
		'autoform-faicon.html',
		'autoform-faicon.js',
	], 'client');
});

// Npm.depends({})