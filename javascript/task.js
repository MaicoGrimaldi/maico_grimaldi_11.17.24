// Initialize jsPsych with a callback function to save data at the end
var jsPsych = initJsPsych({
    on_finish: function() {
        // Convert collected data to CSV format
        const csv_data = jsPsych.data.get().filter({task: 'response'}).csv();
        
        // Create a download link for the CSV file
        const blob = new Blob([csv_data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'experiment_data.csv';
        
        // Simulate a click to trigger the download
        a.click();
        window.URL.revokeObjectURL(url);
    }
});

// Create the experiment timeline
var timeline = [];

// Preload images to ensure they're available when needed
var preload = {
    type: jsPsychPreload,
    images: ['img/img1.png', 'img/img2.png', 'img/img3.png', 'img/img4.png', 'img/img5.png']
};

timeline.push(preload);

// Display a welcome message to participants
var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #ffffff">
            <div style="text-align: center">
                <h1>¡Welcome to the experiment!</h1>
                <p>Press any key to begin.</p>
            </div>
        </div>
    `
};

timeline.push(welcome);

// Provide instructions for the experiment
var instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #ffffff">
            <div style="text-align: center">
                <h2>Instructions</h2>
                <p>In this experiment, you will see a series of figures.</p>
                <p>If you think the figure is <strong>positive</strong>, press the letter <strong>P</strong> on your keyboard.</p>
                <p>If you think the figure is <strong>negative</strong>, press the letter <strong>N</strong> on your keyboard.</p>
                <p>Press any key to start seeing the figures.</p>
            </div>
        </div>
    `,
    post_trial_gap: 500
};

timeline.push(instructions);

// Display a fixation cross before each trial
var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 500
};

// Define the stimuli for the trials
var imgs = [
    { stimulus: 'img/img1.png' },
    { stimulus: 'img/img2.png' },
    { stimulus: 'img/img3.png' },
    { stimulus: 'img/img4.png' },
    { stimulus: 'img/img5.png' }
];

// Define the trial procedure
var trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['p', 'n'],
    data: {
        task: 'response'
    }
};

// Combine fixation and trial into a test procedure
var test_procedure = {
    timeline: [fixation, trial],
    timeline_variables: imgs,
    repetitions: 1,
    randomize_order: true
};

timeline.push(test_procedure);

// Display a debrief message at the end of the experiment
var debrief_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="text-align: center; padding: 20px;">
            <p>Thank you for participating in the experiment.</p>
            <p>Your responses have been recorded.</p>
            <p>Press any key to complete the experiment. Thank you!</p>
        </div>
    `
};

timeline.push(debrief_block);

// Start the experiment
jsPsych.run(timeline);
