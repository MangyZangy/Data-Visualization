/*
 * Copyright 2003-2006, 2009, 2017, United States Government, as represented by the Administrator of the
 * National Aeronautics and Space Administration. All rights reserved.
 *
 * The NASAWorldWind/visualize platform is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Illustrates how to display and pick Placemarks.
 */
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        const wwd = new WorldWind.WorldWindow("canvasOne");

        // Create and add layers to the WorldWindow.
        const layers = [
            // Imagery layers.
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new WorldWind.AtmosphereLayer(), enabled: true},
            // WorldWindow UI layers.
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (let l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        //CHALLENGE 6.1
        const pLayer = new WorldWind.RenderableLayer("ESP visualization");

        //Placemark attributes
        const pAttributes = new WorldWind.PlacemarkAttributes(null);
        pAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 0.0);
        pAttributes.imageScale = 0.1;
        pAttributes.labelAttributes.color = WorldWind.Color.BLACK;
        pAttributes.labelAttributes.scale = 0;
        pAttributes.labelAttributes.outlineWidth = 0.1;
        pAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);

        //Image of placemark
        pAttributes.imageSource = WorldWind.configuration.baseUrl + "/data/circle.png";

        //position of placemark
        const position = new WorldWind.Position(41.441123, -98.889961, 5000.0);
        const pMark = new WorldWind.Placemark(position, false, pAttributes);

        //Placemark label
        pMark.label = "esp";
        pMark.alwaysOnTop = true;
        pMark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

        //Add placemark
        pLayer.addRenderable(pMark);

        //Add to World Window
        wwd.addLayer(pLayer);

        //Modal popup function
        const placeClick = function(a) {
            //CHALLENGE 3: USED TO CLOSE THE POPOVER ON CLICK
            $(document).ready(function(){
                $('[data-toggle="popover"]').popover("hide");
            });
            const x1 = a.clientX,
                y1 = a.clientY;
            //Performs the pick
            const pickList = wwd.pick(wwd.canvasCoordinates(x1, y1));
            for (let p = 0; p < pickList.objects.length; p++) {
                if (pickList.objects[p].userObject instanceof WorldWind.Placemark) {
                    if (pickList.objects[p].userObject.label === "esp") {
                        //When click on placemark open modal
                        const modal = document.getElementById('myModal');
                        modal.style.display = "block";

                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function (event) {
                            const modal = document.getElementById('myModal');
                            if (event.target === modal) {
                                modal.style.display = "none";
                            }
                        }
                    }
                }
            }
        };
        wwd.addEventListener("click", placeClick);

        // Create a layer manager for controlling layer visibility.
        const layerManager = new LayerManager(wwd);
    });