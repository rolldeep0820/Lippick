let navTG = false;

function reducer1(state = navTG, action) {
  if (action.type === "nav-on") {
    navTG = true;
  } else if (action.type === "nav-off") {
    navTG = false;
  }

  return navTG;
}

let test = true;

function reducer2(state = test, action) {
  return state;
}

let playing = true;

function reducer3(state = playing, action) {
  if (action.type === "pause") {
    playing = false;
  } else if (action.type === "play") {
    playing = true;
  }
  return playing;
}

let muted = true;

function reducer4(state = muted, action) {
  if (action.type === "vol") {
    muted = false;
  } else if (action.type === "mute") {
    muted = true;
  }
  return muted;
}

let expand = false;

function reducer5(state = expand, action) {
  if (action.type === "expand-on") {
    expand = true;
  } else if (action.type === "expand-off") {
    expand = false;
  }

  return expand;
} 

let bg = false;

function reducer6(state = bg, action) {
  if (action.type === "bg-on") {
    bg = true;
  } else if (action.type === "bg-off") {
    bg = false;
  }

  return bg;
}

let content1img = [
  "content1-img-1",
  "content1-img-2",
  "content1-img-3",
  "content1-img-4",
];
let num = 0;
let selectImg = "content1-img-1";

function reducer7(state = selectImg, action) {
  if (action.type === "minus" && num === 0) {
    num = 0;
    selectImg = content1img[num];
  } else if (action.type === "plus" && num === 3) {
    num = 3;
    selectImg = content1img[num];
  } else if (action.type === "plus" && 0 <= num <= 3) {
    num += 1;
    selectImg = content1img[num];
  } else if (action.type === "minus" && 0 <= num <= 3) {
    num -= 1;
    selectImg = content1img[num];
  }

  return selectImg;
}

export {
    navTG,
    reducer1,
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7
  };