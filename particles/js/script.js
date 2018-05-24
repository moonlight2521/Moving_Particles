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
    createParticles : function(){
        for(var i = 0, count = (this.BASE_PARTICLE_COUNT * this.width / 500 * 500 * this.height / 500) | 0 ; i < count; i++){
            this.particles.push(new PARTICLE(this));
        }
    },
    watchWindowSize : function(){
        this.clearTimer();
        this.tmpWidth = this.$window.width();
        this.tmpHeight = this.$window.height();
        this.watchIds.push(setTimeout(this.jdugeToStopResize, this.WATCH_INTERVAL));
    },
    clearTimer : function(){
        while(this.watchIds.length > 0){
            clearTimeout(this.watchIds.pop());
        }
    },
    jdugeToStopResize : function(){
        var width = this.$window.width(), 
            height = this.$window.height();
            stoped = (width == this.tmpWidth && height == this.tmpHeight);
        this.tmpWidth = width;
        this.tmpHeight = height;
        if(stopped){
            this.setup();
        }
    },
    bindEvent : function(){
        this.$window.on('resize', this.watchWindowSize);
        this.$container.on('mousemove', this.controlForce.bind(this, true));
        this.$container.on('mouseleave', this.controlForce.bind(this, false));
    },
    controlForce : function(on, event){
        this.gravity.on = on;
        if(!on){
            return;
        }
        var offset = this.$container.offset();
        this.gravity.x = event.clientX - offset.left + this.$window.scrollLeft();
        this.gravity.y = event.clientY - offset.top + this.$window.scrollTop();
    },
    render : function(){
      requestAnimationFrame(this.render);
      
      var context = this.context;
      context.save();
      context.fillStyle = 'hsla(0, 0%, 0%, 0.3)';
      context.fillRect(0, 0, this.width, this.height);
      context.globalCompositeOperstion = 'lighter';

      for(var i = 0, particle = this.particle, gravity = this.gravity, count = particles.length; i < count; i++){
          var particle = particles[i];

          for(var j = i + 1; j < count; j++){
              particle.checkForce(context, particle[j]);
          }
          particle.checkForce(context, gravity);
          particle.render(context);
      }
      context.restore();
    },    
};

var PARTICLE = function(renderer){
    this.render = renderer;
    this.init();
};
PARTICLE.prototype = {
    THRESHOLD : 100,
    SPRING_AMOUNT : 0.001,
    LIMIT_RATE : 0.2,
    GRAVITY_MAGINIGICATION : 10,

    init : function(){
        this.radius = this.getRandomValue(5, 15);
        this.x = this.getRandomValue(-this.renderer.width * this.LIMIT_RATE, this.renderer.width * (1 + this.LIMIT_RATE)) | 0;
        this.y = this.getRandomValue(-this.renderer.width * this.LIMIT_RATE, this.renderer.height * (1 + this.LIMIT_RATE)) | 0;
        this.vx = this.getRandomValue(-3, 3);
        this.vy = this.getRandomValue(-3, 3);
        this.ax = 0;
        this.ay = 0;
        this.gravity = false;
        this.transformShape();
    },
    getRandomValue : function(min, max){
        return min + (max - min ) * Math.random();
    },
    transformShape : function(){
        var velocity = Math.sqrt(this.vx * this.vx + this.vy *this.vy);
        this.scale = 1 - velocity /15;
        this.hue = ((180 + velocity * 12) % 360) | 0;
    },
    
}