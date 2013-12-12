/* global define, THREE, dr */
define([

],function () {
    var camera = {
        camera: null,
        radius: 25,
        theta: 45,
        onMouseDownTheta: 45,
        phi: 60,
        onMouseDownPhi: 60,
        onMouseDownPosition: new THREE.Vector2(),
        isMouseDown: false,

        init: function() {
            var viewAngle, aspect, near, far;

            viewAngle = 45;
            aspect = dr.config.scene.width / dr.config.scene.height;
            near = 0.1;
            far = 1000;

            this.camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
            this.camera.position.z = 3;

            window.addEventListener( 'keydown', this.onKeyDown.bind(this) );
            window.addEventListener( 'keyup', this.onKeyUp.bind(this) );

//            this._setCameraPosition();
//
//
//            /***
//             * MOUSE events on scene
//             ***/
//            dr.canvasElem.on('mousedown', function (event) {
//                event.preventDefault();
//
//                this.isMouseDown = true;
//
//                this.onMouseDownTheta = this.theta;
//                this.onMouseDownPhi = this.phi;
//
//                this.onMouseDownPosition.set( event.clientX, event.clientY);
//            }.bind(this));
//
//            dr.canvasElem.on('mousemove', function (event) {
//                event.preventDefault();
//
//                if(this.isMouseDown) {
//                    this.theta = - ( ( event.clientX - this.onMouseDownPosition.x ) * 0.5 ) + this.onMouseDownTheta;
//                    this.phi = ( ( event.clientY - this.onMouseDownPosition.y ) * 0.5 ) + this.onMouseDownPhi;
//
//                    this.phi = Math.min( 180, Math.max( 0, this.phi ) );
//
//                    this._setCameraPosition();
//                }
//            }.bind(this));
//
//            dr.canvasElem.on('mouseup', function (event) {
//                event.preventDefault();
//
//                this.isMouseDown = false;
//                this.onMouseDownPosition.set(event.clientX - this.onMouseDownPosition.x, event.clientY - this.onMouseDownPosition.y);
//            }.bind(this));
        },

        onKeyDown: function ( event ) {
            switch( event.keyCode ) {

                case 38: /*up*/
                case 87: /*W*/ this.moveForward = true; break;

                case 37: /*left*/
                case 65: /*A*/ this.moveLeft = true; break;

                case 40: /*down*/
                case 83: /*S*/ this.moveBackward = true; break;

                case 39: /*right*/
                case 68: /*D*/ this.moveRight = true; break;

//                case 82: /*R*/ this.moveUp = true; break;
//                case 70: /*F*/ this.moveDown = true; break;

                case 81: /*Q*/ this.freeze = !this.freeze; break;

            }
            this.update();
        },

        onKeyUp: function ( event ) {
            switch( event.keyCode ) {

                case 38: /*up*/
                case 87: /*W*/ this.moveForward = (this.moveForward) ? false : true; break;

                case 37: /*left*/
                case 65: /*A*/ this.moveLeft = (this.moveLeft) ? false : true; break;

                case 40: /*down*/
                case 83: /*S*/ this.moveBackward = (this.moveBackward) ? false : true; break;

                case 39: /*right*/
                case 68: /*D*/ this.moveRight = (this.moveRight) ? false : true; break;

//                case 82: /*R*/ this.moveUp = false; break;
//                case 70: /*F*/ this.moveDown = false; break;

            }
            this.update();
        },

        update: function() {
            var moveSpeed = 0.07;
            if ( this.moveForward || ( this.autoForward && !this.moveBackward ) ) {
                this.camera.translateZ( - ( moveSpeed ) );
            }
            if ( this.moveBackward ) {
                this.camera.translateZ( moveSpeed );
            }

            if ( this.moveLeft ) {
                this.camera.rotateY( moveSpeed );
            }
            if ( this.moveRight ) {
                this.camera.rotateY( - moveSpeed );
            }
        },

        _setCameraPosition: function() {
            this.camera.position.x = this.radius * Math.sin( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
            this.camera.position.y = this.radius * Math.sin( this.phi * Math.PI / 360 );
            this.camera.position.z = this.radius * Math.cos( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
            this.camera.lookAt(new THREE.Vector3(0,0,0));
            this.camera.updateMatrix();
        },

        get: function() {
            return this.camera;
        }
    };
    return camera;
});