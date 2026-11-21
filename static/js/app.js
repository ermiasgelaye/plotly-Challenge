// Belly Button Biodiversity dashboard
// Loads data/samples.json once and redraws every panel when a subject is selected.

const MODEBAR_CONFIG = {
    modeBarButtonsToRemove: [
        'zoom2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'autoScale2d',
        'toggleSpikelines',
        'hoverCompareCartesian'
    ]
};

// Fetch the dataset once and reuse the same promise everywhere
const dataPromise = d3.json('data/samples.json');

function init() {
    dataPromise.then(data => {
        const dropdownMenu = d3.select('#selDataset');
        data.names.forEach(name => dropdownMenu
            .append('option')
            .text(name)
            .property('value', name));

        // Initialize the page with the first subject
        optionChanged(data.names[0]);
    });
}

// Called by the dropdown's onchange handler in index.html
function optionChanged(id) {
    dataPromise.then(data => {
        const subjectData = data.metadata.find(subject => subject.id.toString() === id);
        const sample = data.samples.find(sample => sample.id === id);

        getMetadata(subjectData);
        getBar(sample, id);
        getBubble(sample, id);
        getGauge(subjectData);
    });
}

// Demographic info
function getMetadata(subjectData) {
    const subjectMetadata = d3.select('#sample-metadata');
    // Clear the previous subject before displaying the new one
    subjectMetadata.html('');
    Object.entries(subjectData)
        .forEach(([key, value]) => subjectMetadata
            .append('p')
            .text(`${key}: ${value ?? 'n/a'}`));
}

// Bar chart
function getBar(sortedSample, id) {
    // Trace for bar chart that displays each sample top 10 OTU values
    var barTrace = {
        x: sortedSample.sample_values.slice(0, 10).reverse(),
        y: sortedSample.otu_ids.slice(0, 10).map(otuid => `OTU ${otuid}`).reverse(),
        text: sortedSample.otu_labels.slice(0, 10).reverse(),
        hoverlabel: { font: { size: 12 } },
        marker: {
            color: '#337ab7',
            opacity: 1,
        },
        type: 'bar',
        orientation: 'h'
    };
    // Data
    var data = [barTrace];
    // Layout
    var layout = {
        title: {
            text: `Top 10 OTU for Test Subject No. ${id}`,
            font: {
                family: 'Arial',
                size: 24,
                color: 'black'
               
            },
        },
        
        height: 600,
        width: 630,
        xaxis: {
            tickwidth: 10,
            tickcolor: '#ffffff',
            tickfont: { family: 'Arial', color: 'black' },
            title: {
                text: "Value",
                font: {
                    family: 'Arial',
                    size: 18,
                    color: 'black'
                },
            },
        },
        yaxis: {
            automargin: true,
            tickwidth: 20,
            tickcolor: '#ffffff',
            tickfont: { family: 'Arial', color: 'black' },
            title: {
                text: 'Bacteria ID ',
                font: {
                    family: 'Arial',
                    size: 18,
                    color: 'black'
                },
            },
        },
    };
    // Render the plot to the div tag with id 'bar'
    Plotly.newPlot('bar', data, layout, MODEBAR_CONFIG);
}

// Bubble chart
function getBubble(sortedSample, id) {

    // Trace for bubble chart that displays each sample values
    var bubbleTrace = {
        x: sortedSample.otu_ids,
        y: sortedSample.sample_values,
        text: sortedSample.otu_labels,
        mode: "markers",
        marker: {
            size: sortedSample.sample_values,
            color: sortedSample.otu_ids,
            colorscale: [
                [0, '#b3d1ff'],
                [0.2, '#b3d1ff'],
                [0.2, '#1a75ff'],
                [0.4, '#1a75ff'],
                [0.4, '#00cc88'],
                [0.6, '#00cc88'],
                [0.6, '#ccffcc'],
                [0.8, '#ccffcc'],
                [0.8, '#99ff33'],
                [1.0, '#99ff33'],
            ],
            opacity: 0.8,
            line: {
                color: '#999999',
                width: 1
            }
        },
    };
    // Data
    var data = [bubbleTrace];
    // Layout
    var layout = {
        title: {
            text: `Test Subject No. ${id} Belly Button Biodiversity`,
            font: {
                family: 'Arial',
                size: 24,
                color: 'black'
            },
        },
        //margin: {l: 50, r: 100, t: 30, b: 30},
        height: 520,
        width: 920,
        xaxis: {
            tickcolor: '#ffffff',
            tickfont: { family: 'Arial', color: 'black' },
            title: {
                text: 'OTU ID (Bacteria)',
                font: {
                    family: 'Arial',
                    size: 18,
                    color: 'black'
                },
            },
        },
        yaxis: {
            automargin: true,
            tickcolor: '#ffffff',
            tickfont: { family: 'Arial', color: 'black' },
            title: {
                text: 'Sample Value',
                font: {
                    family: 'Arial',
                    size: 18,
                    color: 'black'
                },
            },
        },
    };
    // Render the plot to the div tag with id 'bubble'
    Plotly.newPlot('bubble', data, layout, MODEBAR_CONFIG);
}

// Gauge chart
function getGauge(subjectData) {
    // Weekly washing frequency (missing for a few subjects)
    var value = subjectData.wfreq ?? 0;

    // Data
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            type: 'indicator',
            mode: 'gauge+number',
            value: value,
            title: {
                text: 'Belly Button Washing Frequency <br><i>Scrubs per Week</i>',
                font: { size: 24, color: 'black', family: 'Arial' }
            },
            gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: 'darkgrey' },
                bar: { color: 'red', thickness: 0.3 },
                bgcolor: 'white',
                borderwidth: 0,
                bordercolor: 'gray',
                steps: [
                    { range: [0, 1], color: '#c2ddff' },
                    { range: [1, 2], color: '#8fc1ff' },
                    { range: [2, 3], color: '#5ca5ff' },
                    { range: [3, 4], color: '#2989ff'},
                    { range: [4, 5], color: '#0777ff' },
                    { range: [5, 6], color: '#0067e4' },
                    { range: [6, 7], color: '#0057c2' },
                    { range: [7, 8], color: '#00397e' },
                    { range: [8, 9], color: '#001a3a' }
                ],
            },
        },
    ];
    // Layout 
    var layout = {
        width: 440,
        height: 360,
        margin: { t: 35, r: 15, l: 15, b: 0 },
        font: { color: 'black', family: 'Arial' }
    };
    // Render the plot to the div tag with id 'gauge'
    Plotly.newPlot('gauge', data, layout);
}

init();
