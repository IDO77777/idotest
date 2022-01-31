const images = [
//  { src: 'img/工程名.svg', width: 257.34, height: 305.2, type: 'img' },
//  { src: 'img/会社・組織名.svg', width: 249.34, height: 225.69, type: 'img' },
//  { src: 'img/物の流れ.svg', width: 251.44, height: 270.31, type: 'img' },
//  { src: 'img/情報の流れ.svg', width: 263.63, height: 246.18, type: 'img' },
//  { src: 'img/リードタイム.svg', width: 252.37, height: 254.81, type: 'img' },
  { src: 'img/かんばん.svg', width: 100, height: 100, type: 'img' },
  { src: 'img/ロット形式ポスト.svg', width: 100, height: 100, type: 'img' },
  { src: 'img/物と情報の停滞.svg', width: 100, height: 100, type: 'img' },
  { src: 'img/ストア（店）.svg', width: 100, height: 100, type: 'img' },
  { src: 'img/紙・指示書.svg', width: 100, height: 100, type: 'img' },
  { src: 'img/Eメール.svg', width: 100, height: 100, type: 'img' },
  { src: 'img/FAX.svg', width: 100, height: 100, type: 'img' },
  { src: 'img/電話.svg', width: 100, height: 100, type: 'img' },
  { src: 'img/システム・アプリケーション.svg', width: 100, height: 100, type: 'img' },
]

const shapes = [
  { src: 'img/工程名.svg', width: 100, height: 100, type: 'shape', datacolor:'d3d3d3', shapetype:7},
  { src: 'img/会社・組織名.svg', width: 100, height: 100, type: 'shape', datacolor:'ffffff', shapetype:7},
]

const lines = [
  { src: 'img/物の流れ.svg', width: 100, height: 100, type: 'line', linestart:0, lineend:8, linestyle:2},
  { src: 'img/情報の流れ.svg', width: 100, height: 100, type: 'line', linestart:8, lineend:0, linestyle:1},
  { src: 'img/リードタイム.svg', width: 100, height: 100, type: 'line', linestart:8, lineend:8, linestyle:2},
]

function getImage(img) {
  return `<div class="draggable-item image-box" type="${img.type}">
          <img src="${img.src}" data-image-url="https://ido77777.github.io/idotest/${img.src}">
	  </div>`
}

//shape-type=7 ：ROUNDER角が丸い四角形
//shape-opacity  ：不透明度
function getShape(img) {
  return `<div class="draggable-item image-box"
               data-color="${img.datacolor}"
  			       shape-type="${img.shapetype}"
  			       shape-opacity=1>
  			  </div>`
}

function getLine(img) {
  return `<div class="line draggable-item mline"
  			       line-start="${img.linestart}"
  			       line-end="${img.lineend}" 
  			       line-style="${img.linestyle}">
  		    </div>`
}

function addImages(container) {
  container.innerHTML += images.map((i) => getImage(i)).join('')
  container.innerHTML += lines.map((i) => getLine(i)).join('')
  container.innerHTML += images.map((i) => getImage(i)).join('')
}

function createImage(canvasX, canvasY, url) {
  return miro.board.widgets.create({
    type: 'image',
    url: url,
    x: canvasX,
    y: canvasY,
  })
}

function createShape(canvasX, canvasY, color, text, stype, sopacity) {
  return miro.board.widgets.create({
    type: 'shape',
    text: text,
    x: canvasX,
    y: canvasY,
    width: 100,
    style: {
      textColor: '#000',
      backgroundColor: '#' + color,
      backgroundOpacity: sopacity,
      borderColor: '#000', //'transparent',
      textColor: '#000',
      shapeType: stype,
    },
  })
}

function createLine(canvasX, canvasY, sstyle, estyle, lstyle) {
  return miro.board.widgets.create({
    type: 'line',
    startPosition:{
      x: canvasX,
      y: canvasY,
    },
    endPosition:{
      x: canvasX + 200,
      y: canvasY,
    },
    style: {
      lineColor: '#000',
      lineThickness: 4,//厚さ
      lineStartStyle: sstyle,
      lineEndStyle: estyle, //filled_arrow=8
      lineStyle: lstyle, //実線=2 , 点線=1
      lineType: 0, //曲がり度
    },
  })
}

