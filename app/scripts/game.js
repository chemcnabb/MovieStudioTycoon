enchant();




window.onload = function() {

    var game = new Game(gameSettings.screenHeight, gameSettings.screenWidth);
    game.fps = 60;
    game.preload('images/chara0.gif');

    var writingSliders = enchant.Class.create(enchant.widget.Modal,{
        /*
         * Select the Genre menu - Action, Adventure, Romance etc
         */
        initialize: function() {
            enchant.widget.Modal.call(this);

            this.backgroundColor = "green";
            this.buildMenu();
            this.buildScene();

        },

        calculateXY: function (writer, lastObject, i, spacing) {
            writer.y = lastObject.y;
            writer.x = lastObject.x + writer.width + 30;
            if ((i % 2 / 2) == 0) {
                writer.y = writer.y + spacing;
                writer.x = 10;
            }
        },
        buildMenu: function(){
            this.back = new enchant.ui.Button("Back");
            this.back.moveTo(this.back.x + (gameSettings.screenWidth/2), this.back.y);
            this.back.addEventListener("touchend", function(e){
                this.removeEventListener("touchend");
                game.popScene();

            });



        },

        buildScene: function(){
            this.addChild(this.back);
        }
    });

    var pickAWriter = enchant.Class.create(enchant.widget.Modal,{
        /*
         * Select the Genre menu - Action, Adventure, Romance etc
         */
        initialize: function() {
            enchant.widget.Modal.call(this);


            this.backgroundColor = "green";
            this.buildMenu();
            this.buildScene();

        },

        calculateXY: function (writer, lastObject, i, spacing) {
            writer.y = lastObject.y;
            writer.x = lastObject.x + writer.width + 30;
            if ((i % 2 / 2) == 0) {
                writer.y = writer.y + spacing;
                writer.x = 10;
            }
        },
        buildMenu: function(){
            this.back = new enchant.ui.Button("Back");
            this.back.moveTo(this.back.x + (gameSettings.screenWidth/2), this.back.y);
            this.back.addEventListener("touchend", function(e){
                this.removeEventListener("touchend");
                game.popScene();

            });


            var i=0;
            var lastObject = false;

            for(var writer_name in writers_collection_object){
                if(writers_collection_object.hasOwnProperty(writer_name)){

                    var spacing = 35;
                    var writer = new enchant.ui.Button(writer_name);

                    writer.width = (gameSettings.screenWidth/2)/2;
                    writer.name = writer_name;

                    if(!lastObject){
                        lastObject = writer;
                    }

                    this.calculateXY(writer, lastObject, i, spacing);

                    writer.moveTo(writer.x, writer.y);

                    writer.addEventListener("touchend", function(e){

                        movieSettings.writer = this.name;

                        this.removeEventListener("touchend");
                        game.popScene();
                        var writingSlider = new writingSliders();
                        game.pushScene(writingSlider);
                    });

                    lastObject = writer;
                    this.addChild(writer);
                    i++;

                }

            }
        },

        buildScene: function(){
            this.addChild(this.back);
        }
    });

    var genreSelection = enchant.Class.create(enchant.widget.Modal,{
        /*
         * Select the Genre menu - Action, Adventure, Romance etc
         */
        initialize: function() {
            enchant.widget.Modal.call(this);


            this.backgroundColor = "green";
            this.buildMenu();
            this.buildScene();

        },

        calculateXY: function (genre, lastObject, i, spacing) {
            genre.y = lastObject.y;
            genre.x = lastObject.x + genre.width + 25;
            if ((i % 3 / 3) == 0) {
                genre.y = genre.y + spacing;
                genre.x = 5;
            }
        },
        buildMenu: function(){
            this.back = new enchant.ui.Button("Back");
            this.back.moveTo(this.back.x + (gameSettings.screenWidth/2), this.back.y);
            this.back.addEventListener("touchend", function(e){
                this.removeEventListener("touchend");
                game.popScene();

            });


            var i=0;
            var lastObject = false;

            for(var genre_name in genre_collection_object){
                if(genre_collection_object.hasOwnProperty(genre_name)){

                    var spacing = 35;
                    var genre = new enchant.ui.Button(genre_name);

                    genre.width = (gameSettings.screenWidth/3)/2;
                    genre.name = genre_name;

                    if(!lastObject){
                        lastObject = genre;
                    }

                    this.calculateXY(genre, lastObject, i, spacing);

                    genre.moveTo(genre.x, genre.y);

                    genre.addEventListener("touchend", function(e){
                        if(movieSettings.current_active_type=="genre"){
                            movieSettings.genre = this.name;
                        }
                        if(movieSettings.current_active_type=="subgenre"){
                            movieSettings.subgenre = this.name;
                        }
                        this.removeEventListener("touchend");
                        game.popScene();

                    });

                    lastObject = genre;
                    this.addChild(genre);
                    i++;

                }

            }
        },

        buildScene: function(){
            this.addChild(this.back);
        }
    });

    var platformSelection = enchant.Class.create(enchant.widget.Modal,{
        /*
        * Select the platform menu - Film, TV, VHS, Direct to DVD, etc
        */
        initialize: function() {
            enchant.widget.Modal.call(this);
            this.backgroundColor = "yellow";
            this.buildMenu();
            this.buildScene();


        },
        calculateXY: function (platform, lastObject, i, spacing) {
            platform.y = lastObject.y;
            platform.x = lastObject.x + platform.width + 25;
            if ((i % 2 / 2) == 0) {
                platform.y = platform.y + spacing;
                platform.x = 15;
            }
        },
        buildMenu: function(){
            this.back = new enchant.ui.Button("Back");
            this.back.moveTo(this.back.x + (gameSettings.screenWidth/2), this.back.y);

            this.back.addEventListener("touchend", function(e){
                this.removeEventListener("touchend");
                game.popScene();
            });
            var i=0;
            var lastObject = false;

            for(var platform_name in platform_collection_object){
                if(platform_collection_object.hasOwnProperty(platform_name)){

                    var spacing = 35;
                    var platform = new enchant.ui.Button(platform_name);

                    platform.width = (gameSettings.screenWidth/2)/2;
                    platform.name = platform_name;

                    if(!lastObject){
                        lastObject = platform;
                    }

                    this.calculateXY(platform, lastObject, i, spacing);

                    platform.moveTo(platform.x, platform.y);

                    platform.addEventListener("touchend", function(e){
                        console.log("touch platform button");
                        movieSettings.platform = this.name;

                        this.removeEventListener("touchend");
                        game.popScene();

                    });

                    lastObject = platform;
                    this.addChild(platform);
                    i++;

                }

            }
        },

        buildScene: function(){
           this.addChild(this.back);

        }
    });

    var createAScreenplay = enchant.Class.create(enchant.widget.Modal,{

        initialize: function() {
            enchant.widget.Modal.call(this);
            this.backgroundColor = "red";

            this.selectGenre = new genreSelection();

            this.selectPlatform = new platformSelection();

            this.buildRootMenu();
            this.buildScene();
        },

        createButton: function (root, name, xmod, pushscene) {
            this.button = new enchant.ui.Button(name);
            this.button.width = (gameSettings.screenWidth/2)/2;
            this.button.addEventListener("enterframe", function (e) {
                if(name == "Genre"){
                    this.text = movieSettings.genre;
                }
                if (name == "Sub Genre"){
                    this.text = movieSettings.subgenre;
                }
                if (name == "Platform"){
                    this.text = movieSettings.platform;
                }
            });
            this.button.moveTo(this.button.x + (gameSettings.screenWidth / 6), this.button.y + xmod);
            this.button.addEventListener("touchend", function (e) {
                if(name == "Genre"){
                    movieSettings.current_active_type = "genre";
                }
                if (name == "Sub Genre"){
                    movieSettings.current_active_type = "subgenre";
                }
                this.removeEventListener("touchend");
                game.pushScene(pushscene);
            });
            return this.button;
        },

        buildRootMenu: function(){
            var root = this;
            this.title = new enchant.Label("Develop Script");
            this.title.textAlign = "center";

            this.genre = this.createButton(root, movieSettings.genre, 35, this.selectGenre);
            this.subgenre = this.createButton(root, movieSettings.subgenre, 65, this.selectGenre);
            this.platform = this.createButton(root, "Platform", 95, this.selectPlatform);

            this.next = new enchant.ui.Button("Create Screenplay");
            this.next.moveTo(this.next.x + (gameSettings.screenWidth/3), this.next.y+150);
            this.next.addEventListener("touchend", function(e){
                this.removeEventListener("touchend");
                var writerScene = new pickAWriter();
                //game.popScene();
                game.pushScene(writerScene);

            });
        },

        buildScene: function(){
            this.addChild(this.title);
            this.addChild(this.genre);
            this.addChild(this.subgenre);
            this.addChild(this.platform);
            this.addChild(this.next);
        }
    });

    game.onload = function() {
        var screenplayScene = new createAScreenplay();
        game.pushScene(screenplayScene);
    };
    game.start();
};
