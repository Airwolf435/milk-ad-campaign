
/* The following article was what I initially referneced for figuring out how to portray black and white iamges.
* https://research.coe.drexel.edu/ece/dk12/MT/Lab1.pdf
* The idea of intensities made me realise I could do an average intensity of the entire color spectrum within each pixel.
* This average is then assigned to every color to make it appear white / black or somewhere on the spectrum between.
*/
export function noirFilm(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        let intensity =  Math.floor((pixels.data[i + 0] + pixels.data[i + 1]  + pixels.data[i + 2]) / 3);
        pixels.data[i + 0] = intensity;
        pixels.data[i + 1] = intensity;
        pixels.data[i + 2] = intensity;
    }
    return pixels;
}

export function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 100]; // RED
        pixels.data[i + 1] = pixels.data[i + 1]; // GREEN
        pixels.data[i + 2] = pixels.data[i + 202]; // Blue
    }
    return pixels;
}