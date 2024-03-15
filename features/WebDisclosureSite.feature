Feature: Public Voting Disclosure

Scenario Outline: Viewing List of Meetings by Country 
    Given the user is on the landing page for the WD site
    And the Country filter is available
    When the user selects "<countryName>" from the Country filter list on the left panel
    And click on Update button for the country filter list
    Then the grid displays all meetings that are associated with the country "<countryName>"
    And no meetings associated with any other country appear on the list

    Examples:
        | countryName |
        | Belgium     |
        | Ireland     |


Scenario Outline: Opening the Company's Vote Card Page
    Given the user is on the landing page for the WD site
    When the user clicks the Company Name "<companyName>" hyperlink
    Then the user lands on the "<companyName>" vote card page.
    And "<companyName>" should appear in the top banner.

    Examples:
        |companyName             |
        |Activision Blizzard Inc |
        |Afterpay Limited        |

