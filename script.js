// ============================================
// CS OFFICIAL - AI Image Generator
// Powered by Pollination AI (Flux Schnell)
// ============================================

const CONFIG = {
  API_BASE: 'https://image.pollinations.ai/prompt/',
  MODEL: 'flux',
  API_KEY: 'sk_prr5c1liZUGFFd26RDP5veT4qXJOKetA',
  DEFAULT_WIDTH: 512,
  DEFAULT_HEIGHT: 512,
  AUTO_INTERVAL: 3000,
};

// Auto-generate prompts
const AUTO_PROMPTS = [
  'epic dragon flying over a medieval castle at sunset, cinematic lighting, 8k',
  'cyberpunk city street at night, neon lights, rain, futuristic',
  'beautiful anime girl with cherry blossoms, soft lighting, detailed',
  'majestic lion in the savanna, golden hour, photorealistic',
  'underwater coral reef with colorful fish, ocean, nature',
  'space nebula with stars and galaxies, cosmic, deep space',
  'Japanese temple in autumn, red maple leaves, peaceful',
  'steampunk airship flying over Victorian London, detailed',
  'enchanted forest with glowing mushrooms, magical, fantasy',
  'astronaut on Mars, red planet, space suit, NASA style',
  'cute kitten playing with yarn, soft fur, adorable',
  'watercolor painting of a mountain landscape, artistic',
  'futuristic robot in a garden, flowers, peaceful coexistence',
  'northern lights over a snowy village, aurora borealis, winter',
  'ancient Egyptian pyramid at night, stars, desert',
  'tropical beach with crystal clear water, palm trees, paradise',
  'dragon made of fire and ice, fantasy battle, epic',
  'vintage car on a coastal road, sunset, classic',
  'mystical portal in a dark forest, glowing, magical',
  'city skyline at night, long exposure, lights, urban',
  'phoenix rising from flames, mythical bird, fire, rebirth',
  'deep sea creature, bioluminescent, ocean depths',
  'floating islands in the sky, fantasy world, clouds',
  'samurai warrior in a bamboo forest, dramatic lighting',
  'crystal cave with glowing gems, underground, magical',
  'retro arcade game aesthetic, pixel art, neon',
  'whale swimming through stars, cosmic ocean, surreal',
  'ancient library with floating books, magical, fantasy',
  'volcano eruption at night, lava, dramatic, powerful',
  'butterfly garden in spring, colorful, nature, peaceful',
  'gothic cathedral interior, stained glass, dramatic light',
  'pirate ship in a storm, ocean waves, dramatic',
  'zen garden with cherry blossoms, peaceful, Japanese',
  'mech warrior in a futuristic battlefield, sci-fi, detailed',
  'fairy village in a mushroom forest, tiny houses, magical',
  'desert oasis at mirage, heat waves, surreal',
  'ice palace in the arctic, frozen, crystal, beautiful',
  'street food market in Bangkok, vibrant, colorful, night',
  'ancient ruins overgrown with vines, mysterious, jungle',
  'solar eclipse over a mountain range, dramatic sky',
  'mermaid underwater with bioluminescent creatures, ocean',
  'castle in the clouds, fantasy, dreamlike, beautiful',
  'wild horses running through a field, freedom, nature',
  'haunted mansion on a hill, fog, gothic, spooky',
  'rainbow waterfall in a tropical paradise, nature, stunning',
  'robot painting in an art studio, AI creativity, surreal',
  'ancient tree with a door, fantasy, magical, detailed',
  'northern lights reflected in a frozen lake, arctic, serene',
  'steampunk clockwork mechanism, gears, brass, detailed',
  'cherry blossom festival in Japan, people, celebration',
  'dragon egg hatching, fantasy, magical, detailed',
  'abandoned amusement park, overgrown, eerie, beautiful',
  'cosmic tree connecting galaxies, universe, surreal',
  'traditional Indian palace, architecture, detailed, golden',
  'wolf howling at the moon, forest, night, dramatic',
  'futuristic space station, orbiting Earth, sci-fi',
  'ancient Greek temple at sunset, columns, Mediterranean',
  'field of sunflowers under a blue sky, summer, nature',
  'deep space black hole, accretion disk, cosmic, NASA',
  'Japanese dragon in the clouds, traditional art, detailed',
  'crystal dragon in an ice cave, fantasy, glowing',
  'viking longship in northern waters, storm, epic',
  'bioluminescent bay at night, glowing water, magical',
  'ancient library of Alexandria, historical, detailed',
  'futuristic Tokyo street, holograms, neon, cyberpunk',
  'giant sequoia forest, misty, morning, nature',
  'phoenix and dragon in battle, fantasy, fire, epic',
  'underwater city, Atlantis, ancient, mysterious',
  'desert sand dunes at golden hour, Sahara, beautiful',
  'enchanted rose in a glass dome, beauty and the beast',
  'mechanical butterfly, steampunk, detailed, brass',
  'aurora over a fjord, Norway, landscape, stunning',
  'ancient stone circle at solstice, mystical, druid',
  'futuristic flying cars, city, sci-fi, detailed',
  'garden of Eden, paradise, lush, beautiful',
  'dragon sleeping on gold treasure, fantasy, detailed',
  'northern lights over Iceland, landscape, aurora',
  'ancient Chinese dragon gate, traditional, detailed',
  'coral castle underwater, ocean, colorful, nature',
  'steampunk submarine, Victorian, ocean, detailed',
  'field of lavender in Provence, France, purple, summer',
  'cosmic butterfly with galaxy wings, surreal, beautiful',
  'ancient Mayan temple, jungle, ruins, mysterious',
  'futuristic Mars colony, domes, sci-fi, detailed',
  'enchanted mirror portal, fantasy, magical, glowing',
  'volcanic island forming, ocean, dramatic, nature',
  'ancient Japanese garden, koi pond, peaceful, zen',
  'space elevator, futuristic, Earth, sci-fi, detailed',
  'dragon made of stars, cosmic, fantasy, beautiful',
  'bioluminescent forest, glowing plants, magical, night',
  'ancient Roman colosseum, sunset, Italy, historical',
  'futuristic underwater habitat, ocean, sci-fi, detailed',
  'field of tulips in Netherlands, spring, colorful',
  'cosmic whale swimming through nebulae, space, surreal',
  'ancient Egyptian sphinx, desert, sunset, mysterious',
  'futuristic train through mountains, sci-fi, detailed',
  'enchanted waterfall, glowing, magical, fantasy',
  'volcanic lightning, eruption, dramatic, powerful',
  'ancient Celtic forest, misty, mystical, nature',
  'space flower blooming in zero gravity, cosmic, beautiful',
  'dragon made of water, ocean, fantasy, powerful',
  'bioluminescent jellyfish, deep sea, glowing, ocean',
  'ancient Persian palace, intricate, detailed, golden',
  'futuristic vertical farm, city, sci-fi, green',
  'field of poppies, red, dramatic, nature, beautiful',
  'cosmic tree of life, galaxies, universe, spiritual',
];

