// Global objects go here (outside of any functions)
let data, scatterplot, barchart; 
let difficultyFilter = [];
const dispatcher = d3.dispatch('filterCategories');

d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

     // ... data preprocessing etc. ... TODO: you add code here for numeric
     // Be sure to examine your data to fully understand the code

     // Initialize scale
    const colorScale = d3.scaleOrdinal()
        .domain(["Easy", "Intermediate", "Difficult"])
        .range(["yellow", "orange", "red"]); // TODO: add an ordinal scale for the difficulty
     // See Lab 4 for help
     scatterplot = new Scatterplot({
       parentElement: '#scatterplot',
       colorScale: colorScale,
       containerWidth: 500,
       containerHeight: 300,
       margin: {top: 25, right: 20, bottom: 20, left: 35}
     }, data);
     scatterplot.updateVis();

    //  barchart = new Barchart({
    //    parentElement: '#barchart',
    //    colorScale: colorScale,
    //    containerWidth: 260,
    //    containerHeight: 300,
    //    margin: {top: 25, right: 20, bottom: 20, left: 40}
    //  }, data);
    //  barchart.updateVis();
    barchart = new Barchart({
        parentElement: '#barchart',
        colorScale: colorScale,
        containerWidth: 260,
        containerHeight: 300,
        margin: {top: 25, right: 20, bottom: 20, left: 40}
      }, dispatcher, data);
      barchart.updateVis();
   })
  .catch(error => console.error(error));


/**
 * Load data from CSV file asynchronously and render charts
 */



/**
 * Use bar chart as filter and update scatter plot accordingly
 */
/**
 * Use bar chart as filter buttons and update scatter plot accordingly
 */
dispatcher.on('filterCategories', selectedCategories => {
	if (selectedCategories.length == 0) {
		scatterplot.data = data;
	} else {
		scatterplot.data = data.filter(d => selectedCategories.includes(d.difficulty));
	}
	scatterplot.updateVis();
});