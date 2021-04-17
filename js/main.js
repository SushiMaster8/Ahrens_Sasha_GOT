(() => {

  // variables at the top
  const sigils = document.querySelector('#navList'),
        banner = document.querySelector('#houseImages'),
        lightBox = document.querySelector(".lightbox"),
        vid = lightBox.querySelector('video'),
        houseName = document.querySelector('h1'),
        houseDescription = document.querySelector('.house-info');

  const media = document.querySelector('video');
  const controls = document.querySelector('.controls');

  const play = document.querySelector('.play');
  const rwd = document.querySelector('.rewind');
  const full = document.querySelector('.fullScreen');
  const volume = document.querySelector('.muteAudio');

  const timerWrapper = document.querySelector('.timer');
  const timer = document.querySelector('.timer span');
  const timerBar = document.querySelector('.timer div');


  const houseInfo = [
    ['Stark', `House Stark of Winterfell is a Great House of Westeros, ruling over the vast region
               known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi
               nobility by far, claiming a line of descent stretching back over eight thousand years.
               Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's
               invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.`],
    ['Baratheon', `House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch
               was formerly the royal house, but House Lannister now controls the throne. House Baratheon
               traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent
               storms, from their seat of Storm's End. House Baratheon became the royal house of the Seven Kingdoms
               after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion,
               Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.`],
    ['Lannister', `House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and
                   most powerful families and oldest dynasties. It is also the current royal house of the Seven
                   Kingdoms following the extinction of House Baratheon of King's Landing, which had been their
                   puppet house anyway. The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a
                   massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications
                   built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of
                   the West. As the new royal house, they also rule directly over the Crownlands from their seat of
                   the Red Keep in King's Landing, the traditional seat of the royal family.`],
    ['Tully', `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title
               of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord
               Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue
               background. Their house words are "Family, Duty, Honor. `],
    ['GreyJoy', `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a
                 harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The
                 head of the house is the Lord Reaper of Pyke. House Greyjoy's sigil is traditionally a golden kraken
                 on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never
                 Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the
                 faith of the Drowned God. `],
    ['Arryn', `House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of
               Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount
               of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings.
               The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr
               Baelish acting as Lord Protector until he reaches the age of majority. `],
    ['Targaryen', `House Targaryen of Dragonstone is a Great House of Westeros and was the ruling royal House of the
                   Seven Kingdoms for three centuries since it conquered and unified the realm, before it was deposed
                   during Robert's Rebellion and House Baratheon replaced it as the new royal House. The few surviving
                   Targaryens fled into exile to the Free Cities of Essos across the Narrow Sea. Currently based on Dragonstone
                   off of the eastern coast of Westeros, House Targaryen seeks to retake the Seven Kingdoms from House Lannister,
                   who formally replaced House Baratheon as the royal House following the destruction of the Great Sept of Baelor.`],
    ['Frey', `House Frey of the Twins was the Great House of the Riverlands, having gained their position for their
              treachery against their former liege lords, House Tully, who were stripped of all their lands and titles
              for their rebellion against the Iron Throne; House Tully had supported the independence movement for the
              Kingdom of the North. The current head of the house is unknown following the assassinations of Lord Walder
              Frey and two of his sons, Lothar Frey and Walder Rivers, by the vengeful Arya Stark. This is made more complex
              by the subsequent assassination of all the male Freys soon after.`],
    ['Tyrell', `House Tyrell of Highgarden is an extinct Great House of Westeros. It ruled over the Reach, a vast, fertile,
                and heavily-populated region of southwestern Westeros, from their castle-seat of Highgarden as Lords Paramount
                of the Reach and Wardens of the South after taking control of the region from House Gardener during the Targaryen
                conquest. The House was formerly led by Lord Mace Tyrell. Mace's son Loras was a noted tournament knight and,
                secretly, the lover of Lord Renly Baratheon.`]
];

  function playVideo() {
    vid.play();
  }

  function stopVideo() {
    vid.pause();
    vid.currentTime = 0;
  }

  function resetVideo() {
      vid.currentTime = 0;
  }

  function setHouseData(name, desc) {
    houseName.textContent = `House ${name}`;
    houseDescription.textContent = desc;
  }

  function setVideoSource(house) {
    let targetSource = `videos/House-${house.charAt(0).toUpperCase() + house.slice(1)}.mp4`;

    vid.src = targetSource;
    vid.load();
    playVideo();
  }

  // functions go here
  function animateBanner(event) {
    if (event.target.className.includes('sigilContainer')) {
      let multiplier = event.target.dataset.offset,
          offsetWidth = 600;
      // 0, 600, 1200, 1800
      banner.style.right = `${multiplier * offsetWidth}px`;
    }
  }

  function popLightBox(event) {
    if (event.target.className.includes('sigilContainer')) {
      setTimeout(function(){lightBox.classList.add('show-lightbox')}, 1300);

    let targetHouse = event.target.className.split(" ")[1];
    setVideoSource(targetHouse);
    // set the house data by running the setHouseData function and passinhg data into it
    setHouseData(houseInfo[event.target.dataset.offset][0], houseInfo[event.target.dataset.offset][1]);

    lightBox.querySelector('.close').addEventListener('click', () => {
      stopVideo();
      lightBox.classList.remove('show-lightbox');
    })
  }
}
  // Close the Lightbox when the video is finished playing
  var trailer = document.getElementById("myVideo");
      trailer.onended = function() {
      lightbox.classList.remove('show-lightbox')
    };


// In case JS doesn't load in
    media.removeAttribute('controls');
    controls.style.visibility = 'visible';

// Play/Pause button function
    function playPauseMedia() {
      if(media.paused) {
        play.setAttribute('data-icon','u');
        media.play();
      } else {
        play.setAttribute('data-icon','P');
        media.pause();
      }
    }


// This is the replay button
    let intervalRwd;

    function mediaRewind() {
     if(rwd.classList.contains('active')) {
      rwd.classList.remove('active');
      clearInterval(intervalRwd);
      media.play();
      }   else {
      rwd.classList.add('active');
      vid.currentTime = 0;
      }
    }

// Time Function
    media.addEventListener('timeupdate', setTime);

    function setTime() {
      let minutes = Math.floor(media.currentTime / 60);
      let seconds = Math.floor(media.currentTime - minutes * 60);
      let minuteValue;
      let secondValue;

      if (minutes < 10) {
        minuteValue = '0' + minutes;
      } else {
        minuteValue = minutes;
      }

      if (seconds < 10) {
        secondValue = '0' + seconds;
      } else {
        secondValue = seconds;
      }

      let mediaTime = minuteValue + ':' + secondValue;
        timer.textContent = mediaTime;

      let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
        timerBar.style.width = barLength + 'px';
      }

      function muteUnmute() {
        if (vid.muted == false) {
          volume.setAttribute('data-icon', 'g');
          vid.muted = true;
        } else {
          volume.setAttribute('data-icon', 'Q')
          vid.muted = false;
        }
      }

      function fullScreen() {
        if (vid.requestFullscreen) {
          vid.requestFullscreen();
        } else if (vid.mozRequestFullScreen) {
          vid.mozRequestFullScreen(); // Firefox
        } else if (vid.webkitRequestFullscreen) {
          vid.webkitRequestFullscreen(); // Chrome and Safari
        }
      };

  volume.addEventListener('click', muteUnmute);
  full.addEventListener('click', fullScreen);
  rwd.addEventListener('click', mediaRewind);
  play.addEventListener('click', playPauseMedia);
  sigils.addEventListener('click', animateBanner);
  sigils.addEventListener('click', popLightBox);

}) ();
