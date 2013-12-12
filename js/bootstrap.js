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
    scene	= new THREE.Scene();

    scene.add(new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.9 ));

    /**
     * loading textures
     */
    var loadTextures = function() {
        var t;
        t = dr.textures;

        t.grayDarkWood = THREE.ImageUtils.loadTexture("textures/grey-dark-wood.jpg");
    };

    loadTextures();

    Camera.init();
    camera = Camera.get();
    scene.add(camera);

    var mixerContext= new THREEx.HtmlMixer.Context(renderer, scene, camera)
    updateFcts.push(function(delta, now){
        mixerContext.update(delta, now)
    })


    //////////////////////////////////////////////////////////////////////////////////
    //		create a Plane for THREEx.HtmlMixer				//
    //////////////////////////////////////////////////////////////////////////////////


    // create the iframe element
    var domElement	= document.createElement('iframe')
    domElement.src	= 'http://godt.no';
    domElement.style.border	= 'none'
    // create the plane
    var mixerPlane	= new THREEx.HtmlMixer.Plane(mixerContext, domElement)
    mixerPlane.object3d.scale.multiplyScalar(2)
    scene.add(mixerPlane.object3d)

    domElement	= document.createElement('iframe')
    domElement.src	= 'http://vgtv.no';
    domElement.style.border	= 'none'
    var mixerPlane	= new THREEx.HtmlMixer.Plane(mixerContext, domElement)
    mixerPlane.object3d.scale.multiplyScalar(2);
    mixerPlane.object3d.translateX(2);
    scene.add(mixerPlane.object3d)

    domElement	= document.createElement('iframe')
    domElement.src	= 'http://minmote.no';
    domElement.style.border	= 'none'
    var mixerPlane	= new THREEx.HtmlMixer.Plane(mixerContext, domElement)
    mixerPlane.object3d.scale.multiplyScalar(2);
    mixerPlane.object3d.translateX(4);
    scene.add(mixerPlane.object3d)

    domElement	= document.createElement('iframe')
    domElement.src	= 'http://vg.no';
    domElement.style.border	= 'none'
    var mixerPlane	= new THREEx.HtmlMixer.Plane(mixerContext, domElement)
    mixerPlane.object3d.scale.multiplyScalar(2);
    mixerPlane.object3d.translateX(6);
    scene.add(mixerPlane.object3d)

    //////////////////////////////////////////////////////////////////////////////////
    //		Camera Controls							//
    //////////////////////////////////////////////////////////////////////////////////
    var mouse	= {x : 0, y : 0}
    document.addEventListener('mousemove', function(event){
        mouse.x	= (event.clientX / window.innerWidth ) - 0.5
        mouse.y	= (event.clientY / window.innerHeight) - 0.5
    }, false)
    updateFcts.push(function(delta, now){
//        camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3)
//        camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3)
//        camera.lookAt( scene.position )
//        camera.lookAt( new THREE.Vector3(mouse.x, mouse.y, 2) );
    })

    //////////////////////////////////////////////////////////////////////////////////
    //		Make it move							//
    //////////////////////////////////////////////////////////////////////////////////

    // update it
    updateFcts.push(function(delta, now){
//        mixerPlane.object3d.rotation.y += Math.PI * 2 * delta * 0.1;
    })

    //////////////////////////////////////////////////////////////////////////////////
    //		add objects in the scene					//
    //////////////////////////////////////////////////////////////////////////////////

    var geometry	= new THREE.CylinderGeometry(0.1,0.1, 2, 32, 32);
    var material	= new THREE.MeshPhongMaterial({
        map: dr.textures.grayDarkWood
    });
    var mesh	= new THREE.Mesh( geometry, material );
    mesh.translateX(-1.5);
    scene.add( mesh );

    geometry = new THREE.CubeGeometry(20,2,0.01)
    material = new THREE.MeshLambertMaterial({
        map: dr.textures.grayDarkWood
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.translateZ(1);
    mesh.translateX(8);
    mesh.translateY(0.5);
    scene.add(mesh);


    //////////////////////////////////////////////////////////////////////////////////
    //		render the scene						//
    //////////////////////////////////////////////////////////////////////////////////
    updateFcts.push(function(){
        renderer.render( scene, camera );
    })

    //////////////////////////////////////////////////////////////////////////////////
    //		loop runner							//
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null
    requestAnimationFrame(function animate(nowMsec){
        var clock = new THREE.Clock();
        var delta = clock.getDelta();
//        controls.update(delta); // Move camera

        // keep looping
        requestAnimationFrame( animate );
        // measure time
        lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
        var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec	= nowMsec
        // call each update function
        updateFcts.forEach(function(updateFn){
            updateFn(deltaMsec/1000, nowMsec/1000)
        })
    })


//
//    var init = function() {
//        Camera.init();
//        camera = Camera.get();
//
//        THREEx.WindowResize(renderer, camera);
//
//        Scene.init();
//        scene = Scene.get();
//
//        dr.mixerContext= new THREEx.HtmlMixer.Context(renderer, scene, camera);
//    };
//
//    var render = function () {
//        renderer.render(scene, camera);
//
//        requestAnimationFrame(render);
//
//        TWEEN.update();
//    };
//
//    init();
//    render();
});