// State
let images = [];
let autoRunning = true;
let autoInterval = CONFIG.AUTO_INTERVAL;
let autoTimer = null;
let currentFilter = 'all';
let promptIndex = 0;

// DOM Elements
const bgGallery = document.getElementById('bgGallery');
const galleryGrid = document.getElementById('galleryGrid');
const galleryEmpty = document.getElementById('galleryEmpty');
const totalCount = document.getElementById('totalCount');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidePanel = document.getElementById('sidePanel');
const sideOverlay = document.getElementById('sideOverlay');
const panelClose = document.getElementById('panelClose');
const openPanelBtn = document.getElementById('openPanelBtn');
const manualGenerateBtn = document.getElementById('manualGenerateBtn');
const manualPrompt = document.getElementById('manualPrompt');
const manualStyle = document.getElementById('manualStyle');
const manualRatio = document.getElementById('manualRatio');
const fastGenerateBtn = document.getElementById('fastGenerateBtn');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const autoToggle = document.getElementById('autoToggle');
const clearAllBtn = document.getElementById('clearAllBtn');
const modalOverlay = document.getElementById('modalOverlay');
const imageModal = document.getElementById('imageModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalPrompt = document.getElementById('modalPrompt');
const modalTime = document.getElementById('modalTime');
const modalType = document.getElementById('modalType');
const modalDownload = document.getElementById('modalDownload');
const modalDelete = document.getElementById('modalDelete');
const toastContainer = document.getElementById('toastContainer');

// ============================================
// Utility Functions
// ============================================

function getAspectRatio(ratio) {
  const ratios = {
    '1:1': { w: 512, h: 512 },
    '16:9': { w: 768, h: 432 },
    '9:16': { w: 432, h: 768 },
    '4:3': { w: 640, h: 480 },
  };
  return ratios[ratio] || ratios['1:1'];
}

function encodePrompt(prompt) {
  return encodeURIComponent(prompt);
}

function buildImageUrl(prompt, width, height) {
  const encoded = encodePrompt(prompt);
  return `${CONFIG.API_BASE}${encoded}?width=${width}&height=${height}&model=${CONFIG.MODEL}&seed=${Math.floor(Math.random() * 999999999)}&nologo=true`;
}

function formatTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ============================================
// Image Generation
// ============================================

function getNextAutoPrompt() {
  const prompt = AUTO_PROMPTS[promptIndex % AUTO_PROMPTS.length];
  promptIndex++;
  return prompt;
}

async function generateImage(prompt, type = 'auto', ratio = '1:1') {
  const { w, h } = getAspectRatio(ratio);
  const imageUrl = buildImageUrl(prompt, w, h);

  // Pre-load image
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const imageData = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        url: imageUrl,
        prompt: prompt,
        type: type,
        time: formatDate(),
        timestamp: Date.now(),
        width: w,
        height: h,
      };
      resolve(imageData);
    };
    img.onerror = () => reject(new Error('Failed to generate image'));
    img.src = imageUrl;
  });
}

