
document.getElementById("get-colors-btn").addEventListener("click", function(){
    const colorHex = document.getElementById("seed-color").value
    const colorMode = document.getElementById("color-scheme-mode").value
    const url = `https://www.thecolorapi.com/scheme?hex=${colorHex.substring(1)}&mode=${colorMode.toLowerCase()}&count=5`
    getColorPalette(url)
})

function getColorPalette(url){
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let colorPaletteHtml = ``
            for(let i=0; i<data.count; i++){
                colorPaletteHtml += `
                    <div id="color${i+1}" class="color${i+1} copy" style="background-color: ${data.colors[i].hex.value}">
                        <p class="tooltip-text">Copy color RGB</p>
                    </div>
                    <p id="hex${i+1}" class="hex${i+1} copy">${data.colors[i].hex.value}</p>
                `
            }
            document.getElementById("color-palette").innerHTML = colorPaletteHtml
    })
}

getColorPalette("https://www.thecolorapi.com/scheme?hex=000000&mode=monochrome&count=5")

document.addEventListener('click', function(e){
    if (e.target.id.includes("color")){
        const copyColorRgb = document.getElementById(e.target.id).style.backgroundColor.valueOf()
        navigator.clipboard.writeText(copyColorRgb)
    }
    else if (e.target.id.includes("hex")){
        const copyColorHex = document.getElementById(e.target.id).innerText.valueOf()
        navigator.clipboard.writeText(copyColorHex)
    }
})