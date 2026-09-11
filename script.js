// Each entry is one possible outcome of the countdown. There are two kinds:
//
//   { type: 'link', url: '...' }
//     -> redirects the tab to that URL.
//
//   { type: 'image', image: '...', sound: '...' }
//     -> shows the rare picture overlay instead, using whichever image
//        and sound file YOU name here, and does NOT redirect anywhere.
//
// All entries have an EQUAL chance of being picked - so with 11 entries
// total (10 links + 1 image), the image shows up roughly 1 in 11 times.
const outcomes = [
  { type: 'link', url: 'https://shopee.co.th/product/497840757/22532414329?gads_t_sig' },
  { type: 'link', url: 'https://www.onestockhome.com/th/products/29413956/toilet-608s-sky_sanitary-ware_coral' },
  { type: 'link', url: 'https://shopee.co.th/product/520287542/24026381888?gads_t_sig' },
  { type: 'link', url: 'https://www.lazada.co.th/products/-i16180338515-s127259042797.html?from_gmc=1&fl_tag=1' },
  { type: 'link', url: 'https://www.lazada.co.th/products/-i4210875013-s22986497040.html?from_gmc=1&fl_tag=1' },
  { type: 'link', url: 'https://shopee.co.th/product/906811781/23281801414?gads_t_sig' },
  { type: 'link', url: 'https://terraria.wiki.gg/wiki/Toilets#Terra_Toilet' },
  { type: 'link', url: 'https://terraria.wiki.gg/wiki/Minecarts#Terra_Fart_Kart' },
  { type: 'link', url: 'https://calamitymod.wiki.gg/wiki/Auric_Toilet' },
  { type: 'link', url: 'https://tshxjd.en.made-in-china.com/product/OaFRWHylAGkz/China-Fully-Automatic-Smart-Toilet-Intelligent-Toilet-Hpcm.html?acc' },
  { type: 'image', image: 'rare.png', sound: 'rare-sound.mp3' },
];

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
    showRareOverlay(outcome);
  }
}

function showRareOverlay(outcome) {
  const rareOverlay = document.getElementById('rareOverlay');
  const rareImage = document.getElementById('rareImage');
  const rareSound = document.getElementById('rareSound');

  // Set the picture and sound to whatever THIS specific outcome named,
  // instead of always using whatever was hardcoded in index.html.
  rareImage.src = outcome.image;
  rareSound.src = outcome.sound;

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
