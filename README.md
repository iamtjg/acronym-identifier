# Acronym Identifier

Frustrated by acronyms and jargon all over documentation?  Can't kick the habit of using them yourself?  This aims to find all acronyms in a text and check them against a provided set of terms.  Then updating the text with indicators that can be expanded for the meanings of an acronym.

The current plan is to make this JavaScript that can be placed on any page, find all the potential acronyms, check them against a set of terms (either client side or sent to server for processing), and then visually and structurally (using `abbr` elements) indicate what are known acronyms.

Fun Fact: Did you know that acronyms are supposed to be pronounceable?  Otherwise they are called 'initializations.'

Regex for matching an acronym:
`(?:\b)([A-Z]{2,})(?:\b)` -> this matches any word that consists only of 2 or more capital letters.  The `\b` word boundaries are matched but not captured.
