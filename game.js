/*
//Syncronous version
function hanoi(disc, src, aux, dst) {
    if (disc <= 0) return

    hanoi(disc - 1, src, dst, aux)
    console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst)
    hanoi(disc - 1, aux, src, dst)
}

hanoi(3, "Src", "Aux", "Dst")
*/





//Asyncronous version
const animSpeed = 1
const pos = {
    "Src": 0,
    "Aux": 100,
    "Dst": 200,
}
let canvas, ctx, discs

function asyncHanoi(disc, src, aux, dst, anim) {
    if (disc <= 0) return Promise.resolve()

    return asyncHanoi(disc - 1, src, dst, aux, anim)
        .then(() => {
            return new Promise(resolve => {
                anim({ disc, src, aux, dst }, pos[dst], resolve.bind(null, { disc, src, aux, dst }))
            })
            .then(() => {
                return asyncHanoi(disc - 1, aux, src, dst, anim)
            })
        })
}

function animationLib(params, x, callback) {
    TweenLite.to(discs[params.disc-1], animSpeed, { x: x, onUpdate:redraw, onComplete: callback })
}

function init(amount) {
    discs = _.map(new Array(amount), () => ({ x: 0 }))

    canvas = document.createElement("canvas")
    canvas.setAttribute('width', "400px")
    canvas.setAttribute('height', "400px")
    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d")

    redraw()

    asyncHanoi(amount, "Src", "Aux", "Dst", animationLib)
}

const rectHeight = 20

function redraw() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 600, 600)
    
    ctx.fillStyle = "black"

    _.each(discs, (item, idx) => {
        ctx.save()
        ctx.fillRect(
            discs[idx].x,
            canvas.height - (rectHeight * discs.length) + (rectHeight * idx),
            100,
            rectHeight
        )
    })

    ctx.fillStyle = "red"
    ctx.fillRect(50, 0, 2, canvas.height) 
    ctx.fillRect(150, 0, 2, canvas.height) 
    ctx.fillRect(250, 0, 2, canvas.height) 
}