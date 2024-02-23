export function createImage(src){
    let newImage = document.createElement("img");
    newImage.setAttribute("src", src);
    return newImage;
}