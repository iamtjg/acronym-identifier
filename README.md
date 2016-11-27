# Acronym Identifier

## Description
Frustrated by acronyms and jargon all over documentation?  Can't kick the habit of using them yourself?  This aims to find all acronyms in a text and check them against a provided set of terms.  Then updating the text with indicators that can be expanded for the meanings of an acronym.

This JavaScript can be placed on any page, find all the potential acronyms, check them against a set of terms, and then insert an expandable widget that lists all acronyms and their definitions (if known) for the page.

'Fun' Fact: Did you know that acronyms are supposed to be pronounceable?  Otherwise they are called initializations.

Regex for matching an acronym:
`(?:\b)([A-Z]{2,})(?:\b)`

This matches any word that consists only of 2 or more capital letters.  The `\b` word boundaries are matched but not captured.

## Future Plans
Expand this to interact with a service that stores and can be used to manage known acronyms.

## Use
Script can retrieve list of known acronyms from a JSON file or from a definition provider.

If you are providing a JSON file use the below format.

Format of known acronyms list is expected to be a JSON object with the acronyms as keys and definitions as values.
```json
{
  "CSS": "Cascading Style Sheets",
  "HTML": "HyperText Markup Language",
  "BLARG": "Be Loud and Argue Gregariously",
  "NATO": "Not Another Tomato Omelet",
  "JS": "JavaScript",
  "WUT": "Waldo Underutilizes Tangerines"
}
```
To provide multiple definitions for an acronym set the value to an array of the definitions.
```json
{
  "CSS": ["Cascading Style Sheets","Counting Sheets Sarcastically"],
  "HTML": "HyperText Markup Language"
}
```

Add `nymid.min.js` and `nymid.min.css` from `dist/` to your header.

```html
<link href="nymid.min.css" rel="stylesheet" type="text/css">
<script src="nymid.min.js"></script>
```
Call the `nymid` function with the following parameters:
- `startingElement` - The highest level element to begin searching for acronyms at.  This defaults to `<body>` if not provided.
- `definitionList` - JSON object of known acronyms and their definitions.
- `widgetPosition` - which side of the screen widget should be displayed on. top, right, left, or bottom.
- `definitionProvider` - URL of definition provider service

### Examples
Using a local `.json` file:

```html
<script>
let listLocation = 'nym-list.json';

fetch(listLocation)
.then(function(response){
  return response.json();
})
.then(function(json){
  let list = json;
  nymid({
    startingElement: document.querySelector('main'),
    definitionList: list,
    widgetPosition: 'right'
  });
});
</script>
```

Using a definition provider:

```html
<script>
let listLocation = 'nym-list.json';

fetch(listLocation)
.then(function(response){
  return response.json();
})
.then(function(json){
  let list = json;
  nymid({
    startingElement: document.querySelector('main'),
    widgetPosition: 'right',
    definitionProvider: 'http:localhost:8089/define'
  });
});
</script>
```
