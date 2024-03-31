// Ici on crée une classe ClockScene qui hérite de la classe Scene et qui permet de dessiner l'horloge

import Scene from "./canvas/Scene";
import ClockHand from "./ClockHand";

export default class ClockScene extends Scene {
    constructor(id, cityName) {
        super(id); // Appel du constructeur de la classe parente
        this.cityName = cityName; // Nom de la ville
        this.hourHand = new ClockHand(40, "black"); // instance de l'aiguille des heures
        this.minuteHand = new ClockHand(70, "black"); // instance de l'aiguille des minutes
        this.secondHand = new ClockHand(100, "#FEA023"); // instance de l'aiguille des secondes

        // Paramètres pour le débogage avec valeurs par défaut
        this.params = {
            color: "#FEA023",
            stopTime: false,
            hourHandLength: 40,
            minuteHandLength: 70,
            secondHandLength: 100,
            fontSize: 30
        };


        if (this.debug.active) { // Vérifier si le mode de débogage est activé
            this.debugFolder.add(this.params, 'stopTime'); // Ajout d'un controller pour arrêter le temps

            const colorController = this.debugFolder.addColor(this.params, 'color');
            colorController.onChange((value) => {
                this.secondHand.setColor(value);
            });

            const hourHandLengthController = this.debugFolder.add(this.params, 'hourHandLength', 0, 150);
            hourHandLengthController.onChange((value) => {
                this.hourHand.setLength(value);
            });

            const minuteHandLengthController = this.debugFolder.add(this.params, 'minuteHandLength', 0, 180);
            minuteHandLengthController.onChange((value) => {
                this.minuteHand.setLength(value);
            });

            const secondHandLengthController = this.debugFolder.add(this.params, 'secondHandLength', 0, 200);
            secondHandLengthController.onChange((value) => {
                this.secondHand.setLength(value);
            });

            const fontSizeController = this.debugFolder.add(this.params, 'fontSize', 5, 50);
            fontSizeController.onChange((value) => {
                this.params.fontSize = value;
            });
        }
    }

    // Méthode pour définir les positions des aiguilles
    setHandsPosition(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    // Méthode pour mettre à jour la scène
    update() {
        super.update(); // Appel de la méthode update() de la classe parente
    
        // si le temps est arrêté n'est pas arrêté
        if (!this.params.stopTime) {
            // Effacer le contenu du canevas avant de redessiner les aiguilles
            this.clear();
            
            // Redessiner le cadran de l'horloge
            this.drawClock();
            
            const hourAngle = (this.hours + this.minutes / 60) * (Math.PI / 6); // 360 degrés divisé par 12 heures
            const minuteAngle = this.minutes * (Math.PI / 30); // 360 degrés divisé par 60 minutes
            const secondAngle = this.seconds * (Math.PI / 30); // 360 degrés divisé par 60 secondes
            const centerX = this.width / 2; // Coordonnée X du centre du canevas
            const centerY = this.height / 2; // Coordonnée Y du centre du canevas

            // Dessiner l'aiguille des heures
            this.hourHand.draw(this.context, hourAngle, centerX, centerY, 7);

            // Dessiner l'aiguille des minutes
            this.minuteHand.draw(this.context, minuteAngle, centerX, centerY, 5);

            // Dessiner l'aiguille des secondes
            this.secondHand.draw(this.context, secondAngle, centerX, centerY, 3);
        }
    }

    // Méthode pour dessiner le cadran de l'horloge
    drawClock() {
        // Dessiner le cercle de l'horloge
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) / 2 * 0.9; // Rayon du cercle de l'horloge
        
        this.context.beginPath();
        this.context.fillStyle = 'white';
        this.context.lineWidth = 10;
        this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Dessiner un cercle
        this.context.stroke();
        this.context.fill();
        this.context.closePath();
        
        // Dessiner les chiffres de 1 à 12
        this.context.fillStyle = 'black';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        for (let i = 1; i <= 12; i++) {
            this.context.font = `${this.params.fontSize}px Arial`;
            const angle = i * (Math.PI / 6);
            const x = centerX + Math.sin(angle) * (radius - 20); // Placer les chiffres à l'intérieur du cercle
            const y = centerY - Math.cos(angle) * (radius - 20);
            this.context.fillText(i.toString(), x, y);

            // Nom de la ville
            this.context.font = '30px Arial';
            this.context.fillStyle = this.params.color;
            this.context.fillText(this.cityName, centerX, centerY - radius - 30);
            this.context.fillStyle = 'black';
        }

        // Dessiner les 60 petits traits des minutes/secondes
        for (let i = 0; i < 60; i++) {
            this.context.lineWidth = 2; // Définir la largeur des traits à 1 pixel
            const angle = i * (Math.PI / 30); // Diviser le cercle en 60 parties
            const smallRadius = radius * 0.96; // Réduire le rayon pour les petits traits
            const smallX1 = centerX + Math.sin(angle) * smallRadius; // Coordonnée X du point de départ 
            const smallY1 = centerY - Math.cos(angle) * smallRadius; // Coordonnée Y du point de départ
            const smallX2 = centerX + Math.sin(angle) * radius; // Coordonnée X du point d'arrivée
            const smallY2 = centerY - Math.cos(angle) * radius; // Coordonnée Y du point d'arrivée
            this.context.beginPath();
            this.context.moveTo(smallX1, smallY1);
            this.context.lineTo(smallX2, smallY2);
            this.context.stroke();
            this.context.closePath();
        }
    }
}
