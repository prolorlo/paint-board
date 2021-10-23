const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraiser = document.getElementById("eraiser");
const openModalBtn = document.getElementsByClassName("openModal");
const modal = document.getElementsByClassName("modal");
const overlay = document.getElementsByClassName("modal__overlay");
const closeBtn = document.getElementsByClassName("closeBtn");
const moreColors = document.getElementsByClassName("color");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let bgColor = "white";

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = range.value;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        bgColor = ctx.fillStyle;
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Image[🎨]";
    link.click();
}

function openModal() {
    modal[0].classList.remove("hidden");
}

function closeModal() {
    modal[0].classList.add("hidden");
}

openModalBtn[0].addEventListener("click", openModal);
overlay[0].addEventListener("click", closeModal);
closeBtn[0].addEventListener("click", closeModal)

Array.from(moreColors).forEach(color => color.addEventListener("click", handleColorClick));

function handleEraise() {
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = 20;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click",handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click",handleSaveClick)
}

if (eraiser) {
    eraiser.addEventListener("click",handleEraise)
}

document.body.onkeydown = function(e){
    if(e.keyCode == 107){
        ctx.lineWidth = ctx.lineWidth+1
    } else if(e.keyCode==109) {
        ctx.lineWidth = ctx.lineWidth-1
    }
}