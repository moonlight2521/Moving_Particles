var RENDERER = {
    BASE_PARTICLE_COUNT: 50,
    WATCH_INTERVAL: 100,

    init: function(){
        this.setParameters();
        this.reconstructMethods();
        this.setup();
        this.bindEvent();
        this.render();
    },
    setParameters: function(){
        this.$window = $(window);
        this.$container = $('#jsi-particle-container');
        this.canvas = $('<canvas />');
        this.context = this.$canvas.appendTo(this.$container).get(0).getContext('2d');
        this.particles = [];
        this.watchIds = [];
        this.gravity = {x: 0, y: 0, on: flase, radius: 100, gravity: ture};
    },
    setup: function(){
        this.particles.length = 0;
        this.watchIds.length = 0;
        this.width = this.$container.width();
        this.height = this.$container.height();
        this.$canvas.attr({width: this.width, height: this.height});
        this.distance = Math.sqrt(Math.pow(this.width / 2, 2) + Math.pow(this.height / 2, 2));
        this.createParticles();
    },
    reconstructMethods: function(){
        this.watchWindowSize = this.watchWindowSize.bind(this);
        this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
        this.render = this.render.bind(this);
    },
    
}