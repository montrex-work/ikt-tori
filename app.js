const tabs = [...document.querySelectorAll('nav button')];
tabs.forEach(b => b.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  document.getElementById(b.dataset.tab).classList.add('active');
}));

const qs = [
  ["12. tétel", "Melyik napon tört ki a pesti forradalom?", ["1848. március 15.", "1848. április 11.", "1849. március 15.", "1848. október 6."], 0, "A pesti forradalom 1848. március 15-én tört ki."],
  ["12. tétel", "Ki lett az első felelős magyar kormány miniszterelnöke?", ["Kossuth Lajos", "Batthyány Lajos", "Széchenyi István", "Deák Ferenc"], 1, "Batthyány Lajost nevezték ki miniszterelnökké."],
  ["12. tétel", "Mikor szentesítette V. Ferdinánd az áprilisi törvényeket?", ["1848. március 15.", "1848. április 11.", "1848. július 5.", "1849. április 14."], 1, "Az áprilisi törvények szentesítésének napja 1848. április 11."],
  ["12. tétel", "Mit jelentett a közteherviselés?", ["Csak a jobbágyok adóztak", "A nemesség is adózott", "Megszűntek az állami kiadások", "Csak a városok fizettek adót"], 1, "A nemesség adómentessége megszűnt."],
  ["12. tétel", "Melyik esemény kapcsolódik március 15-éhez?", ["A berlini fal megnyitása", "A 12 pont kinyomtatása", "A NATO megalakulása", "A trónörökös meggyilkolása"], 1, "A 12 pontot és a Nemzeti dalt cenzúra nélkül nyomtatták ki."],
  ["12. tétel", "Mi történt a jobbágyfelszabadítás során?", ["Megszűntek a jobbágyi szolgáltatások", "Mindenki választójogot kapott", "Megszűnt az országgyűlés", "Erdély különvált"], 0, "Az úrbéri szolgáltatások megszűntek."],
  ["19. tétel", "Melyik két nagyhatalom állt a hidegháború középpontjában?", ["USA és Szovjetunió", "Franciaország és Németország", "Kína és Japán", "Olaszország és Spanyolország"], 0, "A két szuperhatalom az Egyesült Államok és a Szovjetunió volt."],
  ["19. tétel", "Melyik évben jött létre az NSZK és az NDK?", ["1945", "1947", "1949", "1955"], 2, "Mindkét német állam 1949-ben jött létre."],
  ["19. tétel", "Melyik katonai szövetség alakult meg 1949-ben?", ["Varsói Szerződés", "NATO", "ENSZ", "Európai Unió"], 1, "A NATO 1949-ben jött létre."],
  ["19. tétel", "Mikor épült fel a berlini fal?", ["1949", "1955", "1961", "1989"], 2, "A fal építése 1961-ben kezdődött."],
  ["19. tétel", "Mikor nyílt meg a berlini fal határátkelőinek jelentős része?", ["1961", "1975", "1989", "1991"], 2, "A határátkelők 1989. november 9-én nyíltak meg."],
  ["19. tétel", "Melyik évben egyesült újra Németország?", ["1989", "1990", "1991", "1993"], 1, "Németország 1990. október 3-án egyesült újra."],
  ["20. tétel", "Mikor kezdődött az első világháború?", ["1912", "1914", "1916", "1918"], 1, "Az első világháború 1914-ben tört ki."],
  ["20. tétel", "Ki ellen követték el a szarajevói merényletet?", ["II. Vilmos", "Ferenc József", "Ferenc Ferdinánd", "V. Ferdinánd"], 2, "Ferenc Ferdinánd trónörököst és feleségét gyilkolták meg."],
  ["20. tétel", "Melyik ország tartozott a központi hatalmakhoz?", ["Franciaország", "Nagy-Britannia", "Oroszország", "Osztrák–Magyar Monarchia"], 3, "A Monarchia a központi hatalmak oldalán harcolt."],
  ["20. tétel", "Melyik évben lépett be az USA az első világháborúba?", ["1914", "1915", "1917", "1918"], 2, "Az Egyesült Államok 1917-ben lépett be az antant oldalán."],
  ["20. tétel", "Melyik jellemző írja le a nyugati front harcait?", ["Villámháború", "Állóháború és lövészárok-rendszer", "Kizárólag tengeri csaták", "Harcok nélküli megszállás"], 1, "A nyugati fronton hosszú ideig állóháború alakult ki."],
  ["20. tétel", "Milyen állam részeként vett részt Magyarország a háborúban?", ["Német Birodalom", "Osztrák–Magyar Monarchia", "Orosz Birodalom", "Oszmán Birodalom"], 1, "Magyarország az Osztrák–Magyar Monarchia része volt."],
  ["20. tétel", "Mikor ért véget a nyugati fronton az első világháború?", ["1917. november 7.", "1918. november 11.", "1919. június 28.", "1920. június 4."], 1, "A compiègne-i fegyverszünetet 1918. november 11-én írták alá."]
];