async function addImageToGallery(prompt, type = 'auto', ratio = '1:1') {
  try {
    const imageData = await generateImage(prompt, type, ratio);
    images.unshift(imageData);
    saveImages();
    renderGallery();
    updateBackgroundGallery();
    return imageData;
  } catch (error) {
    console.error('Generation error:', error);
    showToast('Failed to generate image, retrying...', 'error');
    return null;
  }
}

// ============================================
// Auto Generation (Non-stop)
// ============================================

function startAutoGeneration() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = setInterval(async () => {
    if (autoRunning) {
      const prompt = getNextAutoPrompt();
      await addImageToGallery(prompt, 'auto');
    }
  }, autoInterval);
}

function stopAutoGeneration() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

// ============================================
// Gallery Rendering
// ============================================

function renderGallery() {
  const filtered = currentFilter === 'all'
    ? images
    : images.filter(img => img.type === currentFilter);

  totalCount.textContent = images.length;

  if (images.length === 0) {
    galleryEmpty.classList.add('visible');
    galleryGrid.innerHTML = '';
    return;
  }

  galleryEmpty.classList.remove('visible');
  galleryGrid.innerHTML = '';

  filtered.forEach((img, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.style.animationDelay = `${index * 0.05}s`;
    card.innerHTML = `
      <img class="gallery-card-image" src="${img.url}" alt="${img.prompt}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 512 512%22><rect fill=%22%231a1a2e%22 width=%22512%22 height=%22512%22/><text fill=%22%236a6a8a%22 x=%22256%22 y=%22256%22 text-anchor=%22middle%22 font-size=%2224%22>Loading...</text></svg>'">
      <div class="gallery-card-overlay">
        <div class="gallery-card-prompt">${img.prompt}</div>
        <div class="gallery-card-meta">
          <span>${img.time}</span>
          <span class="gallery-card-type ${img.type}">${img.type}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openModal(img));
    galleryGrid.appendChild(card);
  });
}

function updateBackgroundGallery() {
  const bgImages = images.slice(0, 24);
  bgGallery.innerHTML = '';
  bgImages.forEach((img, i) => {
    const tile = document.createElement('div');
    tile.className = 'bg-tile';
    tile.style.backgroundImage = `url(${img.url})`;
    tile.style.animationDelay = `${i * 0.1}s`;
    bgGallery.appendChild(tile);
  });
}

// ============================================
// Modal
// ============================================

function openModal(img) {
  modalImage.src = img.url;
  modalPrompt.textContent = img.prompt;
  modalTime.innerHTML = `<i class="far fa-clock"></i> ${img.time}`;
  modalType.innerHTML = `<i class="fas fa-tag"></i> ${img.type.toUpperCase()}`;
  modalDownload.href = img.url;
  modalDownload.download = `cs-official-${img.id}.jpg`;
  modalDelete.onclick = () => deleteImage(img.id);
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function deleteImage(id) {
  images = images.filter(img => img.id !== id);
  saveImages();
  renderGallery();
  updateBackgroundGallery();
  closeModal();
  showToast('Image deleted', 'success');
}

// ============================================
// Side Panel
// ============================================

function openPanel() {
  sidePanel.classList.add('active');
  sideOverlay.classList.add('active');
  hamburgerBtn.classList.add('active');
}

function closePanel() {
  sidePanel.classList.remove('active');
  sideOverlay.classList.remove('active');
  hamburgerBtn.classList.remove('active');
}

// ============================================
// Local Storage
// ============================================

function saveImages() {
  try {
    const data = images.slice(0, 200).map(img => ({
      ...img,
    }));
    localStorage.setItem('cs_official_images', JSON.stringify(data));
  } catch (e) {
    console.warn('Storage full, clearing old images');
    images = images.slice(0, 50);
    localStorage.setItem('cs_official_images', JSON.stringify(images));
  }
}

function loadImages() {
  try {
    const data = localStorage.getItem('cs_official_images');
    if (data) {
      images = JSON.parse(data);
    }
  } catch (e) {
    images = [];
  }
}

// ============================================
// Event Listeners
// ============================================

hamburgerBtn.addEventListener('click', () => {
  if (sidePanel.classList.contains('active')) {
    closePanel();
  } else {
    openPanel();
  }
});

panelClose.addEventListener('click', closePanel);
sideOverlay.addEventListener('click', closePanel);
openPanelBtn.addEventListener('click', openPanel);

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closePanel();
  }
});

// Manual Generate
manualGenerateBtn.addEventListener('click', async () => {
  const prompt = manualPrompt.value.trim();
  if (!prompt) {
    showToast('Please enter a prompt', 'error');
    return;
  }
  const style = manualStyle.value;
  const ratio = manualRatio.value;
  const finalPrompt = style ? `${prompt}, ${style} style` : prompt;

  manualGenerateBtn.classList.add('loading');
  manualGenerateBtn.innerHTML = '<i class="fas fa-spinner"></i> Generating...';

  await addImageToGallery(finalPrompt, 'manual', ratio);

  manualGenerateBtn.classList.remove('loading');
  manualGenerateBtn.innerHTML = '<i class="fas fa-bolt"></i> Generate Image';
  showToast('Image generated!', 'success');
  manualPrompt.value = '';
});

// Fast Generate
fastGenerateBtn.addEventListener('click', async () => {
  const prompt = getNextAutoPrompt();
  fastGenerateBtn.classList.add('loading');
  fastGenerateBtn.innerHTML = '<i class="fas fa-spinner"></i> Generating...';
  await addImageToGallery(prompt, 'auto');
  fastGenerateBtn.classList.remove('loading');
  fastGenerateBtn.innerHTML = '<i class="fas fa-bolt"></i> Fast Generate';
  showToast('Image generated!', 'success');
});

// Speed Control
speedSlider.addEventListener('input', (e) => {
  const val = parseInt(e.target.value);
  autoInterval = val * 1000;
  speedValue.textContent = `${val}s`;
  if (autoRunning) {
    startAutoGeneration();
  }
});

// Auto Toggle
autoToggle.addEventListener('click', () => {
  autoRunning = !autoRunning;
  autoToggle.classList.toggle('active', autoRunning);
  autoToggle.querySelector('span').textContent = autoRunning ? 'Running' : 'Paused';
  showToast(autoRunning ? 'Auto generation started' : 'Auto generation paused', 'info');
});

// Clear All
clearAllBtn.addEventListener('click', () => {
  if (images.length === 0) {
    showToast('No images to clear', 'info');
    return;
  }
  if (confirm('Clear all images?')) {
    images = [];
    saveImages();
    renderGallery();
    updateBackgroundGallery();
    showToast('All images cleared', 'success');
  }
});

// Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderGallery();
  });
});

// ============================================
// Initialize
// ============================================

function init() {
  loadImages();
  renderGallery();
  updateBackgroundGallery();
  startAutoGeneration();

  // Generate first few images immediately
  setTimeout(async () => {
    if (images.length === 0) {
      for (let i = 0; i < 6; i++) {
        const prompt = getNextAutoPrompt();
        await addImageToGallery(prompt, 'auto');
        await new Promise(r => setTimeout(r, 500));
      }
    }
  }, 500);

  showToast('Welcome to CS OFFICIAL AI Generator!', 'success');
}

init();