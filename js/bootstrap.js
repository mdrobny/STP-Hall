/* global define, dr, THREE, THREEx, Physijs, TWEEN, requestAnimationFrame */
define([
    'config/global',
    'scene',
    'camera'
], function (configGlobal, Scene, Camera) {
    var renderer, scene, camera, controls;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(dr.config.scene.width, dr.config.scene.height);
    dr.canvasElem.append(renderer.domElement);

    dr.updateFcts = [];
    var updateFcts = dr.updateFcts;
    scene = new THREE.Scene();

    scene.add(new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.9 ));

    /**
     * loading textures
     */
    var loadTextures = function() {
        var t;
        t = dr.textures;

        t.grayDarkWood = THREE.ImageUtils.loadTexture("textures/grey-dark-wood.jpg");
        t.schLogo = THREE.ImageUtils.loadTexture("textures/schibsted.jpg");
    };
    loadTextures();

    Camera.init();
    camera = Camera.get();
    scene.add(camera);

    var mixerContext= new THREEx.HtmlMixer.Context(renderer, scene, camera)
    updateFcts.push(function(delta, now){
        mixerContext.update(delta, now)
    });

    /**
     * create iframes by url
     * @param url
     * @param transX
     * @param transZ
     * @param rotation
     * @param scale
     */
    var createIframe = function(url,transX, transZ, rotation) {
        scale = 2;
        transX = transX || 0;
        transZ = transZ || 0;
        rotation = rotation || 0;
        var domElement	= document.createElement('iframe')
        domElement.src	= 'http://'+ url;
        domElement.style.border	= 'none';
        var mixerPlane	= new THREEx.HtmlMixer.Plane(mixerContext, domElement);
        mixerPlane.object3d.scale.multiplyScalar(scale);
        mixerPlane.object3d.translateX(transX);
        mixerPlane.object3d.translateZ(transZ);
        mixerPlane.object3d.rotateY(rotation);
        scene.add(mixerPlane.object3d)

        // update
//        updateFcts.push(function(delta, now){
//        mixerPlane.object3d.rotation.y += Math.PI * 2 * delta * 0.1;
//        })
    };


    var floorSize = 8, scale = 2, corr = 0.5;
    createIframe('godt.no',-1,-floorSize/2+corr);
    createIframe('vgtv.no',1,-floorSize/2+corr);
    createIframe('minmote.no',-3, -floorSize/2+corr);
    createIframe('vg.no',3, -floorSize/2+corr);

    createIframe('osloby.no',-1,floorSize/2-corr, Math.PI);
    createIframe('osloby.no',1,floorSize/2-corr, Math.PI);
    createIframe('osloby.no',-3,floorSize/2-corr, Math.PI);
    createIframe('osloby.no',3,floorSize/2-corr, Math.PI);

    createIframe('godt.no',-floorSize/2,-1, 1.5*Math.PI);
    createIframe('vgtv.no',-floorSize/2,1, 1.5*Math.PI);
    createIframe('minmote.no', -floorSize/2,-3, 1.5*Math.PI);
    createIframe('vg.no', -floorSize/2,3, 1.5*Math.PI);

    createIframe('osloby.no',floorSize/2,-1, 1.5*Math.PI);
    createIframe('osloby.no',floorSize/2,1, 1.5*Math.PI);
    createIframe('osloby.no', floorSize/2,-3, 1.5*Math.PI);
    createIframe('osloby.no', floorSize/2,3, 1.5*Math.PI);


    /**
     * objects
     */
    var floorZ = 0.75;
    var rand = function() {
        return Math.floor((Math.random()*floorSize-4));
    };
    var createBall = function() {
        var ballRadius = 0.15;
        var posX = rand(), posZ = rand();
        var geometry = new THREE.SphereGeometry(ballRadius,32, 32);
        var material = new THREE.MeshLambertMaterial({
            map: dr.textures.schLogo
        });
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(posX,-floorZ+ballRadius,posZ);
        scene.add( mesh );

    };


    //column
    var geometry = new THREE.CylinderGeometry(0.1,0.1, 2, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        map: dr.textures.grayDarkWood
    });
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //balls
    for(var i=0;i<10;i++) {
        createBall();
    }

    //floor
    geometry = new THREE.CubeGeometry(floorSize,floorSize,0.01);
    material = new THREE.MeshLambertMaterial({
        map: dr.textures.grayDarkWood
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.translateZ(floorZ);
    mesh.translateX(0);
    mesh.translateY(0.5);
    scene.add(mesh);

    //sky
    geometry = new THREE.SphereGeometry(999, 2, 2);
    material = new THREE.MeshBasicMaterial({
        color: dr.colors.blue
    });
    material.side = THREE.DoubleSide;
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    updateFcts.push(function(){
        renderer.render( scene, camera );
    });

    var lastTimeMsec = null
    requestAnimationFrame(function animate(nowMsec){
        requestAnimationFrame( animate );

        // measure time
        lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
        var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec	= nowMsec
        // call each update function
        updateFcts.forEach(function(updateFn){
            updateFn(deltaMsec/1000, nowMsec/1000)
        })
    });

});