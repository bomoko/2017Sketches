# 10th Jan 2017

Okay - I swear I was going to do something today - a sketch based on the "deconstructed sphere" code in Matt Pearson's "Generative Art".
HOWEVER ... it turns out that, at the time I'm writing this, p5.js doesn't support drawing lines in WEBGL mode.
See (this Github issue thread)[https://github.com/processing/p5.js/issues/1638].

So I ended up spending my time diving into the p5.js code to see if I could work out how to draw lines. It seems that it _used_ to support it, but at some stage they refactored the rendering code so that it only really supports objects with a surface area.

This is weird because the code that dispatches calls to make lines (the "line" function) actually still supports calling a WEBGL line function while in WEBGL mode, but when it tries to call it, everything blows up (because that function was removed and never replaced).

I thought it might be an easy patch, but it looks like there's going to be work required in a couple of places to make it happen...

Guess it's time to learn WEBGL properly.
