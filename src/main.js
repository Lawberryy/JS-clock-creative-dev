//import Scenario from "./js/scenarios/Scenario"

//const scene = new Scenario()
// const scene2 = new Scenario('canvas-scene-2')


import ClockScene from "./js/ClockScene";

// Création des scènes d'horloge pour différentes villes
const clockScene = new ClockScene('canvas-clock-paris', 'Paris');
const clockSceneTokyo = new ClockScene('canvas-clock-tokyo', 'Tokyo');
const clockSceneNewYork = new ClockScene('canvas-clock-new-york', 'New York');
const clockSceneLosAngeles = new ClockScene('canvas-clock-los-angeles', 'Los Angeles');
const clockSceneJakarta = new ClockScene('canvas-clock-jakarta', 'Jakarta');
const clockSceneSydney = new ClockScene('canvas-clock-sydney', 'Sydney');

// Définir une fonction pour mettre à jour les scènes d'horloge
function updateClocks() {
    const nowUTC = new Date().toUTCString(); // l'heure actuelle en UTC
    const nowUTCDate = new Date(nowUTC); // Convertion en objet Date

    // Paris (+2 heures par rapport à UTC)
    const hoursParis = nowUTCDate.getHours() % 12;
    const minutes = nowUTCDate.getMinutes();
    const seconds = nowUTCDate.getSeconds();

    // Tokyo (+9 heures par rapport à UTC)
    const hoursTokyo = nowUTCDate.getUTCHours() + 9;

    // New York (-4 heures par rapport à UTC)
    const hoursNewYork = nowUTCDate.getUTCHours() - 4;

    // Los Angeles (-7 heures par rapport à UTC)
    const hoursLosAngeles = nowUTCDate.getUTCHours() - 7;

    // Jakarta (+7 heures par rapport à UTC)
    const hoursJakarta = nowUTCDate.getUTCHours() + 7;

    // Sydney (+11 heures par rapport à UTC)
    const hoursSydney = nowUTCDate.getUTCHours() + 11;

    // Configurer les positions des aiguilles pour chaque scène d'horloge
    clockScene.setHandsPosition(hoursParis, minutes, seconds);
    clockSceneTokyo.setHandsPosition(hoursTokyo, minutes, seconds);
    clockSceneNewYork.setHandsPosition(hoursNewYork, minutes, seconds);
    clockSceneLosAngeles.setHandsPosition(hoursLosAngeles, minutes, seconds);
    clockSceneJakarta.setHandsPosition(hoursJakarta, minutes, seconds);
    clockSceneSydney.setHandsPosition(hoursSydney, minutes, seconds);

    // Appeler la méthode update() pour chaque scène d'horloge
    clockScene.update();
    clockSceneTokyo.update();
    clockSceneNewYork.update();
    clockSceneLosAngeles.update();
    clockSceneJakarta.update();
    clockSceneSydney.update();
}

// Mettre à jour les scènes d'horloge toutes les secondes
setInterval(updateClocks, 1000);

// Appel initial pour afficher l'heure actuelle
updateClocks();