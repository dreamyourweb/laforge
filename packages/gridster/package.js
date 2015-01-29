Package.describe({
	name: 'gridster',
	summary: ' /* Fill me in! */ ',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.versionsFrom('1.0.2.1');
	api.addFiles(['jquery.gridster.with-extras.js', 'jquery.gridster.css'], 'client');
});