function bootstrap() {
  const container = document.getElementById('container')
  addShapes(container)
  addLines(container)
  addImages(container)

  let currentImageUrl
  const imageOptions = {
    draggableItemSelector: 'img',
    onClick: async (targetElement) => {
      const url = targetElement.getAttribute('data-image-url')
      const widget = (await createImage(0, 0, url))[0]
      miro.board.viewport.zoomToObject(widget)
    },
    getDraggableItemPreview: (targetElement) => {
      //drag-started
      currentImageUrl = targetElement.getAttribute('data-image-url')
      return {
        width: 100,
        height: 100,
        url: currentImageUrl,
      }
    },
    onDrop: (canvasX, canvasY) => {
//       if(targetElement.getAttribute('type') = 'img'){
//         console.log('onDrop 1')
//         createImage(canvasX, canvasY, currentImageUrl)
//       }else if(targetElement.getAttribute('type') = 'shape'){
//         console.log('onDrop 2')
//         currentShapeColor = targetElement.getAttribute('data-color')
//         currentShapeText = targetElement.innerText
//         currentShapeType = targetElement.getAttribute('shape-type')
//         currentShapeOpacity = targetElement.getAttribute('shape-opacity')
//         createShape(canvasX, canvasY, currentShapeColor, currentShapeText, currentShapeType, currentShapeOpacity)
//       }else if(targetElement.getAttribute('type') = 'line'){
//         console.log('onDrop 3')
//         currentlineStartStyle = targetElement.getAttribute('line-start')
//         currentlineEndStyle = targetElement.getAttribute('line-end')
//         currentlineStyle = targetElement.getAttribute('line-style')
//         createLine(canvasX, canvasY, currentlineStartStyle, currentlineEndStyle, currentlineStyle)
//       }
      console.log('onDrop 1')
      createImage(canvasX, canvasY, currentImageUrl)
    },
  }
  miro.board.ui.initDraggableItemsContainer(container, imageOptions)

  let currentShapeColor
  let currentShapeText
  let currentShapeType
  let currentShapeOpacity
  const shapeOptions = {
    draggableItemSelector: '.process ',
    onClick: async (targetElement) => {
      const color = targetElement.getAttribute('data-color')
      const text = targetElement.innerText
      const stype = targetElement.getAttribute('shape-type')
      const sopacity = targetElement.getAttribute('shape-opacity')
      const widget = (await createShape(0, 0, color, text, stype, sopacity))[0]
      miro.board.viewport.zoomToObject(widget)
    },
    getDraggableItemPreview: (targetElement) => {
      currentShapeColor = targetElement.getAttribute('data-color')
      currentShapeText = targetElement.innerText
      currentShapeType = targetElement.getAttribute('shape-type')
      currentShapeOpacity = targetElement.getAttribute('shape-opacity')
      return {
        url: `data:image/svg+xml,%3Csvg width='140' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Crect stroke='null' x='0' y='0' fill='%23${currentShapeColor}' height='140' width='140'/%3E%3C/g%3E%3C/svg%3E`,
        //createShape(canvasX, canvasY, currentShapeColor, currentShapeText, currentShapeType, currentShapeOpacity)
      }
    },
    onDrop: (canvasX, canvasY) => {
      console.log('onDrop 2')
      createShape(canvasX, canvasY, currentShapeColor, currentShapeText, currentShapeType, currentShapeOpacity)
    },
  }
  miro.board.ui.initDraggableItemsContainer(container, shapeOptions)
	
	
	
  //線
  let currentlineStartStyle
  let currentlineEndStyle
  let currentlineStyle
  const lineOptions = {
    draggableItemSelector: '.line',
    onClick: async (targetElement) => {
      const sstyle = targetElement.getAttribute('line-start')
      const estyle = targetElement.getAttribute('line-end')
      const linestyle = targetElement.getAttribute('line-style')
      const widget = (await createLine(0, 0, sstyle, estyle, linestyle))[0]
      miro.board.viewport.zoomToObject(widget)
    },
    getDraggableItemPreview: (targetElement) => {
      currentlineStartStyle = targetElement.getAttribute('line-start')
      currentlineEndStyle = targetElement.getAttribute('line-end')
      currentlineStyle = targetElement.getAttribute('line-style')
      return {
        url: `data:image/svg+xml,%3Csvg width='140' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Crect stroke='null' x='0' y='0' fill='%23${currentlineStartStyle}' height='140' width='140'/%3E%3C/g%3E%3C/svg%3E`,
      }
    },
    onDrop: (canvasX, canvasY) => {
      console.log('onDrop 3')
      createLine(canvasX, canvasY, currentlineStartStyle, currentlineEndStyle, currentlineStyle)
    },
  }
  miro.board.ui.initDraggableItemsContainer(container, lineOptions)	
}

miro.onReady(bootstrap)
