document.addEventListener('DOMContentLoaded', () => {
    // Function to load the camera.js file dynamically
    function loadCameraScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'camera.js';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    // Event listener for the toggle button to turn on the camera and load camera.js
    document.getElementById('mode-toggle').addEventListener('change', async () => {
        if (document.getElementById('mode-toggle').checked) {
            // Load and execute camera.js when the toggle button is turned on
            try {
                await loadCameraScript();
                console.log('camera.js loaded and executed successfully');
            } catch (error) {
                console.error('Error loading camera.js:', error);
            }
        } else {
            console.log('Toggle button turned off');
            // You may want to handle actions when the toggle button is turned off
        }
    });
});
          


/*document.addEventListener('DOMContentLoaded', function() {
    var modeToggle = document.getElementById('mode-toggle');
    var mediaStream = null;
    var videoElement = document.getElementById('videoElement');

    modeToggle.addEventListener('change', function() {
        if (modeToggle.checked) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(function(stream) {
                    mediaStream = stream;
                    alert("Access to camera and microphone granted!");
                    analyzeUser(stream, videoElement);
                })
                .catch(function(error) {
                    alert("Access to camera and microphone denied or error occurred: " + error);
                    modeToggle.checked = false;
                });
        } else {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
                mediaStream = null;
                alert("Camera and microphone turned off.");
            }
        }
    });
});*/

