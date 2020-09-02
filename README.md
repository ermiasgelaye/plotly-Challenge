# Belly Button Biodiversity - Plot.ly

<img src="Images/bacteria.png" width="1300"  height="600"/>

## Background
In this project, an interactive dashboard was built to explore the Belly Button Biodiversity Dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

The belly button is one of the habitats closest to us, and yet it remains relatively unexplored. In January 2011, we launched Belly Button Biodiversity to investigate the microbes inhabiting our navels, and the factors that might influence the microscopic life calling this protected, moist patch of skin home. In addition to inspiring scientific curiosity, Belly Button Biodiversity inspired conversations about the beneficial roles microbes play in our daily lives.

Source:The Public Science Lab

Use the interactive charts below to explore the dataset. Select a test subject ID number in a dropdown menu to see the relative sample results.

## Plotly - Bar Chart

In this task `samples.json` file was read by using the D3 library, and a horizontal bar chart with a dropdown menu was created, and displayed on the top 10 OTUs found in that individual. The appropriate values(`sample_values`), lables(`otu_ids`),and hover text(`otu_labels` ) assigned to the bar chart. 

![bar Chart](Images/hw01.png)

## Plotly - Bubble Chart

A bubble chart was created on the following values
- `otu_ids` for the x values.
- `sample_values` for the y values.
- `sample_values` for the marker size.
- `otu_ids` for the marker colors.
- `otu_labels` for the text values.

![Bubble Chart](Images/bubble_chart.png)

## Demographic Information 
A box is created to display an individual's demographic information from the sample metadata.

![hw](Images/hw03.png)

## Gauge Chart

A Gauge Chart was created to plot the weekly washing frequency of the individual.

![Weekly Washing Frequency Gauge](Images/gauge.png)

# Over All layout

The dashboard looks as follows: 

<img src="Images/all.gif" width="1000"  height="500"/>

## Deployment

This app is deployed public on GitHub page,click the following link to see how it looks like [Belly Button Biodiversity Dashboard](https://ermiasgelaye.github.io/plotly-Challenge
).


### About the Data

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

- - -

© 2020 Trilogy Education Services
