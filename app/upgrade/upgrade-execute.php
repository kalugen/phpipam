<?php

/* ---------- Upgrade database ---------- */

/* functions */
require( dirname(__FILE__) . '/../../functions/functions.php');

# initialize user object
$Database 	= new Database_PDO;
$User 		= new User ($Database);
$Install 	= new Install ($Database);
$Tools	 	= new Tools ($Database);
$Result 	= new Result ();

# verify that user is logged in
$User->check_user_session();

# admin user is required
$User->is_admin(true);

# try to upgrade database
if($Install->upgrade_database()) {	$Result->show("success", _("Database upgraded successfully! <a class='btn btn-sm btn-default' href='".create_link('Dashboard')."'>Dashboard</a>"), false); }

# migrate settings
$User->migrate_domain_settings ();

# check for possible errors
if(sizeof($errors = $Tools->verify_database())>0) {
	$esize = sizeof($errors['tableError']) + sizeof($errors['fieldError']);

	print '<div class="alert alert-danger">'. "\n";

	# print table errors
	if (isset($errors['tableError'])) {
		print '<strong>'._('Missing table').'s:</strong>'. "\n";
		print '<ul class="fix-table">'. "\n";
		foreach ($errors['tableError'] as $table) {
			print '<li>'.$table.'</li>'. "\n";
		}
		print '</ul>'. "\n";
	}

	# print field errors
	if (isset($errors['fieldError'])) {
		print '<strong>'._('Missing fields').':</strong>'. "\n";
		print '<ul class="fix-field">'. "\n";
		foreach ($errors['fieldError'] as $table=>$field) {
			print '<li>Table `'. $table .'`: missing field `'. $field .'`;</li>'. "\n";
		}
		print '</ul>'. "\n";
	}
	print "</div>";
}
?>