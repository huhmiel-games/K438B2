const waterFx2 = new Phaser.Class({
  Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
  initialize:
    function CustomPipeline2(game) {
      Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
        game,
        renderer: game.renderer,
        fragShader: `
          precision mediump float;
          uniform float     time;
          uniform vec2      resolution;
          uniform sampler2D uMainSampler;
          varying vec2 outTexCoord;

          const float speed = 0.00002;                      
          const float frequency = 16.0;
          const float amplitude = 0.02;

          vec2 shift( vec2 p ) {                        
              float d = time*speed;
              vec2 f = frequency * (p + d);
              vec2 q = cos( vec2(                        
                cos(f.x-f.y)*cos(f.y),                       
                sin(f.x+f.y)*sin(f.y) ) );                   
              return q;                                  
          }        

          void main( void ) {
            vec2 r = outTexCoord.xy;                     
            vec2 p = shift( r );             
            vec2 q = shift(r + 1.0);                        
            vec2 s = r + amplitude * (p - q);
            s.y = 1. - s.y; // flip Y axis for Phaser 3
            gl_FragColor = texture2D( uMainSampler, s );
          }
        `,
      });
    },
});

export default waterFx2;
