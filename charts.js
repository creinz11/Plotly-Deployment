function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);[]
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    })

  });
}

// 1. Create the buildCharts function.
function buildBarCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var resultArray = data
      .samples
      .filter(sampleObj.id == sample)
    });
  // 3. Create a variable that holds the samples array. 

  // 4. Create a variable that filters the samples for the object with the desired sample number.
  //  5. Create a variable that holds the first sample in the array.
  var result = resultArray[0];
  var top_otu_ids = result.otu_ids.slice(0, 10).map(numericIds => {
    return 'OTU' + numericIds;
  }).reverse();

  // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
  var top_sample_values = result.sample_values.slice(0, 10).reverse();
  var top_otu_labels = result.otu_labels.slice(0, 10).reverse();

  // 7. Create the yticks for the bar chart.
  // Hint: Get the the top 10 otu_ids and map them in descending order  
  //  so the otu_ids with the most bacteria are last. 

  var yticks = top_otu_ids

  // 8. Create the trace for the bar chart. 
  var barData = [{
    type: "bar",
    x: [top_sample_values],
    y: [top_otu_ids],
    text: top_otu_labels,
    orientation: "h"
  }
  ];
  // 9. Create the layout for the bar chart. 
  var barLayout = {
    title: "Top OTUs",

  };
  // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", barData, barLayout)
};

// Bar and Bubble charts
// Create the buildCharts function.
function buildBubbleCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var resultArray = data.samples.filter(sampleObj => {
      return sampleObj.id == sample
    });

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    //Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = {
      x: [otu_ids],
      y: [sample_values],
      text: otu_labels,
      mode: "markers",
      marker: {
        color: otu_ids,
        size: [sample_values]}};
      

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "OTU IDs",
      showLegend: false,
    }

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  
// Create the buildChart function.
function buildGuageCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => {
      return sampleObj.id == sample
    });
    console.log(data);

    // Create a variable that holds the samples array. 


    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
    //var result = resultArray[0];
    //console.log(result);


    // 3. Create a variable that holds the washing frequency.
    var wash_frequency = result.wfreq;
    console.log(wash_frequency);


    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: wash_frequency,
      title: "Wash Frequency",
      type: "indicator",
      mode: "gauge+number",
      guage: {
        axis: { range: [null, 10] },
        bar: { color: "gray" },
        steps: [
          { range: [0, 1], color: "rgb(228,26,28)"},
          { range: [1, 2], color: "rgb(228,26,28)"},
          { range: [2, 3], color: "rgb(228,26,28)"},
          { range: [3, 4], color: "rgb(255,255,51)"},
          { range: [4, 5], color: "rgb(255,255,51)"},
          { range: [5, 6], color: "rgb(255,255,51)"},
          { range: [6, 7], color: "rgb(255,255,51)"},
          { range: [7, 8], color: "rgb(77,175,74)"},
          { range: [8, 9], color: "rgb(77,175,74)"},
          { range: [9, 10], color: "rgb(77,175,74)"},
        ],
      }
    }

    ];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 600,
      height: 500,
      margin: { t: 0, b: 0 }

    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('guage', guageData, guageLayout);
  });
};
