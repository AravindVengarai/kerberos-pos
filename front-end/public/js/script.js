

const video = document.getElementById('videoInput');

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models') //heavier/accurate version of tiny face detector
]).then(start)
    
function start() {
    document.body.append('Models Loaded')
    navigator.mediaDevices.getUserMedia({ video: true }).then(
        function(stream) {
            video.srcObject = stream;
        })
        .catch(function (error) {
            console.log("Something went wrong!");
            console.log(error)
        });
    recognizeFaces();
}

async function recognizeFaces() {
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)
    const labeledDescriptors = await loadLabeledImages()
    console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)
    video.addEventListener('play', async () => {
        console.log('Playing')
        container.append(video);
        const canvas = faceapi.createCanvasFromMedia(video);
        container.append(canvas);
        const displaySize = { width: video.width, height: video.height}
        faceapi.matchDimensions(canvas, displaySize)
        console.log('container');
        console.log(container);
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            results.forEach( (result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })
        }, 100)
    })
}


function loadLabeledImages() {
    // const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
    const labels = ['Ankit', 'Karan'] // for WebCam
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
            for(let i=1; i<=2; i++) {
                const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                console.log(label + i + JSON.stringify(detections))
                descriptions.push(detections.descriptor)
            }
            document.body.append(label+' Faces Loaded | ')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}



// const imageUpload = document.getElementById('imageUpload');

// Promise.all([
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//     faceapi.nets.ssdMobilenetv1.loadFromUri('/models') //heavier/accurate version of tiny face detector
// ]).then(start)

// async function start() {
//     const container = document.createElement('div')
//     container.style.position = 'relative'
//     document.body.append(container)
//     const labeledFaceDescriptors = await loadLabeledImages()
//     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
//     let image
//     let canvas
//     document.body.append('Loaded')
//     imageUpload.addEventListener('change', async () => {
//         if (image) image.remove()
//         if (canvas) canvas.remove()
//         image = await faceapi.bufferToImage(imageUpload.files[0])
//         image.style.width = '600px';
//         image.style.height = '700px';
//         container.append(image)
//         canvas = faceapi.createCanvasFromMedia(image)
//         container.append(canvas)
//         const displaySize = { width: image.width, height: image.height }
//         faceapi.matchDimensions(canvas, displaySize)
//         const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
//         const resizedDetections = faceapi.resizeResults(detections, displaySize)
//         const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
//         results.forEach((result, i) => {
//             const box = resizedDetections[i].detection.box
//             const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
//             drawBox.draw(canvas)
//         })
//     })
// };

// const loadLabeledImages = () => {
//     const labels = ['Karan', 'Thanasis','Ankit', 'Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
//     return Promise.all(
//       labels.map(async label => {
//         const descriptions = []
//         for (let i = 1; i <= 2; i++) {
//             const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`);
//             const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
//             console.log(label + i + JSON.stringify(detections))
//             descriptions.push(detections.descriptor)
//         }
//         document.body.append(label+' Faces Loaded | ');
//         return new faceapi.LabeledFaceDescriptors(label, descriptions)
//       })
//     )
// }