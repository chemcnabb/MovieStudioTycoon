var game_data = {};

var Game = {
    platform:"",
    game:"",
    current_day:0,
    current_month:0,
    current_year:0,
    isPaused:false,
    init: function(){
        this.game = this;
        this.light = new GameStateMachine();
        this.run({fps:60});
        //this.light.start();
        //log.show();
    },





    run: function(options) {

        var now,
            dt       = 0,
            last     = timestamp(),
            slow     = options.slow || 1, // slow motion scaling factor
            step     = 1/options.fps,
            slowStep = slow * step;
            //update   = options.update,
            //render   = options.render;
            //fpsmeter = new FPSMeter(options.fpsmeter || { decimals: 0, graph: true, theme: 'dark', left: '5px' });

        function update(dt) {
            //console.log("time: " + timestamp());

                this.current_day = parseInt(timestamp() / 24 / 365);
                this.current_year = parseInt(this.current_day / 365);
                this.current_month = parseInt(this.current_day / 30);

                $("#current-year")[0].innerHTML = this.current_year;
                $("#current-month")[0].innerHTML = this.current_month;
                $("#current-day")[0].innerHTML = this.current_day;

                if (game_data["production_company"] == undefined) {
                    Game.isPaused=true;
                    $("#make-company").show();
                    $("#start_company").bind("click", function () {
                        game_data["production_company"] = {
                            "company_name": $("#company-name").val(),
                            "owner_name": $("#owner-name").val()

                        };
                        $("#make-company").hide();
                        //console.log(game_data["production_company"]["company_name"]);
                        $("#current-company-name")[0].innerHTML = game_data["production_company"]["company_name"] + " Productions";
                        Game.isPaused = false;
                        Game.light.start();
                    })
                }

        }

        function render(dt) {
            //console.log("render: " + dt);
        }
        function timestamp() {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        }

        function frame() {
            //fpsmeter.tickStart();
            now = timestamp();
            dt = dt + Math.min(1, (now - last) / 1000);
            while(dt > slowStep) {
                dt = dt - slowStep;
                update(step);
            }
            render(dt/slow);
            last = now;
            //fpsmeter.tick();
            requestAnimationFrame(frame); //, options.canvas
        }

        requestAnimationFrame(frame);


    }
};


$(document).ready(function(){
    var game = Game.init();
});



var GameStateMachine = function () {
    var count = 0;
    var currentState = new PreProduction(this);

    this.change = function (state) {
        // limits number of changes
        if (count++ >= 10) return;
        currentState = state;
        currentState.go();
    };

    this.start = function () {
        currentState.go();
    };
};

var preproduction_data = {};
var production_data = {};
var postproduction_data = {};

var PreProduction = function (state) {
    this.state = state;
    this.genres = Genres;

    this.go = function () {
        var budget = false;
        var audience = false;
        var genre1 = false;
        var genre2 = false;
        var platform = false;
        var title = false;

        log.add("PreProduction --> for 1 minute");

        for(i=0;i<Genres.length;i++){
            genre_var = Genres[i]["name"];
            $("#genre1").append("<li><a href='#!' id='genre_"+i+"'>"+genre_var+"</a></li>");
            $("#genre2").append("<li><a href='#!' id='genre_"+i+"'>"+genre_var+"</a></li>");
        };

        $("#genre1").find("li a").bind("click", function(){
            genre1 = $(this)[0].innerHTML;
            $("#genre1_btn")[0].innerHTML= $(this)[0].innerHTML;
            $("#genre2").find("#"+$(this)[0].id).parent().remove();
        });

        $("#genre2").find("li a").bind("click", function(){
            genre2 = $(this)[0].innerHTML;
            $("#genre2_btn")[0].innerHTML= $(this)[0].innerHTML;
            $("#genre1").find("#"+$(this)[0].id).parent().remove();
        });

        $("#pre_production").show();

        $( "#start_prepro" ).bind( "click", function() {


            $("input[name='budget']").each(function(){
                if ($(this).is(':checked')){
                    budget = $(this).attr("id");
                }
            });

            $("input[name='audience']").each(function(){
                if ($(this).is(':checked')){
                    audience = $(this).attr("id");
                }
            });

            $("input[name='platform']").each(function(){
                if ($(this).is(':checked')){
                    platform = $(this).attr("id");
                }
            });

            preproduction_data = {
                "title":$("#movie_title").val(),
                "budget":budget,
                "audience":audience,
                "genre1":genre1,
                "genre2":genre2,
                "platform":platform
            };

            $("#pre_production").hide();
            //$("#log").text(JSON.stringify(preproduction_data));
            state.change(new Production(state));
        });

    };
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Production = function (state) {
    this.state = state;

    this.go = function () {
        log.add("Production --> for 10 seconds");
        $("#production").show();

        var position_list = ["foreground", "middleground", "background"];
        var genre_mix = [preproduction_data["genre1"], preproduction_data["genre2"]];
        for(var i=0;i<position_list.length;i++){
            $("#production").find("."+position_list[i]).css("background-image", "url(imgs/genres/"+genre_mix[getRandomInt(0,1)]+"/"+position_list[i]+".png");
        }


        console.log(preproduction_data["genre1"]);

        //state.change(new PostProduction(state));
    };
};

var PostProduction = function (state) {
    this.state = state;

    this.go = function () {
        log.add("PostProduction --> for 1 minute");
        state.change(new Production(state));
    };
};

// log helper

var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    };
})();