Feature: Authentication Action

Scenario: Successful authentication with valid Certificate
	When User navigates to Dashboard Page
	Then the dashboard will appear

Scenario: Unsuccessful authentication with invalid Certificate
	When User navigates to Dashboard Page
	Then the user will be redirected to the home page
