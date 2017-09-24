/*function hanoi(disc, src, aux, dst) {
    if (disc <= 0) return

    hanoi(disc - 1, src, dst, aux)
    console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst)
    hanoi(disc - 1, aux, src, dst)
}

hanoi(3, "Src", "Aux", "Dst")*/

let canvas, ctx, discs
const pos = {
    "Src": 0,
    "Aux": 100,
    "Dst": 200,
}


function asyncHanoi(disc, src, aux, dst, anim) {
    console.log('Attempt schedule Disc ' + disc + ' move to ' + src + ' via ' + aux + ' to ' + dst)

    if (disc <= 0) return Promise.resolve('so done')

    return asyncHanoi(disc - 1, src, dst, aux, anim)
        .then(response => {
            console.log('next in line is prepped', disc, response)

            //let disc = disc - 1
            return new Promise(resolve => {
                console.log('Schedules anim ' + disc)
                anim({ disc, src, aux, dst }, pos[dst], resolve.bind(null, { disc, src, aux, dst }))
            })
            .then(response => {
                console.log('animation done hook', disc, response)
                
                return asyncHanoi(disc - 1, aux, src, dst, anim)
                    .then(response => {
                        console.log('just wanted to tell ya that you are cool', response)
                        return 'returning more'
                    })
                //return 'an heres another'
            })

            //return 'and who recieves this'
        })  /*, src, aux, dst, anim*/
}

function animationLib(params, x, callback) {
    TweenLite.to(discs[params.disc-1], 1, { x: x, onUpdate:redraw, onComplete: callback })
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
        .then(console.log.bind(null, 'Im done'))

}

const rectHeight = 20

function redraw() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 600, 600)
    
    ctx.fillStyle = "black"

    _.each(discs, (item, idx) => {
        ctx.save()
        ctx.fillRect(
            discs[idx].x, // + (discs.length - idx) * 5,
            canvas.height - (rectHeight * discs.length) + (rectHeight * idx),
            100, //Math.max(100 / (discs.length - idx), 10),
            rectHeight
        )
    })

    ctx.fillStyle = "red"
    ctx.fillRect(50, 0, 2, canvas.height) 
    ctx.fillRect(150, 0, 2, canvas.height) 
    ctx.fillRect(250, 0, 2, canvas.height) 
}