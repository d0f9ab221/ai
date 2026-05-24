document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('prompt');
    const widthSelect = document.getElementById('width');
    const heightSelect = document.getElementById('height');
    const seedInput = document.getElementById('seed');
    const generateBtn = document.getElementById('generate-btn');
    const imageContainer = document.getElementById('image-container');
    const loading = document.getElementById('loading');
    const generatedImage = document.getElementById('generated-image');
    const imageActions = document.getElementById('image-actions');
    const downloadBtn = document.getElementById('download-btn');
    const newBtn = document.getElementById('new-btn');
    const chips = document.querySelectorAll('.chip');

    const API_KEY = 'sk_prr5c1liZUGFFd26RDP5veT4qXJOKetA';
    const MODEL = 'flux-schnell';
    const BASE_URL = 'https://image.pollinations.ai/prompt/';

    // Handle example chips
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            promptInput.value = chip.dataset.prompt;
            promptInput.focus();
        });
    });

    // Generate image
    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('Please enter a prompt to generate an image.');
            promptInput.focus();
            return;
        }

        const width = widthSelect.value;
        const height = heightSelect.value;
        const seed = seedInput.value || Math.floor(Math.random() * 1000000);

        // Show loading state
        generateBtn.disabled = true;
        loading.classList.add('active');
        generatedImage.style.display = 'none';
        imageActions.style.display = 'none';

        try {
            // Build the URL with parameters
            const encodedPrompt = encodeURIComponent(prompt);
            const imageUrl = `${BASE_URL}${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=${MODEL}&nologo=true`;

            // Preload the image
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                generatedImage.src = imageUrl;
                generatedImage.style.display = 'block';
                loading.classList.remove('active');
                imageActions.style.display = 'flex';
                generateBtn.disabled = false;
            };

            img.onerror = () => {
                throw new Error('Failed to generate image');
            };

            img.src = imageUrl;

        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. Please try again.');
            loading.classList.remove('active');
            generateBtn.disabled = false;
        }
    });

    // Download image
    downloadBtn.addEventListener('click', async () => {
        const imageUrl = generatedImage.src;
        if (!imageUrl) return;

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `flux-schnell-${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
            // Fallback: open in new tab
            window.open(imageUrl, '_blank');
        }
    });

    // New image button
    newBtn.addEventListener('click', () => {
        generatedImage.style.display = 'none';
        imageActions.style.display = 'none';
        promptInput.focus();
    });

    // Enter key to generate
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateBtn.click();
        }
    });
});