// Ici on crée une classe ClockHand qui permet de dessiner les aiguilles de l'horloge

export default class ClockHand {
    constructor(length, color) {
        this.length = length; // longueur de l'aiguille
        this.color = color; // couleur de l'aiguille
    }

    // Méthode pour dessiner l'aiguille
    draw(context, angle, centerX, centerY, lineWidth) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = lineWidth;
        context.moveTo(centerX, centerY); // point de départ
        context.lineTo(centerX + Math.sin(angle) * this.length, centerY - Math.cos(angle) * this.length); // point d'arrivée
        context.stroke();
        context.closePath();
    }

    // Méthodes pour définir la couleur et la longueur de l'aiguille
    setColor(newColor) {
        this.color = newColor;
    }

    setLength(newLength) {
        this.length = newLength;
    }
}
