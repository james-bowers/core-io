Feature: Create new client certificate

Scenario: User creates a new certificate
  Given the user is on the Certificate Management page
  When the user clicks New Certificate
	Then the new certificate should download
  And the new certificate should be added to the list of certificates
