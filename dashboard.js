// dashboard.js
import { sharedData } from './app.js';

document.addEventListener('DOMContentLoaded', function() {
  setInterval(updateDashboard, 5000);
  const refreshButton = document.querySelector('.glowing-btn');
  refreshButton.addEventListener('click', function() {
    updateDashboard();
  });
});

function updateDashboard() {
  // Fetch the values from the shared object
  const eyestrainLevel = sharedData.eyestrainLevel;
  const screenTimeDuration = sharedData.screenTimeDuration;
  const postureStatus = sharedData.postureStatus;
  const emotionalWellBeing = sharedData.emotionalWellBeing;
  const noiseLevels = sharedData.noiseLevels;

  // Update the canvas elements with the new values
  updateEyestrainChart(eyestrainLevel);
  updateScreenTimeChart(screenTimeDuration);
  updatePostureChart(postureStatus);
  updateEmotionalWellBeingChart(emotionalWellBeing);
  updateNoiseLevelsChart(noiseLevels);
}

function getEyestrainLevel() {
    // Implement your logic to fetch the eyestrain level
    // For example, you can return a random level for testing purposes
    const eyestrainLevels = ['Low', 'Moderate', 'High'];
    const randomIndex = Math.floor(Math.random() * eyestrainLevels.length);
    return eyestrainLevels[randomIndex];
}

// Function to fetch screen time duration
function getScreenTimeDuration() {
    // Implement your logic to fetch the screen time duration
    // For example, you can return a random duration for testing purposes
    const screenTimeDurations = ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours'];
    const randomIndex = Math.floor(Math.random() * screenTimeDurations.length);
    return screenTimeDurations[randomIndex];
}

// Function to fetch posture status
function getPostureStatus() {
    // Implement your logic to fetch the posture status
    // For example, you can return a random status for testing purposes
    const postureStatuses = ['Good', 'Moderate', 'Poor'];
    const randomIndex = Math.floor(Math.random() * postureStatuses.length);
    return postureStatuses[randomIndex];
}

// Function to fetch emotional well-being
function getEmotionalWellBeing() {
    // Implement your logic to fetch the emotional well-being
    // For example, you can return a random emotional state for testing purposes
    const emotionalWellBeings = ['Happy', 'Neutral', 'Sad'];
    const randomIndex = Math.floor(Math.random() * emotionalWellBeings.length);
    return emotionalWellBeings[randomIndex];
}

// Function to fetch noise levels
function getNoiseLevels() {
    // Implement your logic to fetch the noise levels
    // For example, you can return a random noise level for testing purposes
    const noiseLevels = ['Low', 'Moderate', 'High'];
    const randomIndex = Math.floor(Math.random() * noiseLevels.length);
    return noiseLevels[randomIndex];
}
// Functions to update the canvas elements with the new values
function updateEyestrainChart(eyestrainLevel) {
    // Update the eyestrain chart canvas with the new value
    const eyestrainChartCanvas = document.getElementById('eyeStrainChart');
    // Example code to update the chart (using Chart.js)
    // Replace this with your actual chart update logic
    // This is just a placeholder
    const ctx = eyestrainChartCanvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Eyestrain Level: ' + eyestrainLevel, 10, 50);
}

function updateScreenTimeChart(screenTimeDuration) {
    // Update the screen time chart canvas with the new value
    const screenTimeChartCanvas = document.getElementById('screenTimeChart');
    // Example code to update the chart (using Chart.js)
    // Replace this with your actual chart update logic
    // This is just a placeholder
    const ctx = screenTimeChartCanvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Screen Time: ' + screenTimeDuration, 10, 50);
}

function updatePostureChart(postureStatus) {
    // Update the posture chart canvas with the new value
    const postureChartCanvas = document.getElementById('postureChart');
    // Example code to update the chart (using Chart.js)
    // Replace this with your actual chart update logic
    // This is just a placeholder
    const ctx = postureChartCanvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Posture Status: ' + postureStatus, 10, 50);
}

function updateEmotionalWellBeingChart(emotionalWellBeing) {
    // Update the emotional well-being chart canvas with the new value
    const emotionalWellBeingChartCanvas = document.getElementById('emotionalWellbeingChart');
    // Example code to update the chart (using Chart.js)
    // Replace this with your actual chart update logic
    // This is just a placeholder
    const ctx = emotionalWellBeingChartCanvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Emotional Well-being: ' + emotionalWellBeing, 10, 50);
}

function updateNoiseLevelsChart(noiseLevels) {
    // Update the noise levels chart canvas with the new value
    const noiseLevelsChartCanvas = document.getElementById('noiseLevelsChart');
    // Example code to update the chart (using Chart.js)
    // Replace this with your actual chart update logic
    // This is just a placeholder
    const ctx = noiseLevelsChartCanvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Noise Levels: ' + noiseLevels, 10, 50);
}
