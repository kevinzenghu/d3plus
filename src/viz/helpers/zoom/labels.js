var print = require("../../../core/console/print.coffee")

// Sets label opacity based on zoom
module.exports = function(vars) {

  var max_scale = vars.zoom.behavior.scaleExtent()[1]

  if ( vars.dev.value ) print.time("determining label visibility")

  if (vars.draw.timing) {

    vars.g.viz.selectAll("text.d3plus_label")
      .transition().duration(vars.draw.timing)
      .attr("opacity",function(d){
        if (!d) var d = {"scale": max_scale}
        var size = parseFloat(d3.select(this).attr("font-size"),10)
        d.visible = size/d.scale*vars.zoom.scale >= 7
        return d.visible ? 1 : 0
      })

  }
  else {

    vars.g.viz.selectAll("text.d3plus_label")
      .attr("opacity",function(d){
        if (!d) var d = {"scale": max_scale}
        var size = parseFloat(d3.select(this).attr("font-size"),10)
        d.visible = size/d.scale*vars.zoom.scale >= 7
        return d.visible ? 1 : 0
      })

  }

  if ( vars.dev.value ) print.timeEnd("determining label visibility")

}
