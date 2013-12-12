/* global define, dr */
define(function () {
    dr = window.dr || {};

    dr.canvasElem = $('.content');

    dr.config = {};

    dr.config.scene = {};

    dr.config.scene.width = window.innerWidth;
    dr.config.scene.height = window.innerHeight;

    /** objects **/
    dr.models = {};

    dr.colors = {};
    dr.colors.brown = "#A85511";
    dr.colors.green = "#387D25";
    dr.colors.blue = "#A6C8ED";
    dr.colors.blueRGB = {r: 166, g: 200, b: 237};
    dr.colors.red = "#FA3E0A";
    dr.colors.redRGB = {r: 255, g: 0, b: 0};

    dr.objects = {};
    dr.textures = {};

});