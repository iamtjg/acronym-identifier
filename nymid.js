'use strict';

const NYM_REGEX = /(?:\b)([A-Z]{2,})(?:\b)/g;

function nymid(options) {
  let nymNodes = findNymNodes(options.startingElement);
  let uniqueNyms = uniquePageNyms(nymNodes);
  let definedAcronyms = defineAcronyms(uniqueNyms, options.definitionList);

  insertWidget(definedAcronyms, options.widgetPosition);
}

/**
* Find all nodes that have acronyms
* @param {object} [element] - highest level element to start search at
* @return {object} nymNodes - all nodes with acronyms
*/
function findNymNodes(element) {
  if(!element) { element = document.body; }
  let nodes = element.querySelectorAll('*');
  let nymNodes = [];
  for (let i=0; i < nodes.length; i++) {
    let nyms = nodes[i].textContent.match(NYM_REGEX);

    if (nyms) {
      let finNyms = nyms.filter(isUniqueInArray);
      nodes[i].setAttribute('data-nyms', finNyms);
      nodes[i].setAttribute('data-nym-node-id', i);
      nymNodes.push({'nym-node-id': i, 'nyms': finNyms});
    }
  }
  return nymNodes;
}

/**
* Filter down to unique acronyms
* @param {object} nymNodes - array of all nodes with acronyms
* @return {object} uniqueNyms - array of unique acronyms
*/
function uniquePageNyms(nymNodes) {
  let uniqueNyms = [];

  nymNodes.map(function(node) {
    node.nyms.map(function(nym) {
      if(uniqueNyms.indexOf(nym) == -1) {
        uniqueNyms.push(nym);
      }
    });
  });
  return uniqueNyms;
}

/**
* Pair acronyms found on page with definitionList
* @param {object} uniqueNyms - array of unique acronyms
* @param {object} definitionList - JSON object of all known acronyms and definitions
* @return {object} defined - JSON object of page's acronyms and definitions
*/
function defineAcronyms(uniqueNyms, definitionList) {
  let defined = {};

  uniqueNyms.map(function(nym) {
    if (definitionList[nym]) {
      defined[nym] = definitionList[nym];
    } else {
      defined[nym] = 'No definition found';
    }
  });
  return defined;
}

/**
* Inserts acronym widget onto page
* @param {object} definedAcronyms - JSON object of known acronyms and defintions for the page
* @param {string} [position] - which side of the screen widget should be displayed on
*/
function insertWidget(definedAcronyms, position) {
  if(!position) { position = 'right';}
  let nymContainer = document.createElement('aside');
  nymContainer.classList.add('nym-container');
  nymContainer.innerHTML = '&#x1F4A1;';
  nymContainer.classList.add(`nym-container-pos-${position}`);
  nymContainer.addEventListener('click', function(){
    this.classList.toggle('nymlist-active');
  });

  let nymList = document.createElement('dl');
  nymList.classList.add('nymlist');

  for (let nym in definedAcronyms) {
    let nymTerm = document.createElement('dt');
    nymTerm.textContent = `${nym}`;

    if (Array.isArray(definedAcronyms[nym])) {
      let defArr = definedAcronyms[nym];
      defArr.map(function(def){
        let nymDef = document.createElement('dd');
        nymDef.textContent = `${def}`;
        nymTerm.appendChild(nymDef);
      });
    } else {
      let nymDef = document.createElement('dd');
      nymDef.textContent = `${definedAcronyms[nym]}`;
      nymTerm.appendChild(nymDef);
    }

    nymList.appendChild(nymTerm);
  }

  nymContainer.appendChild(nymList);
  document.querySelector('body').appendChild(nymContainer);
}


function isUniqueInArray(element, index, array) {
  return array.indexOf(element) === index;
}