/*async function analyzeUser(stream, videoElement) {
    videoElement.srcObject = stream;
    analyzeEyestrain(videoElement);
    analyzePosture(videoElement);
    analyzeEmotionalWellBeing(videoElement);
}

async function analyze() {
    // Get the latest data from the API
    const data = await getData();

    // Update the UI with the latest data
    updateUI(data);

    // Call the chart update functions with the updated data
    updateScreenTimeChart(data.screenTime.duration);
    updatePostureChart(data.posture.status);
    updateEmotionalWellBeingChart(data.emotionalWellBeing.mood);
    updateNoiseLevelsChart(data.noiseLevel.level);

    // Repeat the analysis loop
    setTimeout(analyze, 1000);
}

/*function analyzeEyestrain(videoElement) {
    // Load models and configure face-api.js
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    ]).then(startEyestrainAnalysis);

    // Start eyestrain analysis when models are loaded
    function startEyestrainAnalysis() {
        // Start video stream from the video element
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoElement.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });

        videoElement.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(videoElement);
            document.body.append(canvas);
            const displaySize = { width: videoElement.width, height: videoElement.height };
            faceapi.matchDimensions(canvas, displaySize);

            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

               
                processEyeLandmarks(resizedDetections);
            }, 100); 
        });
    }

    
    function processEyeLandmarks(detections) {
        detections.forEach((detection) => {
            const landmarks = detection.landmarks;
            // Extract eye landmarks (e.g., leftEye, rightEye)
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();

            // Compute eyestrain metrics based on eye landmarks
            const eyeStrainMetrics = computeEyestrainMetrics(leftEye, rightEye);
            console.log('Eyestrain metrics:', eyeStrainMetrics);
        });
    }

    function computeEyestrainMetrics(leftEye, rightEye) {
   
        function calculateBlinkRate(eyeData) {
            let blinkCount = 0;
            let isOpen = false;
    
            for (let i = 0; i < eyeData.length; i++) {
                if (eyeData[i] === 0 && isOpen) {
                    blinkCount++;
                    isOpen = false; 
                } else if (eyeData[i] === 1 && !isOpen) {
                    isOpen = true;
                }
            }
    
            const blinkRate = (blinkCount / eyeData.length) * 60;
    
            return blinkRate;
        }
    
        function calculateEyeOpenness(eyeData) {
        const openEyeFrames = eyeData.reduce((count, frame) => {
            
            if (frame === 1) {
                count++;
            }
            return count;
        }, 0);
    
        
        const totalFrames = eyeData.length;
    
        
        const eyeOpennessPercentage = (openEyeFrames / totalFrames) * 100;
    
        return eyeOpennessPercentage;
    }
       
        const eyeStrainMetrics = {
            leftEyeBlinkRate: calculateBlinkRate(leftEye),
            rightEyeBlinkRate: calculateBlinkRate(rightEye),
            leftEyeOpenness: calculateEyeOpenness(leftEye),
            rightEyeOpenness: calculateEyeOpenness(rightEye)
        };
    
        return eyeStrainMetrics;
    }
}

async function analyzePosture(videoElement) {
    try {
        
        const model = poseDetection.SupportedModels.MoveNet;
        const detector = await poseDetection.createDetector(model);

        
        console.log('MoveNet model loaded successfully!');

        console.log("Starting posture analysis...");

        setInterval(async () => {
            try {
                const poses = await detector.estimatePoses(videoElement);
                console.log('Detected poses:', poses);

                if (poses.length > 0) {
                    poses.forEach(pose => {
                        analyzePose(pose);
                    });
                }

                updateDashboard(poses);
            } catch (error) {
                console.error('Error detecting poses:', error);
            }
        }, 1000); 
    } catch (error) {
        console.error('Error loading MoveNet model:', error);
    }
}

function analyzePose(pose) {
    const keypoints = pose.keypoints;
    const postureValue = analyzePostureValue(keypoints);
    console.log('Posture value:', postureValue);
    return postureValue;
}

function analyzePostureValue(keypoints) {
    const spineAngle = calculateSpineAngle(keypoints);
    const postureValue = calculatePostureValue(spineAngle);
    return postureValue;
}

// Function to calculate spine angle
function calculateSpineAngle(keypoints) {
    const leftShoulder = keypoints[KEYPOINT_DICT['left_shoulder']];
    const rightShoulder = keypoints[KEYPOINT_DICT['right_shoulder']];
    const leftHip = keypoints[KEYPOINT_DICT['left_hip']];
    const rightHip = keypoints[KEYPOINT_DICT['right_hip']];

    const leftShoulderToHip = calculateDistance(leftShoulder, leftHip);
    const rightShoulderToHip = calculateDistance(rightShoulder, rightHip);

    // Calculate spine angle using trigonometry
    const spineAngle = Math.atan(
        Math.abs(rightShoulder[1] - leftShoulder[1]) /
        Math.abs(rightShoulder[0] - leftShoulder[0])
    ) * (180 / Math.PI);

    return spineAngle;
}

// Function to calculate distance between two keypoints
function calculateDistance(point1, point2) {
    return Math.sqrt(
        Math.pow(point2[0] - point1[0], 2) +
        Math.pow(point2[1] - point1[1], 2)
    );
}

// Function to calculate posture value based on spine angle
function calculatePostureValue(spineAngle) {
    let postureValue = 'Good';
    if (spineAngle > 15) {
        postureValue = 'Moderate';
    }
    if (spineAngle > 30) {
        postureValue = 'Poor';
    }
    return postureValue;
}

function updateDashboard(poses) {
    console.log('Updating dashboard with pose analysis:', poses);
}


function detectNoiseLevel() {
    // Check if the Web Audio API is supported by the browser
    if (!('AudioContext' in window || 'webkitAudioContext' in window)) {
        console.error('Web Audio API is not supported by this browser.');
        return;
    }

    // Create an AudioContext object
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Access the user's microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            // Create an AudioNode from the microphone stream
            const audioSource = audioContext.createMediaStreamSource(stream);

            // Create a ScriptProcessorNode to analyze audio data
            const scriptNode = audioContext.createScriptProcessor(4096, 1, 1);

            // Connect the audio source to the script processor
            audioSource.connect(scriptNode);
            scriptNode.connect(audioContext.destination);

            // Event handler for processing audio data
            scriptNode.onaudioprocess = function(event) {
                // Get the audio samples from the input buffer
                const samples = event.inputBuffer.getChannelData(0);

                // Calculate the average noise level (root mean square) of the samples
                let sum = 0;
                for (let i = 0; i < samples.length; i++) {
                    sum += samples[i] * samples[i];
                }
                const rms = Math.sqrt(sum / samples.length);

                // Log the detected noise level (RMS)
                console.log('Detected noise level (RMS):', rms);
            };
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
        });
}

// Call the function to start detecting noise levels
detectNoiseLevel();


// Function to analyze emotional well-being
// Function to analyze emotional well-being using facial expressions
function analyzeEmotionalWellBeing(videoElement) {
    // Load the face detection and expression recognition models using face-api.js
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(startAnalysis).catch(error => {
        console.error("Error loading models:", error);
    });

    // Function to start emotional well-being analysis
    function startAnalysis() {
        // Start emotion analysis when the models are loaded
        console.log("Face detection and expression recognition models loaded. Starting emotional well-being analysis...");

        // Perform emotion analysis on each frame of the camera feed
        setInterval(() => {
            detectEmotions(videoElement);
        }, 1000); // Adjust the interval as needed
    }

    // Function to detect facial expressions and analyze emotions
    function detectEmotions(videoElement) {
        // Use face-api.js to detect faces and recognize expressions in the video frame
        faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions()
            .then(predictions => {
                // Process the detected faces and analyze emotional well-being
                if (predictions.length > 0) {
                    // Example: Analyze facial expressions for emotional cues
                    predictions.forEach(prediction => {
                        console.log("Emotions detected:", prediction.expressions);
                    });
                } else {
                    console.log("No faces detected.");
                }
            }).catch(error => {
                console.error("Error detecting faces:", error);
            });
    }
}

// Example: Get the video element from the HTML document
const videoElement = document.getElementById('videoElement');

// Start emotional well-being analysis using the video feed
analyzeEmotionalWellBeing(videoElement);

// Function to analyze screen time
// Function to analyze screen time
function analyzeScreenTime() {
    // Get the current time when the analysis starts
    const startTime = new Date();

    // Function to update screen time on the dashboard
    function updateScreenTime() {
        // Get the current time
        const currentTime = new Date();

        // Calculate the duration of the session in milliseconds
        const durationInMillis = currentTime - startTime;

        // Convert the duration to minutes and seconds
        const minutes = Math.floor(durationInMillis / (1000 * 60));
        const seconds = Math.floor((durationInMillis / 1000) % 60);

        // Update the dashboard with the screen time information
        const screenTimeElement = document.getElementById('screen-time');
        if (screenTimeElement) {
            screenTimeElement.textContent = `Screen Time: ${minutes} minutes ${seconds} seconds`;
        } else {
            console.error("Screen time element not found.");
        }
    }

    // Update the screen time every second
    setInterval(updateScreenTime, 1000);
}

// Call the analyzeScreenTime function to start screen time analysis
analyzeScreenTime();

// Shared object to hold the data
const sharedData = {
    eyestrainLevel: null,
    screenTimeDuration: null,
    postureStatus: null,
    emotionalWellBeing: null,
    noiseLevels: null
  };
  
  // Function to fetch eyestrain level
  function getEyestrainLevel() {
    // Implement your logic to fetch the eyestrain level
    // For example, you can return a random level for testing purposes
    const eyestrainLevels = ['Low', 'Moderate', 'High'];
    const randomIndex = Math.floor(Math.random() * eyestrainLevels.length);
    // Update the shared object
    sharedData.eyestrainLevel = eyestrainLevels[randomIndex];
    return sharedData.eyestrainLevel;
  }
  
  // Function to fetch screen time duration
  function getScreenTimeDuration() {
    // Implement your logic to fetch the screen time duration
    // For example, you can return a random duration for testing purposes
    const screenTimeDurations = ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours'];
    const randomIndex = Math.floor(Math.random() * screenTimeDurations.length);
    // Update the shared object
    sharedData.screenTimeDuration = screenTimeDurations[randomIndex];
    return sharedData.screenTimeDuration;
  }
  
  // Function to fetch posture status
  function getPostureStatus() {
    // Implement your logic to fetch the posture status
    // For example, you can return a random status for testing purposes
    const postureStatuses = ['Good', 'Moderate', 'Poor'];
    const randomIndex = Math.floor(Math.random() * postureStatuses.length);
    // Update the shared object
    sharedData.postureStatus = postureStatuses[randomIndex];
    return sharedData.postureStatus;
  }
  
  // Function to fetch emotional well-being
  function getEmotionalWellBeing() {
    // Implement your logic to fetch the emotional well-being
    // For example, you can return a random emotional state for testing purposes
    const emotionalWellBeings = ['Happy', 'Neutral', 'Sad'];
    const randomIndex = Math.floor(Math.random() * emotionalWellBeings.length);
    // Update the shared object
    sharedData.emotionalWellBeing = emotionalWellBeings[randomIndex];
    return sharedData.emotionalWellBeing;
  }
  
  // Function to fetch noise levels
  function getNoiseLevels() {
    // Implement your logic to fetch the noise levels
    // For example, you can return a random noise level for testing purposes
    const noiseLevels = ['Low', 'Moderate', 'High'];
    const randomIndex = Math.floor(Math.random() * noiseLevels.length);
    // Update the shared object
    sharedData.noiseLevels = noiseLevels[randomIndex];
    return sharedData.noiseLevels;
  }*/