let idx = 0;
let score = 0;
let answered = false;
let wrong = [];

const $ = id => document.getElementById(id);

function render() {
  const q = qs[idx];
  answered = false;

  $('counter').textContent = `${idx + 1} / ${qs.length}`;
  $('points').textContent = `Pont: ${score}`;
  $('bar').style.width = `${(idx / qs.length) * 100}%`;
  $('topic').textContent = q[0];
  $('question').textContent = q[1];
  $('answers').innerHTML = '';
  $('feedback').hidden = true;
  $('next').disabled = true;
  $('next').textContent = idx === qs.length - 1 ? 'Eredmény megtekintése' : 'Következő kérdés →';
  $('result').hidden = true;

  q[2].forEach((a, i) => {
    const b = document.createElement('button');
    b.textContent = String.fromCharCode(65 + i) + '. ' + a;
    b.onclick = () => answer(i, b);
    $('answers').appendChild(b);
  });
}

function answer(n, btn) {
  if (answered) return;
  answered = true;
  const q = qs[idx];
  const buttons = [...$('answers').children];

  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === q[3]) b.classList.add('correct');
  });

  if (n === q[3]) {
    score++;
  } else {
    btn.classList.add('wrong');
    wrong.push({ topic: q[0], question: q[1], correct: q[2][q[3]] });
  }

  $('points').textContent = `Pont: ${score}`;
  $('feedback').hidden = false;
  $('feedback').innerHTML = (n === q[3]
    ? '<b style="color:#137a4b">Helyes válasz!</b>'
    : '<b style="color:#b42318">Nem ez a helyes válasz.</b>') + '<br>' + q[4];
  $('next').disabled = false;
}

$('next').onclick = () => {
  if (idx < qs.length - 1) {
    idx++;
    render();
  } else {
    finish();
  }
};

function finish() {
  $('bar').style.width = '100%';
  $('question').textContent = 'A kvíz véget ért!';
  $('answers').innerHTML = '';
  $('feedback').hidden = true;
  $('next').disabled = true;

  let msg = score >= 16
    ? 'Kiváló teljesítmény!'
    : score >= 13
      ? 'Nagyon szép eredmény!'
      : score >= 9
        ? 'Jó alap, ismételd át a hibás kérdéseket!'
        : 'Érdemes újra átnézni a három tételt.';

  $('result').hidden = false;
  $('result').innerHTML = `<h3>Elért eredmény: ${score} / ${qs.length} pont</h3><p><b>${msg}</b></p>` +
    (wrong.length
      ? '<h3>Ezeket érdemes átismételni:</h3><ul>' + wrong.map(w => `<li><b>${w.topic}:</b> ${w.question}<br>Helyes válasz: ${w.correct}</li>`).join('') + '</ul>'
      : '<p>Minden kérdésre helyesen válaszoltál.</p>') +
    '<button class="btn primary" onclick="resetQuiz()">Új kvíz indítása</button>';
}

function resetQuiz() {
  idx = 0;
  score = 0;
  wrong = [];
  render();
}

$('restart').onclick = resetQuiz;
render();
