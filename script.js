// Selecionando elementos do HTML
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const brushSize = document.getElementById('brush-size');
const brushTool = document.getElementById('brush-tool');
const rectangleTool = document.getElementById('rectangle-tool');
const circleTool = document.getElementById('circle-tool');
const lineTool = document.getElementById('line-tool');
const clearCanvasButton = document.getElementById('clear-canvas');

// Definindo as dimensões do canvas
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

// Variáveis de controle
let drawing = false;
let currentTool = 'brush';
let startX, startY;

// Funções de Ferramentas
function setTool(tool) {
    currentTool = tool;
}

// Início do desenho com o Pincel
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;

    if (currentTool === 'brush') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    if (currentTool === 'brush') {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', (e) => {
    drawing = false;

    if (currentTool === 'rectangle') {
        let width = e.offsetX - startX;
        let height = e.offsetY - startY;
        ctx.fillStyle = colorPicker.value;
        ctx.fillRect(startX, startY, width, height);
    } else if (currentTool === 'circle') {
        let radius = Math.sqrt(Math.pow((e.offsetX - startX), 2) + Math.pow((e.offsetY - startY), 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fillStyle = colorPicker.value;
        ctx.fill();
    } else if (currentTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;
        ctx.stroke();
    }
});

// Limpar o canvas
clearCanvasButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Ferramentas de Desenho
brushTool.addEventListener('click', () => setTool('brush'));
rectangleTool.addEventListener('click', () => setTool('rectangle'));
circleTool.addEventListener('click', () => setTool('circle'));
lineTool.addEventListener('click', () => setTool('line'));
