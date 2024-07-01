document.addEventListener('DOMContentLoaded', () => {
    const flame = document.querySelector('.flame');
    const message = document.querySelector('.message');
    const birthdaySong = document.getElementById('birthdaySong');

    // Play birthday song
    birthdaySong.play();

    // Handle microphone input
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 256;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            function checkBlow() {
                analyser.getByteTimeDomainData(dataArray);
                let max = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    max = Math.max(max, dataArray[i]);
                }
                if (max > 180) {
                    flame.style.display = 'none';
                    message.style.display = 'block';
                    message.innerText = 'Happy Birthday, [AYA happy birthday to you]!';
                }
                requestAnimationFrame(checkBlow);
            }

            checkBlow();
        })
        .catch(error => console.error('Error accessing microphone:', error));
});
