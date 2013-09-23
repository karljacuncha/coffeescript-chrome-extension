James Baxter
============

James Baxter is an animator.

James Baxter The Horse is an animated character.

James Baxter the coffeescript class is a rudimentary traditional/frame 
animation control.

For this we have a sequence of still images and an audio file soundtrack.
The constructor loads all these up into memory, sets a few vars and fires off 
a callback when ready.
After that, we have a start & stop control to play/pause the animation.

That's basically it, so let's look at the code in more detail:

		class JamesBaxter

As with the slightly ugly 'isChromeExtension' check in main, we need to get 
the correct path here for when the code is running as part of the extension or 
when it's just standalone. Since we're doing that anyway, let's also include 
the 'assets' prefix to keep things neat.

			_getAsset = (path) ->
				return unless path
				path = "assets/#{path}"
				if window.isChromeExtension
					return chrome.extension.getURL(path)
				else
					return path

For the actual animation frames, we need to go a little further and load the 
assets as Image objects, but again we can simplify the calling of this to only 
require the number input since the frames should have been exported as an 
image sequence.

			_getFrame = (num) ->
				return if isNaN(num)
				img = new Image()
				img.src = _getAsset("james#{num}.jpg")
				return img

Some private settings here, based on the assets content.

'frameRate' is a slight misnomer here, is actually the delay in milliseconds 
between frames (so still technically the correct term, but not the more usual 
'number of frames per second' ratio that film/animation people may be used to. 
66 here is roughly 15 fps ( (1/15) * 1000 ).

'frameCount' is the total number of frames.

			_frameRate = 66
			_frameCount = 48 

			constructor: ($node, callback) ->
				@node = $node

All the contructor needs is a HTML element to draw into and a callback 
function for what to do with it when ready.

Initially, we just want a still title image (so as not to be annoying and play 
automatically, like only stupid, annoying and horrible people would ever do).

				@title = new Image()
				@title.src = _getAsset("title.jpg")
				@node.html @title

As with the title card and the frames, the audio is a similar 'create the 
object control and set the source' idea.
In non-html5 browsers this won't work, but screw them - in this case we're 
just building a chrome extension that one, maybe two, people will actually 
install so let's keep it clean and simple.

				@voice = new Audio()
				@voice.src = _getAsset('voice.mp3')
				@voice.loop = true

And finally we load up all our frames.

				@currentFrame = 0
				@frames = []
				for i in [1.._frameCount]
					@frames[i] = _getFrame(i)
					
				callback(@)

The actual 'play' function for the frames is called recursively, so kept 
private and just triggered by the `start` function. The 'stopped' flag will 
halt the recursion when set by the `stop` command.

			_playFrames: () =>
				return if @stopped
				@currentFrame++

When we reach the end of the frame sequence, reset to the start, and re-sync 
the audio to the start too. This should avoid any drift between the audio & 
video that may occur.

				if @currentFrame >= @frames.length
					@currentFrame = 0 
					@voice.currentTime = 0 

Render the frame on screen, then set the delay before calling it again.

				@node.html @frames[@currentFrame]
				_.delay @_playFrames, _frameRate

Start & Stop here simply set the `stopped` flag as used above, and play/pause 
the audio.

			stop: () ->
				@voice.pause()
				@stopped = true

			start: () ->
				@stopped = false
				@voice.play()
				@_playFrames()


### So what use is all this you may ask

The stand-alone code by itself simply plays the animation on a page with 
little else, which may not serve much purpose in isolation.

But, there is a key line in the associated manifest file here, and that is
`"matches": ["*://*.dailymail.co.uk/*"],`
and as noted in the very first bit of code in [main](main.coffee.md) that when 
called, if this animation page is not what's on screen, then we should 
redirect so that it is.

"Aha, now you get me!" I exclaimed with pride, "You see, once this extension 
is installed, then any attempt to access the rotten, reactionary propaganda 
of that publication will result instead in a much more pleasant experience of 
seeing James Baxter. The horse. On a beach ball ... saying his name in a horse 
voice ... making people smile..."

Horsfall scratched his chin and looked on disparagingly and I trailed off at 
the end of my explanation. "So that's it yeah? That the best thing you can 
think of to do with these difference engines? Even after the upgrades from 
Messrs. Turing, von Neumann et al? You think it's actually worthwhile to write 
out that code and all that commenting nonsense, packaging it up in chrome 
extension and putting it up the chrome store, just so you wouldn't see the 
Daily Mail website? That's better then just pressing the back button if 
you accidentally did go there, is it?"

"Yes. Yes it is. I can't possibly see any other good thing that could be done 
with these computers - nothing useful or worthwhile at all and I can certainly 
assure you that no one else will either. I can definitely, a million percent 
guarantee you of that."

"I see. Well in that case I think I'll take the risk with King Ludd and stick 
to the textiles industry, these computers are nothing but a fad, I say, and 
anyone like them or uses them at all is an utter buffoon."
