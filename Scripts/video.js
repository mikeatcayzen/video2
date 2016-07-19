var videoIn;

var buffer;
var bufferContext;

var videoOut;
var videoOutContext;

var isRecoloring;
var isNegating;
var processType = "None";

window.onload = function () {
    videoIn = document.getElementById("videoIn");

    buffer = document.getElementById("buffer");
    bufferContext = buffer.getContext("2d");

    videoOut = document.getElementById("videoOut");
    videoOutContext = videoOut.getContext("2d");

    document.getElementById("recolor").onclick = function() {
        processType = "Recolor";
        document.getElementById("processingTypeText").innerText = processType;
    };

    document.getElementById("negate").onclick = function () {
        processType = "Negate";
        document.getElementById("processingTypeText").innerText = processType;
    };

    document.getElementById("none").onclick = function () {
        processType = "None";
        document.getElementById("processingTypeText").innerText = processType;
    };

    setTimeout(draw, 0);
};

function draw()
{
    bufferContext.drawImage(videoIn, 0, 0, videoIn.width, videoIn.height);
    var frame = bufferContext.getImageData(0, 0, buffer.width, buffer.height);

    if (processType != "None")
    {
        processFrame(frame.data);
    }

    videoOutContext.putImageData(frame, 0, 0);
    setTimeout(draw,0);
}

function processFrame(frameData)
{
    var numPixels = frameData.length / 4;

    for (i = 0; i < numPixels; i++)
    {
        if (processType === "Recolor")
        {
            processPixelRecolor(frameData, i);
        }
        else if (processType === "Negate")
        {
            processPixelNegate(frameData, i);
        }
    }
}

function processPixelRecolor(frameData, pixelIndex)
{
    var r = frameData[pixelIndex * 4];
    var g = frameData[pixelIndex * 4 + 1];
    var b = frameData[pixelIndex * 4 + 2];
    var a = frameData[pixelIndex * 4 + 3];

    if (g > r + 30 && g > b + 30)
    {
        frameData[pixelIndex * 4] = 0;
        frameData[pixelIndex * 4 + 1] = 0;
        frameData[pixelIndex * 4 + 2] = 200;
    }
}

function processPixelNegate(frameData, pixelIndex)
{
    var r = frameData[pixelIndex * 4];
    var g = frameData[pixelIndex * 4 + 1];
    var b = frameData[pixelIndex * 4 + 2];
    var a = frameData[pixelIndex * 4 + 3];

    frameData[pixelIndex * 4] = 255 - frameData[pixelIndex * 4];
    frameData[pixelIndex * 4 + 1] = 255 - frameData[pixelIndex * 4 + 1];
    frameData[pixelIndex * 4 + 2] = 255 - frameData[pixelIndex * 4 + 2];
}
