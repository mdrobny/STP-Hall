/* global define, THREE, Physijs, dr, _ */
define([

],function () {
    var scene = {
        scene: null,

        init: function() {
            var scene, updateFcts;

            scene = new THREE.Scene();
            this._setLights(scene);

            var obj = new THREE.Mesh(new THREE.CubeGeometry(50,50,50), new THREE.MeshLambertMaterial({
                color: dr.colors.brown
            }));

            scene.add(obj);


            this.scene = scene;
        },

        get: function() {
            return this.scene;
        },

        _setLights: function(scene) {
            var light, light2;
            light = new THREE.DirectionalLight("#ffffff", 0.8);
            light.position.set(100,180,150);
//            light.castShadow = true;
//            light.shadowDarkness = 0.5;
//            light.shadowCameraNear = 20;
//            light.shadowCameraFar = 2;
//            light.shadowCameraLeft = - dr.models.table.length/2;
//            light.shadowCameraRight = dr.models.table.length/2;
//            light.shadowCameraTop = dr.models.table.width/2;
//            light.shadowCameraBottom = -dr.models.table.width/2;
//            light.shadowCameraVisible = true;
            scene.add(light);

        }



    };
    return scene;
});