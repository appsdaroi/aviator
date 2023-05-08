import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CanvasDots = (props) => {
  const canvasRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(props.animate)
  }, [props.animate])

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pointSpacing = 32; // Espaçamento entre os pontos
    const horizontalLineLength = 14 * pointSpacing; // Comprimento total da linha horizontal
    let x = 0;
    let y = 0;

    const drawPoints = () => {
      // Desenhar a linha horizontal com espaço à esquerda
      context.beginPath();
      for (let i = 0; i < 14; i++) {
        let xPos =
          ((horizontalLineLength - i * pointSpacing + x) %
            horizontalLineLength) +
          pointSpacing / 2 +
          20; // Adiciona um espaçamento de 20 pixels à esquerda
        if (xPos < 0) {
          xPos += horizontalLineLength;
        }
        context.moveTo(
          i * pointSpacing + pointSpacing / 2 + 20,
          canvas.height - 20
        );
        context.arc(xPos, canvas.height - 20, 2, 0, 2 * Math.PI);
      }
      context.fillStyle = "white";
      context.fill();

      // Desenhar a linha vertical
      context.beginPath();
      for (let i = 0; i < 15; i++) {
        const yPos =
          ((i * pointSpacing + y) % (canvas.height - pointSpacing)) +
          pointSpacing / 2;
        context.moveTo(40, i * pointSpacing + pointSpacing / 2);
        context.arc(20, yPos, 2, 0, 2 * Math.PI);
      }
      context.fillStyle = "#1099d7";
      context.fill();

      // Adicionar a linha fixa branca à esquerda da linha vertical
      context.beginPath();
      context.moveTo(40, 0);
      context.lineTo(40, canvas.height - 40);
      context.strokeStyle = "#201a19";
      context.lineWidth = 2;
      context.stroke();

      // Adicionar a linha fixa branca abaixo da linha horizontal
      context.beginPath();
      context.moveTo(40, canvas.height - 40);
      context.lineTo(canvas.width, canvas.height - 40);
      context.strokeStyle = "#201a19";
      context.lineWidth = 2;
      context.stroke();
    };

    const animate = () => {
      if (isAnimating) {
        requestAnimationFrame(animate);
      }
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawPoints();

      // Incrementar a posição dos pontos
      x -= 1;
      if (x < -horizontalLineLength) {
        x += horizontalLineLength;
      }
      y += 1;
    };

    drawPoints();

    if (isAnimating) {
      animate();
    }
  }, [isAnimating]);
  return <canvas ref={canvasRef} {...props} />;
};

export { CanvasDots };
