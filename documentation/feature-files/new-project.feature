Feature: New project

Scenario: Successful creation of a new project
  Given the user is on the New Project Page
  When the user provides the new project id
  And the user navigates to the Dashboard Page
	Then the new project will be displayed in a list
