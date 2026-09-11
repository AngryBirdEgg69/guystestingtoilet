// Put as many links in here as you want, separated by commas.
// Every time the button is clicked, one gets picked at random.

// Each entry is one possible outcome of the countdown. There are two kinds:
//
//   { type: 'link', url: '...' }
//     -> redirects the tab to that URL, like before.
//
//   { type: 'image' }
//     -> shows the rare picture overlay instead, plays its own sound
//        effect, and does NOT redirect anywhere.
//
// All entries here have an EQUAL chance of being picked - so with 4
// entries total (3 links + 1 image), the image shows up roughly 1 in 4
// times. Add or remove 'link' entries to change those odds; the image
// stays exactly as rare as any single link.
const outcomes = [
  { type: 'link', url: 'https://shopee.co.th/product/497840757/22532414329?gads_t_sig'},
  { type: 'link', url: 'https://www.onestockhome.com/th/products/29413956/toilet-608s-sky_sanitary-ware_coral'},
  { type: 'link', url: 'https://shopee.co.th/product/520287542/24026381888?gads_t_sig'},
  { type: 'link', url: 'https://www.lazada.co.th/products/-i16180338515-s127259042797.html?from_gmc=1&fl_tag=1'},
  { type: 'link', url: 'https://www.lazada.co.th/products/-i4210875013-s22986497040.html?from_gmc=1&fl_tag=1'},
  { type: 'link', url: 'https://shopee.co.th/product/906811781/23281801414?gads_t_sig'},
  { type: 'link', url: 'https://terraria.wiki.gg/wiki/Toilets#Terra_Toilet'},
  { type: 'link', url: 'https://terraria.wiki.gg/wiki/Minecarts#Terra_Fart_Kart'},
  { type: 'link', url: 'https://calamitymod.wiki.gg/wiki/Auric_Toilet'},
  { type: 'link', url: 'https://tshxjd.en.made-in-china.com/product/OaFRWHylAGkz/China-Fully-Automatic-Smart-Toilet-Intelligent-Toilet-Hpcm.html?acc'},
  { type: 'image', image: 'rare.png', sound: 'rare-sound.mp3' },
];

function getRandomLink() {
  // Math.random() gives a decimal between 0 and 1 (like 0.732).
  // Multiplying by links.length and rounding down with Math.floor
  // turns that into a whole number index that always fits the array,
  // e.g. with 3 links this gives 0, 1, or 2.
  const randomIndex = Math.floor(Math.random() * links.length);
  return links[randomIndex];
}

function startCountdown() {
  // 1. Play your click sound right away, the moment the button is pressed
  const sound = document.getElementById('clickSound');
  sound.currentTime = 0;
  sound.play().catch((err) => {
    // If the file is missing or blocked, this prints the real reason
    // to the browser console (F12 > Console) instead of failing silently.
    console.error('Audio failed to play:', err);
  });

  // 2. Show the overlay and play the countdown video (muted, visual only)
  const overlay = document.getElementById('countdownOverlay');
  const video = document.getElementById('countdownVideo');

  overlay.style.display = 'flex';
  video.currentTime = 0;
  video.play();

  // 3. "ended" is an event that fires automatically once a video
  //    finishes playing through to the end - no timer needed for this part.
  video.onended = () => {
    overlay.style.display = 'none';
    window.location.href = getRandomLink();
  };
}




function getRandomOutcome() {
  // Math.random() gives a decimal between 0 and 1 (like 0.732).
  // Multiplying by outcomes.length and rounding down with Math.floor
  // turns that into a whole number index that always fits the array.
  const randomIndex = Math.floor(Math.random() * outcomes.length);
  return outcomes[randomIndex];
}

function startCountdown() {
  // 1. Play your click sound right away, the moment the button is pressed
  const sound = document.getElementById('clickSound');
  sound.currentTime = 0;
  sound.play().catch((err) => {
    // If the file is missing or blocked, this prints the real reason
    // to the browser console (F12 > Console) instead of failing silently.
    console.error('Audio failed to play:', err);
  });

  // 2. Show the overlay and play the countdown video (muted, visual only)
  const overlay = document.getElementById('countdownOverlay');
  const video = document.getElementById('countdownVideo');

  overlay.style.display = 'flex';
  video.currentTime = 0;
  video.play();

  // 3. "ended" fires automatically once the video finishes playing through.
  //    That's when we decide what actually happens.
  video.onended = () => {
    overlay.style.display = 'none';
    handleOutcome(getRandomOutcome());
  };
}

function handleOutcome(outcome) {
  if (outcome.type === 'link') {
    window.location.href = outcome.url;
  } else if (outcome.type === 'image') {
    showRareOverlay();
  }
}

function showRareOverlay() {
  const rareOverlay = document.getElementById('rareOverlay');
  const rareSound = document.getElementById('rareSound');

  rareOverlay.style.display = 'flex';
  rareSound.currentTime = 0;
  rareSound.play().catch((err) => {
    console.error('Rare sound failed to play:', err);
  });
}

// Called by the onclick on #rareOverlay in index.html - clicking
// anywhere on the popup just closes it, no redirect happens.
function closeRareOverlay() {
  document.getElementById('rareOverlay').style.display = 'none';
}