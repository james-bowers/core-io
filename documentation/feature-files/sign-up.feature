Feature: Sign up

Scenario: Successful user setting up account
  Given the user is on the Sign Up page
  When the user enters their email and clicks Create
	Then the user's certificate will download
