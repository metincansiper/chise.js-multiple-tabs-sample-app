var sbgnviz = require('sbgnviz');
var chise = require('chise');
var filesaverjs = require('filesaverjs');
var jQuery = $ = require('jquery');
var cytoscape = require('cytoscape');

// Get cy extension instances
var cyPanzoom = require('cytoscape-panzoom');
// var cyQtip = require('cytoscape-qtip');
var cyCoseBilkent = require('cytoscape-cose-bilkent');
var cyUndoRedo = require('cytoscape-undo-redo');
var cyClipboard = require('cytoscape-clipboard');
var cyContextMenus = require('cytoscape-context-menus');
var cyExpandCollapse = require('cytoscape-expand-collapse');
var cyEdgeBendEditing = require('cytoscape-edge-bend-editing');
var cyViewUtilities = require('cytoscape-view-utilities');

// Register cy extensions
cyPanzoom( cytoscape, $ );
// cyQtip( cytoscape, $ );
cyCoseBilkent( cytoscape );
cyUndoRedo( cytoscape );
cyClipboard( cytoscape, $ );
cyContextMenus( cytoscape, $ );
cyExpandCollapse( cytoscape, $ );
cyEdgeBendEditing( cytoscape, $ );
cyViewUtilities( cytoscape, $ );

// Libraries to pass sbgnviz
var libs = {};

libs.filesaverjs = filesaverjs;
libs.jQuery = jQuery;
libs.cytoscape = cytoscape;
libs.sbgnviz = sbgnviz;

$(document).ready(function ()
{
  chise.register(libs);

  // Undoable flag to be passed to the extensions
  var undoable = true;

  var ch1 = window.ch1 = chise({
    networkContainerSelector: '#sbgn-network-container1',
    // whether to fit label to nodes
    fitLabelsToNodes: function () {
      return false;
    },
    // dynamic label size it may be 'small', 'regular', 'large'
    dynamicLabelSize: function () {
      return 'regular';
    },
    // percentage used to calculate compound paddings
    compoundPadding: function () {
      return 10;
    },
    undoable: undoable
  });

  ch1.loadSample('sample2.xml', 'app/samples/');

  ch1.getCy().undoRedo();

  ch1.getCy().viewUtilities({
    node: {
      highlighted: {
        'border-width': '5px'
      }, // styles for when nodes are highlighted.
      unhighlighted: {// styles for when nodes are unhighlighted.
        'opacity': function (ele) {
          return ele.css('opacity');
        }
      }
    },
    edge: {
      highlighted: {
        'width': '5px'
      }, // styles for when edges are highlighted.
      unhighlighted: {// styles for when edges are unhighlighted.
        'opacity': function (ele) {
          return ele.css('opacity');
        }
      }
    },
    undoable: undoable
  });

  ch1.getCy().expandCollapse({undoable: undoable});

  ch1.getCy().edgeBendEditing({
    // this function specifies the positions of bend points
    bendPositionsFunction: function (ele) {
      return ele.data('bendPointPositions');
    },
    // whether the bend editing operations are undoable (requires cytoscape-undo-redo.js)
    undoable: undoable,
    // title of remove bend point menu item
    removeBendMenuItemTitle: "Delete Bend Point",
    // whether to initilize bend points on creation of this extension automatically
    initBendPointsAutomatically: false,
    bendShapeSizeFactor: 6
  });

  var ch2 = window.ch2 = chise({
    networkContainerSelector: '#sbgn-network-container2',
    // whether to fit label to nodes
    fitLabelsToNodes: function () {
      return false;
    },
    // dynamic label size it may be 'small', 'regular', 'large'
    dynamicLabelSize: function () {
      return 'regular';
    },
    // percentage used to calculate compound paddings
    compoundPadding: function () {
      return 10;
    },
    undoable: undoable
  });

  ch2.loadSample('sample2.xml', 'app/samples/');

  ch2.getCy().undoRedo();

  ch2.getCy().viewUtilities({
    node: {
      highlighted: {
        'border-width': '10px'
      }, // styles for when nodes are highlighted.
      unhighlighted: {// styles for when nodes are unhighlighted.
        'opacity': function (ele) {
          return ele.css('opacity');
        }
      }
    },
    edge: {
      highlighted: {
        'width': '10px'
      }, // styles for when edges are highlighted.
      unhighlighted: {// styles for when edges are unhighlighted.
        'opacity': function (ele) {
          return ele.css('opacity');
        }
      }
    },
    undoable: undoable
  });

  ch2.getCy().expandCollapse({undoable: undoable});

  ch2.getCy().edgeBendEditing({
    // this function specifies the positions of bend points
    bendPositionsFunction: function (ele) {
      return ele.data('bendPointPositions');
    },
    // whether the bend editing operations are undoable (requires cytoscape-undo-redo.js)
    undoable: undoable,
    // title of remove bend point menu item
    removeBendMenuItemTitle: "Delete Bend Point",
    // whether to initilize bend points on creation of this extension automatically
    initBendPointsAutomatically: false
  });
});
