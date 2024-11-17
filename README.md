# maico_grimaldi_11.17.24
Programming exercise

## Scripts Needed in HTML Header
To run the JavaScript file for the experiment, ensure you include the following scripts in the `<head>` section of your HTML file. Here I am using CDN-hosted scripts, including the CSS:

```html
<script src="https://unpkg.com/jspsych@8.0.3"></script>
<script src="https://unpkg.com/@jspsych/plugin-preload@2.0.0"></script>
<script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@2.0.0"></script>
<script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@2.0.0"></script>
<link href="https://unpkg.com/jspsych@8.0.3/css/jspsych.css" rel="stylesheet" type="text/css" />
```

## Task Creation with jsPsych 
The task created using `jsPsych` includes the functionality to download the responses in CSV format at the end of the experiment.

## Important Note for the R Analysis
The only way to eliminate the warning `boundary (singular) fit: see help('isSingular')` encountered with `lmer` is by switching to `lm`. However, `lm` does not support mixed model analysis, which was a key requirement for this excercise.

